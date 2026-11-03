"""Gastronomy translations for ES -> CA and ES -> EN."""
import re
from text_utils import clean_spaces

ES_TO_EN_TERMS = {
    "pescado y marisco": "Fish & Seafood",
    "platos precocinados": "Prepared Dishes",
    "verduras": "Vegetables",
    "postres": "Desserts",
    "productos latinos": "Latin Products",
    "açaí polpa norte": "Açaí Polpa Norte",
    "albondigas": "Meatballs",
    "calamar": "Squid",
    "croquetas": "Croquettes",
    "merluza": "Hake",
    "bacalao": "Cod",
    "langostino": "King Prawns",
    "gambas": "Prawns",
    "sepia": "Cuttlefish",
    "pulpo": "Octopus",
    "atun": "Tuna",
    "salmon": "Salmon",
    "espinaca": "Spinach",
    "alcachofa": "Artichoke",
    "aguacate": "Avocado",
    "brocoli": "Broccoli",
    "guisante": "Peas",
    "esparrago": "Asparagus",
    "cebolla": "Onion",
    "setas": "Mushrooms",
    "boletus": "Boletus Mushrooms",
    "pulpa": "Pulp",
    "piña": "Pineapple",
    "fresa": "Strawberry",
    "maracuya": "Passion Fruit",
    "guayaba": "Guava",
    "helado": "Ice Cream",
    "tarrina": "Tub",
    "tequeños": "Cheese Fingers (Tequeños)",
    "arepas": "Corn Cakes (Arepas)",
    "humitas": "Steamed Corn Cakes (Humitas)",
    "pura": "Pure",
    "con guarana": "with Guaraná",
    "dados": "Diced",
    "troceada": "Chopped",
    "hoja": "Leaf",
}

ES_TO_CA_TERMS = {
    "albondigas": "mandonguilles",
    "pescado y marisco": "peix i marisc",
    "platos precocinados": "plats precuinats",
    "verduras": "verdures",
    "cebolla": "ceba",
    "espinaca": "espinacs",
    "guisante": "pèsols",
    "fresa": "maduixa",
    "piña": "pinya",
    "setas": "bolets",
    "merluza": "lluç",
    "atun": "tonyina",
    "sepia": "sípia",
    "pulpo": "pop",
}


def translate_text(text: str, dictionary: dict) -> str:
    """Replace recognized culinary words with translations."""
    if not text:
        return ""
    result = text
    for es_term, target in dictionary.items():
        pattern = re.compile(rf"\b{re.escape(es_term)}\b", re.IGNORECASE)
        result = pattern.sub(target, result)
    return clean_spaces(result)


def to_catalan(es_name: str) -> str:
    """Generate Catalan product name if missing."""
    return translate_text(es_name, ES_TO_CA_TERMS)


def to_english(es_name: str) -> str:
    """Generate English product name."""
    en = translate_text(es_name, ES_TO_EN_TERMS)
    return en if en != es_name else f"{es_name} (Fuconsa Selection)"


def translate_product_names(names: dict) -> dict:
    """Ensure complete trilingual dictionary with es, ca, en."""
    es = names.get("es", "").strip()
    ca = names.get("ca", "").strip() or to_catalan(es)
    en = names.get("en", "").strip() or to_english(es)
    return {"es": es, "ca": ca, "en": en}
