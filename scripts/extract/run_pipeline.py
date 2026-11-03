"""Main execution pipeline for Stage 1 extraction and catalog generation."""
import time
import sys
from constants import DRIVE_DIR, CATALOG_JSON_PATH
from web_scraper import scrape_all_web_products
from excel_merger import load_drive_csv_products
from pdf_extractor import extract_pdf_product_images
from catalog_builder import merge_catalog_records, save_catalog_json


def load_all_pdf_images() -> dict[str, bytes]:
    """Extract photos from all legacy catalog PDFs."""
    images = {}
    pdf_names = [
        "Lista precios horeca c-foto.pdf",
        "Lista precio supermercado c-foto.pdf",
    ]
    for name in pdf_names:
        pdf_path = DRIVE_DIR / name
        extracted = extract_pdf_product_images(pdf_path)
        images.update(extracted)
    return images


def print_summary(items: list[dict], duration: float) -> None:
    """Print high-level statistics of compiled catalog."""
    total = len(items)
    with_photos = sum(1 for i in items if i["hasPhoto"])
    trilingual_ok = sum(
        1 for i in items if i["name"].get("es") and i["name"].get("ca") and i["name"].get("en")
    )
    print("\n================ ETAPA 1 COMPLETADA ================", flush=True)
    print(f"Total productos en catálogo: {total}", flush=True)
    print(f"Productos con fotografía: {with_photos} ({(with_photos/total)*100:.1f}%)", flush=True)
    print(f"Productos con nombres trilingües: {trilingual_ok}/{total}", flush=True)
    print(f"Destino catálogo: {CATALOG_JSON_PATH}", flush=True)
    print(f"Tiempo total: {duration:.1f}s", flush=True)
    print("====================================================\n", flush=True)


def main() -> None:
    """Run full Stage 1 pipeline."""
    start_time = time.time()
    print("1. Extrayendo fotos de PDFs de referencia...", flush=True)
    pdf_images = load_all_pdf_images()
    print(f"   Fotos rescatadas de PDFs: {len(pdf_images)}", flush=True)

    print("2. Extrayendo productos de la web de origen fucon.es (ES y CA)...", flush=True)
    web_items = scrape_all_web_products()
    print(f"   Productos extraídos de la web: {len(web_items)}", flush=True)

    print("3. Cargando base normalizada desde Google Drive...", flush=True)
    csv_items = load_drive_csv_products()
    print(f"   Productos adicionales desde CSV: {len(csv_items)}", flush=True)

    print("4. Fusionando catálogo, optimizando imágenes y traduciendo...", flush=True)
    catalog = merge_catalog_records(web_items, csv_items, pdf_images)

    print("5. Guardando catalog.json...", flush=True)
    save_catalog_json(catalog)

    print_summary(catalog, time.time() - start_time)


if __name__ == "__main__":
    main()
