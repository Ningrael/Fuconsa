"""Download, rotate, and optimize product images to WebP."""
import io
import urllib.request
from pathlib import Path
from PIL import Image
from constants import ROTATE_PRODUCTS, OUT_ASSETS_DIR
from text_utils import strip_accents


def should_rotate_image(product_name: str) -> bool:
    """Check if image requires 180-degree rotation fix."""
    clean = strip_accents(product_name.lower())
    return any(p in clean for p in ROTATE_PRODUCTS)


def download_raw_image(url: str) -> bytes | None:
    """Download image binary bytes from URL."""
    if not url or not url.startswith("http"):
        return None
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            data = resp.read()
            return data if len(data) > 500 else None
    except Exception:
        return None


def optimize_pil_image(img: Image.Image, rotate: bool) -> Image.Image:
    """Rotate if needed and resize to max 800px preserving ratio."""
    if rotate:
        img = img.rotate(180, expand=True)
    if img.mode in ("P", "RGBA"):
        img = img.convert("RGBA")
    elif img.mode != "RGB":
        img = img.convert("RGB")
    max_dim = max(img.width, img.height)
    if max_dim > 800:
        scale = 800.0 / max_dim
        new_size = (int(img.width * scale), int(img.height * scale))
        img = img.resize(new_size, Image.Resampling.LANCZOS)
    return img


def save_optimized_image(raw_bytes: bytes, out_path: Path, rotate: bool) -> bool:
    """Process bytes and save as WebP with 85% quality."""
    try:
        out_path.parent.mkdir(parents=True, exist_ok=True)
        with Image.open(io.BytesIO(raw_bytes)) as pil_img:
            processed = optimize_pil_image(pil_img, rotate)
            processed.save(out_path, format="WEBP", quality=85, method=6)
            return True
    except Exception:
        return False


def process_product_image(product_id: str, prod_name: str, img_url: str) -> str | None:
    """Process and save product image, returning relative path or None."""
    if not img_url:
        return None
    target_file = OUT_ASSETS_DIR / f"{product_id}.webp"
    rel_path = f"assets/products/{product_id}.webp"
    if target_file.exists() and target_file.stat().st_size > 500:
        return rel_path
    raw_data = download_raw_image(img_url)
    if not raw_data:
        return None
    rotate = should_rotate_image(prod_name)
    success = save_optimized_image(raw_data, target_file, rotate)
    return rel_path if success else None
