import React, { useState } from 'react';
import { CONTACT_INFO } from '../constants/contact.js';
import { SECTORS } from '../constants/sectors.js';
import { downloadVCard } from '../utils/vcard.js';
import { t } from '../i18n/translations.js';

function CoverAvatar() {
  const [imgError, setImgError] = useState(false);
  return (
    <div className="cover-avatar" aria-label="Logo Fuconsa">
      {!imgError ? (
        <img
          src="/assets/brand/logo.png"
          alt="Fuconsa"
          className="cover-logo-img"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="cover-logo-fallback">FUCONSA</span>
      )}
    </div>
  );
}

function ContactButtons({ lang }) {
  return (
    <div className="contact-actions">
      <a
        href={CONTACT_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-action btn-whatsapp"
      >
        <span>💬</span>
        <span>{t('whatsappAction', lang)}</span>
      </a>
      <a href={`tel:${CONTACT_INFO.phoneRaw}`} className="btn-action btn-call">
        <span>📞</span>
        <span>{t('callAction', lang)}</span>
      </a>
      <button
        type="button"
        onClick={() => downloadVCard()}
        className="btn-action btn-vcf"
      >
        <span>📇</span>
        <span>{t('saveContactAction', lang)}</span>
      </button>
    </div>
  );
}

function SectorsList({ lang, currentSector, onSelectSector }) {
  return (
    <nav className="sectors-nav" aria-label="Sectores comerciales">
      <button
        type="button"
        className={`sector-chip sector-chip-all ${!currentSector ? 'active' : ''}`}
        onClick={() => onSelectSector('')}
      >
        <span className="sector-chip-title">{t('allSectors', lang)}</span>
      </button>
      {SECTORS.map((sec) => (
        <button
          key={sec.id}
          type="button"
          className={`sector-chip sector-card-${sec.id} ${currentSector === sec.id ? 'active' : ''}`}
          onClick={() => onSelectSector(sec.id)}
        >
          <span className="sector-chip-text">
            <span className="sector-chip-title">{t(sec.key, lang)}</span>
            {sec.tag ? <small className="sector-chip-sub" aria-hidden="true">{sec.tag}</small> : null}
          </span>
          {sec.img ? (
            <img
              src={sec.img}
              alt=""
              aria-hidden="true"
              className="sector-chip-thumb"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          ) : null}
        </button>
      ))}
    </nav>
  );
}

export function CoverQRCard({ lang, currentSector, onSelectSector }) {
  return (
    <header className="cover-card">
      <div className="cover-top-row">
        <div className="cover-header">
          <CoverAvatar />
          <div className="cover-info">
            <span className="cover-eyebrow">CATÁLOGO COMERCIAL INTERACTIVO</span>
            <h1>{CONTACT_INFO.fullName}</h1>
            <p>{t('commercialRole', lang)}</p>
            <span className="cover-phone-badge">{CONTACT_INFO.phoneDisplay}</span>
          </div>
        </div>
        <ContactButtons lang={lang} />
      </div>
      <SectorsList
        lang={lang}
        currentSector={currentSector}
        onSelectSector={onSelectSector}
      />
    </header>
  );
}
