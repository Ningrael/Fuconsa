import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { CONTACT_INFO } from '../constants/contact.js';
import { downloadVCard } from '../utils/vcard.js';
import { SUPPORTED_LANGUAGES, t } from '../i18n/translations.js';
import { WhatsAppIcon, PhoneIcon, VCardIcon } from './Icons.jsx';
import { CoverAvatar } from './CoverAvatar.jsx';
import { LandingSectorsShowcase } from './LandingSectorsShowcase.jsx';

function QrButtonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 14h3v3h-3zM20 14v7M14 20h3" />
    </svg>
  );
}

function VCardTopNav({ lang, onChangeLang, onShowQr }) {
  return (
    <div className="vcard-top-bar">
      <div className="top-brand-cluster">
        <CoverAvatar />
        <div className="top-brand-meta">
          <span className="hero-authority-pill">{t('heroAuthorityBadge', lang)}</span>
        </div>
      </div>
      <div className="top-actions-cluster">
        <button type="button" onClick={onShowQr} className="btn-top-qr">
          <QrButtonIcon />
          <span>{t('showMyQrBtn', lang)}</span>
        </button>
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
    </div>
  );
}

function ContactButtons({ lang }) {
  return (
    <div className="contact-actions">
      <a href={CONTACT_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-action btn-whatsapp">
        <WhatsAppIcon size={16} />
        <span>{t('whatsappAction', lang)}</span>
      </a>
      <a href={`tel:${CONTACT_INFO.phoneRaw}`} className="btn-action btn-call">
        <PhoneIcon size={15} />
        <span>{t('callAction', lang)}</span>
      </a>
      <button type="button" onClick={() => downloadVCard()} className="btn-action btn-vcf">
        <VCardIcon size={15} />
        <span>{t('saveContactAction', lang)}</span>
      </button>
    </div>
  );
}

function HeroExecutiveCard({ lang, onChangeLang, onShowQr }) {
  return (
    <section className="personal-vcard-card hero-executive-card">
      <VCardTopNav lang={lang} onChangeLang={onChangeLang} onShowQr={onShowQr} />
      <div className="executive-main-row">
        <div className="vcard-bio">
          <p className="vcard-role">{t('commercialRole', lang)}</p>
          <h1>{CONTACT_INFO.fullName}</h1>
          <p className="hero-subtitle">{t('heroSubtitle', lang)}</p>
          <div className="vcard-phone-pill tabular-nums">
            <span>{CONTACT_INFO.phoneDisplay} · {CONTACT_INFO.email}</span>
          </div>
        </div>
        <ContactButtons lang={lang} />
      </div>
    </section>
  );
}

export function LandingVCard({ lang, onChangeLang, onSelectSector }) {
  const [qrSvg, setQrSvg] = useState('');
  const [showQrModal, setShowQrModal] = useState(false);
  const currentUrl = typeof window !== 'undefined' && window.location?.origin
    ? window.location.href.split('#')[0].split('?')[0]
    : '';

  useEffect(() => {
    let active = true;
    if (currentUrl) {
      const opts = { type: 'svg', margin: 1, width: 220, color: { dark: '#0F2342', light: '#FFFFFF' } };
      QRCode.toString(currentUrl, opts).then((svg) => {
        if (active) setQrSvg(svg);
      }).catch(() => {});
    }
    return () => { active = false; };
  }, [currentUrl]);

  return (
    <div className="landing-experience">
      <HeroExecutiveCard
        lang={lang}
        onChangeLang={onChangeLang}
        onShowQr={() => setShowQrModal(true)}
      />
      <LandingSectorsShowcase
        lang={lang}
        onSelectSector={onSelectSector}
        showQrModal={showQrModal}
        onCloseQr={() => setShowQrModal(false)}
        qrSvg={qrSvg}
      />
    </div>
  );
}
