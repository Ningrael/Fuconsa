"""Constants and mappings for Fuconsa extraction pipeline."""
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parents[2]
DRIVE_DIR = Path(
    r"G:\.shortcut-targets-by-id\1EuLIFEMakda8UH4wvG5fPzeU0ztYlqrU"
    r"\Creación de catálogos para Antigravity"
)

OUT_DATA_DIR = ROOT_DIR / "packages" / "lib" / "data"
OUT_ASSETS_DIR = ROOT_DIR / "packages" / "lib" / "assets" / "products"
CATALOG_JSON_PATH = OUT_DATA_DIR / "catalog.json"

BASE_URL = "https://www.fucon.es"

CATEGORIES = [
    {
        "channel": "horeca",
        "sector": "acai",
        "section": "AÇAÍ POLPA NORTE",
        "brand": "Polpa Norte",
        "path_es": "/es/tienda-online/horeca/acai/",
        "path_ca": "/ca/botiga-online/horeca/acai/",
    },
    {
        "channel": "horeca",
        "sector": "horeca",
        "section": "PESCADO Y MARISCO",
        "brand": "Fuconsa",
        "path_es": "/es/tienda-online/horeca/pescado-y-marisco/",
        "path_ca": "/ca/botiga-online/horeca/peix-i-marisc/",
    },
    {
        "channel": "horeca",
        "sector": "horeca",
        "section": "PLATOS PRECOCINADOS",
        "brand": "Fuconsa",
        "path_es": "/es/tienda-online/horeca/platos-precocinados/",
        "path_ca": "/ca/botiga-online/horeca/plats-precuinats/",
    },
    {
        "channel": "horeca",
        "sector": "horeca",
        "section": "POSTRES",
        "brand": "Fuconsa",
        "path_es": "/es/tienda-online/horeca/postres/",
        "path_ca": "/ca/botiga-online/horeca/postres/",
    },
    {
        "channel": "horeca",
        "sector": "horeca",
        "section": "VERDURAS",
        "brand": "Fuconsa",
        "path_es": "/es/tienda-online/horeca/verduras/",
        "path_ca": "/ca/botiga-online/horeca/verdures/",
    },
    {
        "channel": "supermercados",
        "sector": "supermercados",
        "section": "BEN & JERRY'S",
        "brand": "Ben & Jerry's",
        "path_es": "/es/tienda-online/supermercado/ben-jerry-s/",
        "path_ca": "/ca/botiga-online/supermercat/ben-jerry-s/",
    },
    {
        "channel": "supermercados",
        "sector": "supermercados",
        "section": "BUITONI",
        "brand": "Buitoni",
        "path_es": "/es/tienda-online/supermercado/buitoni/",
        "path_ca": "/ca/botiga-online/supermercat/buitoni/",
    },
    {
        "channel": "supermercados",
        "sector": "supermercados",
        "section": "DELFÍN",
        "brand": "Delfín",
        "path_es": "/es/tienda-online/supermercado/delfin/",
        "path_ca": "/ca/botiga-online/supermercat/delfin/",
    },
    {
        "channel": "supermercados",
        "sector": "supermercados",
        "section": "DR. OETKER",
        "brand": "Dr. Oetker",
        "path_es": "/es/tienda-online/supermercado/dr-oerker/",
        "path_ca": "/ca/botiga-online/supermercat/dr-oerker/",
    },
    {
        "channel": "supermercados",
        "sector": "supermercados",
        "section": "FRIGO",
        "brand": "Frigo",
        "path_es": "/es/tienda-online/supermercado/frigo/",
        "path_ca": "/ca/botiga-online/supermercat/frigo/",
    },
    {
        "channel": "supermercados",
        "sector": "supermercados",
        "section": "FRIPOZO",
        "brand": "Fripozo",
        "path_es": "/es/tienda-online/supermercado/fripozo/",
        "path_ca": "/ca/botiga-online/supermercat/fripozo/",
    },
    {
        "channel": "supermercados",
        "sector": "supermercados",
        "section": "HÄAGEN-DAZS",
        "brand": "Häagen-Dazs",
        "path_es": "/es/tienda-online/supermercado/haggen-dazs/",
        "path_ca": "/ca/botiga-online/supermercat/haggen-dazs/",
    },
    {
        "channel": "supermercados",
        "sector": "supermercados",
        "section": "JV",
        "brand": "JV",
        "path_es": "/es/tienda-online/supermercado/jv/",
        "path_ca": "/ca/botiga-online/supermercat/jv/",
    },
    {
        "channel": "supermercados",
        "sector": "supermercados",
        "section": "MAHESO",
        "brand": "Maheso",
        "path_es": "/es/tienda-online/supermercado/maheso/",
        "path_ca": "/ca/botiga-online/supermercat/maheso/",
    },
    {
        "channel": "supermercados",
        "sector": "supermercados",
        "section": "NESTLÉ",
        "brand": "Nestlé",
        "path_es": "/es/tienda-online/supermercado/nestle/",
        "path_ca": "/ca/botiga-online/supermercat/nestle/",
    },
    {
        "channel": "supermercados",
        "sector": "latinos",
        "section": "PRODUCTOS LATINOS",
        "brand": "Productos Latinos",
        "path_es": "/es/tienda-online/supermercado/productes-latinos/",
        "path_ca": "/ca/botiga-online/supermercat/productes-llatins/",
    },
]

ERRATAS_TEXT_MAP = {
    "dr-oerker": "Dr. Oetker",
    "dr.oetker": "Dr. Oetker",
    "dr. oerker": "Dr. Oetker",
    "dr oetker": "Dr. Oetker",
    "haggen-dazs": "Häagen-Dazs",
    "haggen dazs": "Häagen-Dazs",
    "haagen dazs": "Häagen-Dazs",
    "ghumitas 500gr": "Humitas 500g",
    "ghumitas": "Humitas",
    "aasi con guarana 500gr": "Açaí con Guaraná 500g",
    "açasi con guarana 500gr": "Açaí con Guaraná 500g",
    "acasi con guarana 500gr": "Açaí con Guaraná 500g",
    "culpa acerola 100gr": "Pulpa Acerola 100g",
    "maxibon cheescacke": "Maxibon Cheesecake",
    "maxibon strengerstingh": "Maxibon Stranger Things",
    "maxibon wafle 4u.": "Maxibon Waffle 4u.",
    "cono extrem nata fresa x6": "Cono Extreme Nata Fresa x6",
}

ROTATE_PRODUCTS = {
    "pulpa caju 100gr",
    "pulpa caju 100gr polpanorte",
    "helado cupuacu 1,5l",
    "crema de cupuacu 1,5l",
    "crema de cupuacu 1,5l polpanorte",
    "helado cupuacu 5l",
    "crema de cupuacu 5l",
    "crema de cupuacu 5l polpanorte",
    "maxibon nata 4u.",
    "maxibon cookie 4u.",
    "maxibon cheesecake",
    "maxibon cheescacke",
    "maxibon stranger things",
    "maxibon strengerstingh",
}
