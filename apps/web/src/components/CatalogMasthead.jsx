import React from 'react';
import { SECTORS, BRAND_LOGOS } from '../constants/sectors.js';
import { SUPPORTED_LANGUAGES, t } from '../i18n/translations.js';
import { withBase } from '../utils/assetUrl.js';
import { ArrowLeftIcon } from './Icons.jsx';
import { CoverAvatar } from './CoverAvatar.jsx';

export function CatalogMasthead(props) {
  const { lang, onChangeLang, currentSector, onSelectSector, onBackToHome } = props;
  return (
    <div className="catalog-masthead">
      <div className="masthead-left">
        <button
          type="button"
          onClick={onBackToHome}
          className="btn-masthead-back"
          aria-label={t('backToHome', lang)}
        >
          <ArrowLeftIcon size={14} />
          <span>{t('backToHome', lang)}</span>
        </button>
        <CoverAvatar />
      </div>
      <nav className="masthead-sector-tabs" aria-label="Sectores comerciales">
        <button
          type="button"
          className={`btn-sector-tab ${currentSector === '' || currentSector === 'all' ? 'active' : ''}`}
          onClick={() => onSelectSector('')}
        >
          {t('allSectors', lang)}
        </button>
        {SECTORS.map((sec) => (
          <button
            key={sec.id}
            type="button"
            className={`btn-sector-tab sector-tab-${sec.id} ${currentSector === sec.id ? 'active' : ''}`}
            onClick={() => onSelectSector(sec.id)}
            title={t(sec.key, lang)}
          >
            {sec.id === 'acai' ? (
              <>
                <img
                  src={withBase(BRAND_LOGOS['Polpa Norte'])}
                  alt=""
                  aria-hidden="true"
                  className="sector-tab-brand-logo"
                />
                <span className="visually-hidden-accessible">{t(sec.key, lang)}</span>
              </>
            ) : (
              t(sec.key, lang)
            )}
          </button>
        ))}
      </nav>
      <div className="masthead-right">
        {onChangeLang ? (
          <div className="lang-switch masthead-lang-switch" role="group" aria-label="Selector de idioma superior">
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
