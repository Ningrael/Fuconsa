import { CONTACT_INFO, generateVCard } from '@fuconsa/lib';

export function handleContact(req, res, query = {}, pathname = '') {
  const wantsVcf = query.format === 'vcf' || pathname.endsWith('.vcf') || pathname.endsWith('/vcf');

  if (wantsVcf) {
    const vcard = generateVCard();
    res.writeHead(200, {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': 'attachment; filename="matias-sosa-fuconsa.vcf"',
      'Content-Length': Buffer.byteLength(vcard, 'utf-8')
    });
    res.end(vcard);
    return;
  }

  const payload = {
    success: true,
    data: CONTACT_INFO
  };
  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}
