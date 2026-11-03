import React, { useState } from 'react';
import { CONTACT_INFO } from '../constants/contact.js';
import { SECTORS } from '../constants/sectors.js';
import { downloadVCard } from '../utils/vcard.js';
import { SUPPORTED_LANGUAGES, t } from '../i18n/translations.js';

function TopLangBar({ lang, onChangeLang }) {
  if (!onChangeLang) return null;
  return (
    <div className="cover-top-bar">
      <span className="cover-eyebrow">FUCONSA · CATÁLOGO OFICIAL B2B</span>
      <div className="lang-switch top-lang-switch" role="group" aria-label="Selector de idioma superior">
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
    </div>
  );
}

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

function SectorsList({ lang, currentSector, onSelectSector, onSelectSubcategory }) {
  return (
    <nav className="sectors-nav" aria-label="Sectores comerciales">
      <button
        type="button"
        className={`sector-chip sector-chip-all ${currentSector === 'all' ? 'active' : ''}`}
        onClick={() => onSelectSector('')}
      >
        <span className="sector-chip-title">{t('allSectors', lang)}</span>
      </button>
      {SECTORS.map((sec) => (
        <div key={sec.id} className="sector-card-group">
          <button
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
          {onSelectSubcategory && sec.subcategories && sec.subcategories.length > 1 ? (
            <div className="sector-sub-pills">
              {sec.subcategories.map((sub) => (
                <button
                  key={sub}
                  type="button"
                  className="subcat-pill"
                  onClick={() => onSelectSubcategory(sec.id, sub)}
                >
                  {sub}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </nav>
  );
}

export function CoverQRCard(props) {
  const { lang, onChangeLang, currentSector, onSelectSector, onSelectSubcategory, isLanding } = props;
  return (
    <header className={`cover-card ${isLanding ? 'cover-landing' : ''}`}>
      <TopLangBar lang={lang} onChangeLang={onChangeLang} />
      <div className="cover-top-row">
        <div className="cover-header">
          <CoverAvatar />
          <div className="cover-info">
            <h1>{CONTACT_INFO.fullName}</h1>
            <p>{t('commercialRole', lang)}</p>
            <span className="cover-phone-badge">
              📱 {CONTACT_INFO.phoneDisplay} · ✉️ {CONTACT_INFO.email}
            </span>
          </div>
        </div>
        <ContactButtons lang={lang} />
      </div>
      <SectorsList
        lang={lang}
        currentSector={currentSector}
        onSelectSector={onSelectSector}
        onSelectSubcategory={onSelectSubcategory}
      />
    </header>
  );
}
