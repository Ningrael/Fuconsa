"""Extract and normalize products from Drive CSV and Excel sources."""
import csv
import re
from pathlib import Path
from constants import DRIVE_DIR
from text_utils import clean_spaces, clean_erratas, parse_price_str, slugify


def extract_format_from_name(name: str) -> tuple[str, str]:
    """Separate package size / format suffix from product name."""
    fmt_pat = r"(\b\d+\s*[xX]\s*\d+(?:[.,]\d+)?\s*(?:kg|g|gr|l|ml|u|ud)?|\b\d+(?:[.,]\d+)?\s*(?:kg|g|gr|l|ml|u|ud)\b)"
    matches = list(re.finditer(fmt_pat, name, flags=re.IGNORECASE))
    if not matches:
        return name.strip(), ""
    last = matches[-1]
    fmt = last.group(0).upper().replace("GR", "g").replace("U.", " uds")
    clean_n = (name[: last.start()] + name[last.end() :]).strip()
    clean_n = re.sub(r"\s+", " ", clean_n).strip(",- ")
    return clean_n or name, fmt


def determine_sector_brand(sec: str, prod: str) -> tuple[str, str, str, str]:
    """Map raw section and product to normalized (channel, sector, section, brand)."""
    s_up = sec.upper().strip()
    p_up = prod.upper().strip()
    if any(p_up.startswith(k) for k in ["MAXIBON", "NUII", "CONO", "OREO", "PIRULO"]):
        return "supermercados", "supermercados", "NESTLÉ", "Nestlé"
    if "LATINOS" in s_up:
        return "supermercados", "latinos", "PRODUCTOS LATINOS", "Productos Latinos"
    if "AÇAI" in s_up or "ACAI" in s_up or "POLPA" in s_up:
        return "horeca", "acai", "AÇAÍ POLPA NORTE", "Polpa Norte"
    brand_map = {
        "FRIPOZO": ("supermercados", "supermercados", "FRIPOZO", "Fripozo"),
        "MAHESO": ("supermercados", "supermercados", "MAHESO", "Maheso"),
        "DELFIN": ("supermercados", "supermercados", "DELFÍN", "Delfín"),
        "DR.OETKER": ("supermercados", "supermercados", "DR. OETKER", "Dr. Oetker"),
        "BUITONI": ("supermercados", "supermercados", "BUITONI", "Buitoni"),
        "FRIGO": ("supermercados", "supermercados", "FRIGO", "Frigo"),
        "BEN&JERRY'S": ("supermercados", "supermercados", "BEN & JERRY'S", "Ben & Jerry's"),
        "HAAGEN DAZS": ("supermercados", "supermercados", "HÄAGEN-DAZS", "Häagen-Dazs"),
        "HELADOS": ("supermercados", "supermercados", "NESTLÉ", "Nestlé"),
        "HEURA": ("supermercados", "supermercados", "HEURA", "Heura"),
    }
    for k, v in brand_map.items():
        if k in s_up:
            return v
    return "horeca", "horeca", s_up or "VARIOS", "Fuconsa"


def parse_csv_row(row: dict) -> dict | None:
    """Parse single row from productos-normalizados.csv."""
    raw_prod = clean_erratas(row.get("product", ""))
    if not raw_prod:
        return None
    raw_sec = clean_erratas(row.get("section", ""))
    clean_name, fmt = extract_format_from_name(raw_prod)
    price_val = row.get("price", "")
    unit_p, p_text = parse_price_str(price_val)
    chan, sector, section, brand = determine_sector_brand(raw_sec, raw_prod)
    return {
        "id": slugify(f"{brand}-{clean_name}"),
        "channel": chan,
        "sector": sector,
        "section": section,
        "brand": brand,
        "name": {"es": clean_name},
        "format": fmt or row.get("format", ""),
        "unitPrice": unit_p,
        "boxPrice": None,
        "priceText": p_text or str(price_val),
    }


def load_drive_csv_products() -> list[dict]:
    """Read products from Drive productos-normalizados.csv."""
    csv_file = DRIVE_DIR / "productos-normalizados.csv"
    if not csv_file.exists():
        return []
    items = []
    with csv_file.open(encoding="utf-8", errors="replace") as f:
        reader = csv.DictReader(f)
        for r in reader:
            parsed = parse_csv_row(r)
            if parsed:
                items.append(parsed)
    return items
