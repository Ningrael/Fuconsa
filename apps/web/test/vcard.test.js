import { describe, it, expect } from 'vitest';
import { generateVCard } from '../src/constants/contact.js';

describe('vCard generation', () => {
  it('generates standard RFC compliant vCard 3.0 text', () => {
    const vcf = generateVCard();
    expect(vcf).toContain('BEGIN:VCARD');
    expect(vcf).toContain('VERSION:3.0');
    expect(vcf).toContain('FN:Matías Sosa Marrazzo');
    expect(vcf).toContain('TEL;TYPE=CELL,VOICE:+34613018609');
    expect(vcf).toContain('EMAIL;TYPE=INTERNET,PREF:sosamatias@gmail.com');
    expect(vcf).toContain('ORG:Fuconsa;');
    expect(vcf).toContain('END:VCARD');
  });
});
