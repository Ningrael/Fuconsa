import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { CONTACT_INFO } from '../constants/contact.js';
import { SECTORS } from '../constants/sectors.js';
import { downloadVCard } from '../utils/vcard.js';
import { SUPPORTED_LANGUAGES, t } from '../i18n/translations.js';
import { WhatsAppIcon, PhoneIcon, VCardIcon, ArrowRightIcon } from './Icons.jsx';
import { CoverAvatar } from './CoverAvatar.jsx';

function ContactButtons({ lang }) {
  return (
    <div className="contact-actions">
      <a
        href={CONTACT_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-action btn-whatsapp"
      >
        <WhatsAppIcon size={15} />
        <span>{t('whatsappAction', lang)}</span>
      </a>
      <a href={`tel:${CONTACT_INFO.phoneRaw}`} className="btn-action btn-call">
        <PhoneIcon size={15} />
        <span>{t('callAction', lang)}</span>
      </a>
      <button
        type="button"
        onClick={() => downloadVCard()}
        className="btn-action btn-vcf"
      >
        <VCardIcon size={15} />
        <span>{t('saveContactAction', lang)}</span>
      </button>
    </div>
  );
}

function VCardHeader({ lang, onChangeLang }) {
  return (
    <div className="vcard-top-bar">
      <CoverAvatar />
      {onChangeLang ? (
        <div className="lang-switch landing-lang-switch" role="group" aria-label="Selector de idioma superior">
          {SUPPORTED_LANGUAGES.map((code) => (
            <button
              key={code}
              type="button"
              className={`btn-lang ${lang === code ? 'active' : ''}`}
              onClick={() => onChangeLang(code)}
            >
              {code.toUpperCase()}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function LandingVCard(props) {
  const { lang, onChangeLang, onSelectSector } = props;
  const [qrSvg, setQrSvg] = useState('');
  const currentUrl = typeof window !== 'undefined' && window.location?.origin
    ? window.location.origin
    : '';

  useEffect(() => {
    let active = true;
    QRCode.toString(currentUrl, {
      type: 'svg',
      margin: 1,
      width: 130,
      color: { dark: '#0F2342', light: '#FFFFFF' }
    }).then((svg) => {
      if (active) setQrSvg(svg);
    }).catch(() => {});
    return () => { active = false; };
  }, [currentUrl]);

  return (
    <div className="personal-vcard-card">
      <VCardHeader lang={lang} onChangeLang={onChangeLang} />
      <div className="vcard-bio">
        <h1>{CONTACT_INFO.fullName}</h1>
        <p className="vcard-role">{t('commercialRole', lang)}</p>
        <div className="vcard-phone-pill tabular-nums">
          <span>{CONTACT_INFO.phoneDisplay} · {CONTACT_INFO.email}</span>
        </div>
      </div>
      <ContactButtons lang={lang} />
      <div className="vcard-qr-box">
        <div
          className="vcard-qr-frame"
          aria-label="Código QR del catálogo"
          dangerouslySetInnerHTML={qrSvg ? { __html: qrSvg } : undefined}
        />
        <span className="vcard-qr-hint">{t('qrSectionDesc', lang)}</span>
      </div>
      <button
        type="button"
        className="btn-enter-catalog"
        onClick={() => onSelectSector('')}
        aria-label="Entrar al Catálogo (Todos los sectores)"
      >
        <span>{t('enterCatalog', lang)}</span>
        <ArrowRightIcon size={18} />
      </button>
      <div className="landing-sectors-nav" aria-label="Sectores comerciales">
        {SECTORS.map((sec) => (
          <button
            key={sec.id}
            type="button"
            className="btn-landing-sector"
            onClick={() => onSelectSector(sec.id)}
          >
            {t(sec.key, lang)}
          </button>
        ))}
      </div>
    </div>
  );
}
