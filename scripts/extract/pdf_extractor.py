"""Extract product photographs from legacy catalog PDFs."""
from pathlib import Path
import fitz
from text_utils import clean_spaces, clean_erratas, strip_accents


def extract_images_from_page(doc: fitz.Document, page_num: int) -> list[tuple[fitz.Rect, bytes]]:
    """Extract real product images and their bounding boxes from page."""
    page = doc[page_num]
    results = []
    for info in page.get_image_info(xrefs=True):
        xref = info.get("xref", 0)
        bbox = fitz.Rect(info.get("bbox", (0, 0, 0, 0)))
        if xref > 0 and bbox.width > 30 and bbox.height > 30:
            try:
                img_data = doc.extract_image(xref)
                if img_data and len(img_data["image"]) > 1000:
                    results.append((bbox, img_data["image"]))
            except Exception:
                continue
    return results


def find_product_for_image(img_bbox: fitz.Rect, blocks: list) -> str | None:
    """Find product text block placed immediately below an image bbox."""
    best_name = None
    min_dist = 999999.0
    for b in blocks:
        text = clean_spaces(b[4])
        b_rect = fitz.Rect(b[:4])
        if not text or b_rect.y0 < img_bbox.y0:
            continue
        if any(ign in text.upper() for ign in ["FUCONSA", "PRODUCTOS", "MATIAS"]):
            continue
        center_diff = abs((b_rect.x0 + b_rect.x1) / 2 - (img_bbox.x0 + img_bbox.x1) / 2)
        y_dist = b_rect.y0 - img_bbox.y1
        if 0 <= y_dist < 120 and center_diff < 80:
            total_dist = y_dist + center_diff
            if total_dist < min_dist:
                min_dist = total_dist
                best_name = text.split("\n")[0].strip()
    return clean_erratas(best_name) if best_name else None


def extract_pdf_product_images(pdf_path: Path) -> dict[str, bytes]:
    """Map normalized product names to extracted image bytes."""
    if not pdf_path.exists():
        return {}
    doc = fitz.open(pdf_path)
    extracted = {}
    for pno in range(1, len(doc) - 1):
        page = doc[pno]
        blocks = page.get_text("blocks")
        img_entries = extract_images_from_page(doc, pno)
        for bbox, img_bytes in img_entries:
            prod_name = find_product_for_image(bbox, blocks)
            if prod_name:
                key = strip_accents(prod_name.lower())
                extracted.setdefault(key, img_bytes)
    return extracted
