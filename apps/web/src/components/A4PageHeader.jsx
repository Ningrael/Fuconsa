import React from 'react';
import { CONTACT_INFO } from '../constants/contact.js';
import { t } from '../i18n/translations.js';
import { withBase } from '../utils/assetUrl.js';

export function A4PageHeader({ lang }) {
  return (
    <header className="a4-header">
      <div className="a4-header-brand">
        <img
          src={withBase('/assets/brand/logo.png')}
          alt="Fuconsa"
          className="a4-header-logo"
          crossOrigin="anonymous"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <span className="visually-hidden-accessible">FUCONSA</span>
      </div>
      <div className="a4-contact-box tabular-nums">
        <div className="a4-contact-name">{CONTACT_INFO.fullName}</div>
        <div className="a4-contact-role">{t('commercialRole', lang)}</div>
        <div className="a4-contact-meta">{CONTACT_INFO.phoneDisplay} · {CONTACT_INFO.email}</div>
      </div>
    </header>
  );
}
