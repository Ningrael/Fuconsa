/**
 * Formateador de precios y textos para diseño editorial con números tabulares.
 */

export function formatPrice(amount, currency = '€') {
  if (amount === null || amount === undefined || Number.isNaN(Number(amount))) {
    return '—';
  }
  const numeric = Number(amount);
  const formatted = numeric.toFixed(2).replace('.', ',');
  return currency ? `${formatted} ${currency}` : formatted;
}

export function formatPricePerUnit(unitPrice, unit = 'kg') {
  if (unitPrice === null || unitPrice === undefined || Number.isNaN(Number(unitPrice))) {
    return '—';
  }
  const base = formatPrice(unitPrice);
  return `${base}/${unit}`;
}

export function formatBoxPrice(boxPrice) {
  if (boxPrice === null || boxPrice === undefined || Number.isNaN(Number(boxPrice))) {
    return '—';
  }
  return `${formatPrice(boxPrice)}/caja`;
}

export function formatPhone(rawPhone) {
  if (!rawPhone) return '';
  const digits = String(rawPhone).replace(/[^\d+]/g, '');
  if (digits.startsWith('+34') && digits.length === 12) {
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9)}`;
  }
  return digits;
}

export function normalizeSearchText(text) {
  if (!text) return '';
  return String(text)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}
