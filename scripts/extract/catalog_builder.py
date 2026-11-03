"""Consolidate web, excel, pdf images into trilingual catalog.json."""
import json
from pathlib import Path
from constants import CATALOG_JSON_PATH, OUT_DATA_DIR, OUT_ASSETS_DIR, DRIVE_DIR
from text_utils import strip_accents, slugify
from translator import translate_product_names
from image_processor import process_product_image, save_optimized_image, should_rotate_image


def build_catalog_item(raw: dict, img_rel: str | None) -> dict:
    """Format single normalized item adhering to the schema contract."""
    names = translate_product_names(raw.get("name", {}))
    has_photo = bool(img_rel)
    return {
        "id": raw["id"],
        "channel": raw["channel"],
        "sector": raw["sector"],
        "section": raw["section"],
        "brand": raw["brand"],
        "name": names,
        "format": raw.get("format") or "Estándar",
        "unitPrice": raw.get("unitPrice"),
        "boxPrice": raw.get("boxPrice"),
        "priceText": raw.get("priceText") or "",
        "hasPhoto": has_photo,
        "imagePath": img_rel if has_photo else None,
    }


def match_pdf_image(prod_name: str, pdf_images: dict, prod_id: str) -> str | None:
    """Find and save PDF image for product if available."""
    key = strip_accents(prod_name.lower())
    for pdf_key, raw_bytes in pdf_images.items():
        if pdf_key in key or key in pdf_key:
            target = OUT_ASSETS_DIR / f"{prod_id}.webp"
            rotate = should_rotate_image(prod_name)
            if save_optimized_image(raw_bytes, target, rotate):
                return f"assets/products/{prod_id}.webp"
    return None


def merge_catalog_records(web_items: list[dict], csv_items: list[dict], pdf_images: dict) -> list[dict]:
    """Merge web and CSV records, prioritizing web items for accuracy."""
    by_slug = {}
    for w in web_items:
        img_rel = process_product_image(w["id"], w["name"]["es"], w.get("imageUrl", ""))
        item = build_catalog_item(w, img_rel)
        by_slug[w["id"]] = item
    for c in csv_items:
        cid = c["id"]
        if cid in by_slug:
            continue
        p_name = c["name"]["es"]
        img_rel = match_pdf_image(p_name, pdf_images, cid)
        item = build_catalog_item(c, img_rel)
        by_slug[cid] = item
    return sorted(by_slug.values(), key=lambda x: (x["channel"], x["section"], x["name"]["es"]))


def save_catalog_json(items: list[dict]) -> Path:
    """Write catalog items to packages/lib/data/catalog.json."""
    OUT_DATA_DIR.mkdir(parents=True, exist_ok=True)
    with CATALOG_JSON_PATH.open("w", encoding="utf-8") as f:
        json.dump(items, f, ensure_ascii=False, indent=2)
    return CATALOG_JSON_PATH
