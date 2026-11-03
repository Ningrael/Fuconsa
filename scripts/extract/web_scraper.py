"""Web scraper for fucon.es Spanish and Catalan catalogs."""
import re
import urllib.request
import urllib.parse
from bs4 import BeautifulSoup
from constants import BASE_URL, CATEGORIES
from text_utils import clean_spaces, clean_erratas, parse_price_str, slugify


def fetch_html(url: str) -> str:
    """Fetch URL contents with a browser user-agent."""
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            return resp.read().decode("utf-8", errors="replace")
    except Exception:
        return ""


def get_category_pages(base_cat_url: str, first_html: str) -> list[str]:
    """Find pagination URLs for a category."""
    urls = [base_cat_url]
    pattern = re.escape(base_cat_url.rstrip("/")) + r"/\d+"
    for m in re.finditer(r'href="([^"]+)"', first_html):
        href = m.group(1)
        full_url = urllib.parse.urljoin(BASE_URL, href)
        if re.match(pattern, full_url) and full_url not in urls:
            urls.append(full_url)
    return sorted(urls)


def extract_best_image_url(item_soup: BeautifulSoup) -> str:
    """Extract highest resolution image from hoobaweb picture element."""
    pic = item_soup.find("picture")
    if not pic:
        img = item_soup.find("img")
        return img["src"] if img and img.get("src") else ""
    for s in pic.find_all("source"):
        srcset = s.get("srcset", "")
        matches = re.findall(r"(https://images\.hoobaweb\.com/[^\s,]+)", srcset)
        high_res = [u for u in matches if any(k in u for k in ["1600-1200", "1280-960"])]
        if high_res:
            return high_res[-1]
        if matches:
            return matches[-1]
    img = pic.find("img")
    return img["src"] if img and img.get("src") else ""


def parse_item_card(li_soup: BeautifulSoup, cat_meta: dict) -> dict | None:
    """Parse single product card from listing page."""
    a_elem = li_soup.find("a", class_="element")
    if not a_elem:
        return None
    name_elem = li_soup.find("h2", class_="element-cont-nom")
    resum_elem = li_soup.find("p", class_="element-cont-resum")
    box_elem = li_soup.find("div", class_="element-content-preu-outside-import")
    name = clean_erratas(name_elem.get_text(strip=True)) if name_elem else ""
    resum = clean_spaces(resum_elem.get_text(strip=True)) if resum_elem else ""
    box_str = box_elem.get_text(strip=True) if box_elem else ""
    unit_price, price_text = parse_price_str(resum)
    box_price, _ = parse_price_str(box_str)
    return {
        "name": name,
        "format": resum.replace("Precio ", "").replace("Preu ", ""),
        "unitPrice": unit_price,
        "boxPrice": box_price,
        "priceText": price_text or (f"{box_price:.2f} €" if box_price else ""),
        "imageUrl": extract_best_image_url(li_soup),
        "relHref": a_elem.get("href", ""),
        "channel": cat_meta["channel"],
        "sector": cat_meta["sector"],
        "section": cat_meta["section"],
        "brand": cat_meta["brand"],
    }


def scrape_category_path(path: str, cat_meta: dict) -> list[dict]:
    """Scrape all items across all pages for a category path."""
    first_url = urllib.parse.urljoin(BASE_URL, path)
    first_html = fetch_html(first_url)
    if not first_html:
        return []
    pages = get_category_pages(first_url, first_html)
    items = []
    for p_url in pages:
        html_doc = first_html if p_url == first_url else fetch_html(p_url)
        soup = BeautifulSoup(html_doc, "html.parser")
        for li in soup.find_all("li", class_=re.compile(r"flex-")):
            card = parse_item_card(li, cat_meta)
            if card and card["name"]:
                items.append(card)
    return items


def merge_es_ca_items(es_items: list[dict], ca_items: list[dict]) -> list[dict]:
    """Pair Spanish and Catalan items by image key or position."""
    ca_by_img = {
        re.search(r"/[^/]+$", item["imageUrl"]).group(0): item
        for item in ca_items if item["imageUrl"] and re.search(r"/[^/]+$", item["imageUrl"])
    }
    merged = []
    for idx, es in enumerate(es_items):
        img_key = re.search(r"/[^/]+$", es["imageUrl"]).group(0) if es["imageUrl"] else ""
        ca = ca_by_img.get(img_key) or (ca_items[idx] if idx < len(ca_items) else None)
        ca_name = ca["name"] if ca else es["name"]
        merged.append({
            "id": slugify(f"{es['brand']}-{es['name']}"),
            "channel": es["channel"],
            "sector": es["sector"],
            "section": es["section"],
            "brand": es["brand"],
            "name": {"es": es["name"], "ca": ca_name},
            "format": es["format"] or (ca["format"] if ca else ""),
            "unitPrice": es["unitPrice"],
            "boxPrice": es["boxPrice"],
            "priceText": es["priceText"],
            "imageUrl": es["imageUrl"] or (ca["imageUrl"] if ca else ""),
        })
    return merged


def scrape_all_web_products() -> list[dict]:
    """Crawl 100% of categories in Spanish and Catalan."""
    all_products = []
    for cat in CATEGORIES:
        es_items = scrape_category_path(cat["path_es"], cat)
        ca_items = scrape_category_path(cat["path_ca"], cat)
        merged = merge_es_ca_items(es_items, ca_items)
        all_products.extend(merged)
    return all_products
