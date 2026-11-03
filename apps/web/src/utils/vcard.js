import { generateVCard } from '../constants/contact.js';

export function downloadVCard(filename = 'Matias-Sosa-Fuconsa.vcf') {
  const content = generateVCard();
  if (typeof window === 'undefined' || !window.Blob) {
    return content;
  }
  const blob = new Blob([content], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  return content;
}
