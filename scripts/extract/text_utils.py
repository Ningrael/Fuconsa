"""Text formatting, normalization, and errata correction utilities."""
import re
import html
import unicodedata
from constants import ERRATAS_TEXT_MAP


def clean_spaces(text: str) -> str:
    """Strip HTML entities and repeated whitespace."""
    if not text:
        return ""
    unescaped = html.unescape(text)
    return re.sub(r"\s+", " ", unescaped).strip()


def strip_accents(text: str) -> str:
    """Remove diacritics for flexible matching."""
    nfkd = unicodedata.normalize("NFKD", text)
    return "".join(c for c in nfkd if not unicodedata.combining(c))


def clean_erratas(text: str) -> str:
    """Replace known catalog typos and misspellings."""
    res = clean_spaces(text)
    low = strip_accents(res).lower()
    for typo, correction in ERRATAS_TEXT_MAP.items():
        if typo in low:
            pattern = re.compile(re.escape(typo), re.IGNORECASE)
            res = pattern.sub(correction, res)
    return clean_spaces(res)


def slugify(text: str) -> str:
    """Generate a clean URL/ID slug from a text string."""
    clean = strip_accents(text.lower())
    clean = re.sub(r"[^a-z0-9]+", "-", clean)
    return clean.strip("-")


def parse_price_str(price_val) -> tuple[float | None, str]:
    """Parse numeric price and format unit from string or number."""
    if price_val is None:
        return None, ""
    if isinstance(price_val, (int, float)):
        return round(float(price_val), 2), f"{float(price_val):.2f} €"
    s = str(price_val).replace("'", "").replace("€", "").strip()
    match = re.search(r"(\d+(?:[.,]\d+)?)", s)
    if not match:
        return None, s
    num = float(match.group(1).replace(",", "."))
    unit = "/kg" if "/kg" in s.lower() else ("/ud" if any(u in s.lower() for u in ["/ud", "unidad", "unitat"]) else "")
    formatted = f"{num:.2f} €{unit}"
    return round(num, 2), formatted
