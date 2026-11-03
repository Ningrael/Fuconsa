export const CONTACT_INFO = Object.freeze({
  fullName: 'Matías Sosa Marrazzo',
  firstName: 'Matías',
  lastName: 'Sosa Marrazzo',
  role: 'Comercial Fuconsa en Cataluña',
  company: 'Fuconsa',
  phoneDisplay: '+34 613 018 609',
  phoneRaw: '+34613018609',
  whatsappUrl: 'https://wa.me/34613018609',
  email: 'sosamatias@gmail.com',
  websiteUrl: 'https://www.fucon.es/'
});

export function generateVCard() {
  const c = CONTACT_INFO;
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${c.fullName}`,
    `N:${c.lastName};${c.firstName};;;`,
    `ORG:${c.company};`,
    `TITLE:${c.role}`,
    `TEL;TYPE=CELL,VOICE:${c.phoneRaw}`,
    `EMAIL;TYPE=INTERNET,PREF:${c.email}`,
    `URL:${c.websiteUrl}`,
    'END:VCARD'
  ].join('\r\n');
}
