"""
Procesador de Estudio Fotográfico Fuconsa (Etapa 7).
Elimina fondos blancos/claros conectados a los bordes con transición suave (alpha matting),
recorta márgenes vacíos, centra en lienzo 640x480 con aire uniforme y realza nitidez/contraste.
"""
import glob
import os
from collections import deque
from concurrent.futures import ThreadPoolExecutor
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter


def compute_corner_bg(rgb):
    """Obtiene el color de fondo promedio desde las 4 esquinas."""
    h, w, _ = rgb.shape
    pad = max(2, min(h, w) // 25)
    corners = np.concatenate([
        rgb[:pad, :pad].reshape(-1, 3),
        rgb[:pad, w - pad:].reshape(-1, 3),
        rgb[h - pad:, :pad].reshape(-1, 3),
        rgb[h - pad:, w - pad:].reshape(-1, 3),
    ], axis=0)
    return np.median(corners, axis=0)


def flood_exterior_mask(bg_candidate):
    """Marca píxeles de fondo conectados a los bordes del lienzo."""
    h, w = bg_candidate.shape
    scale = 2 if min(h, w) > 220 else 1
    sh, sw = h // scale, w // scale
    small = bg_candidate[::scale, ::scale]
    visited = np.zeros((sh, sw), dtype=bool)
    q = deque()

    for x in range(sw):
        if small[0, x]:
            visited[0, x] = True
            q.append((0, x))
        if small[sh - 1, x] and not visited[sh - 1, x]:
            visited[sh - 1, x] = True
            q.append((sh - 1, x))
    for y in range(sh):
        if small[y, 0] and not visited[y, 0]:
            visited[y, 0] = True
            q.append((y, 0))
        if small[y, sw - 1] and not visited[y, sw - 1]:
            visited[y, sw - 1] = True
            q.append((y, sw - 1))

    while q:
        cy, cx = q.popleft()
        for ny, nx in ((cy - 1, cx), (cy + 1, cx), (cy, cx - 1), (cy, cx + 1)):
            if 0 <= ny < sh and 0 <= nx < sw and not visited[ny, nx] and small[ny, nx]:
                visited[ny, nx] = True
                q.append((ny, nx))

    if scale == 1:
        return visited
    mask_img = Image.fromarray((visited.astype(np.uint8) * 255), mode='L')
    mask_full = mask_img.resize((w, h), Image.Resampling.NEAREST)
    return np.array(mask_full) > 127


def remove_background_studio(im):
    """Extrae el fondo conectado a los bordes y genera canal alfa suave."""
    rgba = im.convert('RGBA')
    arr = np.array(rgba, dtype=np.float32)
    rgb = arr[:, :, :3]
    orig_alpha = arr[:, :, 3]

    bg_color = compute_corner_bg(rgb)
    diff = np.linalg.norm(rgb - bg_color, axis=2)
    lum = 0.299 * rgb[:, :, 0] + 0.587 * rgb[:, :, 1] + 0.114 * rgb[:, :, 2]

    is_bg_like = ((diff < 36.0) & (lum > 195.0)) | (orig_alpha < 32.0)
    exterior = flood_exterior_mask(is_bg_like)

    alpha_matte = np.clip((diff - 10.0) / 28.0, 0.0, 1.0)
    new_alpha = np.where(exterior, alpha_matte * orig_alpha, orig_alpha)

    alpha_pil = Image.fromarray(new_alpha.astype(np.uint8), mode='L')
    alpha_pil = alpha_pil.filter(ImageFilter.GaussianBlur(radius=0.8))

    out = arr.copy()
    out[:, :, 3] = np.minimum(orig_alpha, np.array(alpha_pil, dtype=np.float32))
    return Image.fromarray(out.astype(np.uint8), mode='RGBA')


def frame_and_enhance(rgba_im, target_w=640, target_h=480):
    """Recorta márgenes vacíos, centra al 86% del lienzo y aplica mejora de estudio."""
    alpha = np.array(rgba_im)[:, :, 3]
    ys, xs = np.where(alpha > 20)
    if len(xs) > 10 and len(ys) > 10:
        x0, x1 = int(xs.min()), int(xs.max()) + 1
        y0, y1 = int(ys.min()), int(ys.max()) + 1
        cropped = rgba_im.crop((x0, y0, x1, y1))
    else:
        cropped = rgba_im

    cw, ch = cropped.size
    max_w, max_h = int(target_w * 0.86), int(target_h * 0.86)
    scale = min(max_w / max(cw, 1), max_h / max(ch, 1))
    nw, nh = max(1, int(cw * scale)), max(1, int(ch * scale))
    resized = cropped.resize((nw, nh), Image.Resampling.LANCZOS)

    r, g, b, a = resized.split()
    rgb_clean = Image.merge('RGB', (r, g, b))
    rgb_clean = ImageEnhance.Contrast(rgb_clean).enhance(1.06)
    rgb_clean = ImageEnhance.Color(rgb_clean).enhance(1.05)
    rgb_clean = ImageEnhance.Sharpness(rgb_clean).enhance(1.12)
    er, eg, eb = rgb_clean.split()
    enhanced = Image.merge('RGBA', (er, eg, eb, a))

    canvas = Image.new('RGBA', (target_w, target_h), (0, 0, 0, 0))
    ox = (target_w - nw) // 2
    oy = (target_h - nh) // 2
    canvas.paste(enhanced, (ox, oy), enhanced)
    return canvas


def process_single_file(filepath):
    """Procesa una imagen individual y la guarda en WebP RGBA transparente."""
    try:
        with Image.open(filepath) as im:
            cutout = remove_background_studio(im)
            studio = frame_and_enhance(cutout)
        studio.save(filepath, format='WEBP', quality=88, method=4)
        return True
    except Exception as exc:
        print(f"Error en {filepath}: {exc}")
        return False


def main():
    pattern = os.path.join('packages', 'lib', 'assets', 'products', '*.webp')
    files = sorted(glob.glob(pattern))
    print(f"Procesando {len(files)} fotos en modo estudio...")
    with ThreadPoolExecutor(max_workers=12) as pool:
        results = list(pool.map(process_single_file, files))
    ok = sum(1 for r in results if r)
    print(f"Completado: {ok}/{len(files)} fotos recortadas y mejoradas.")


if __name__ == '__main__':
    main()
