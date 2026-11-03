import React from 'react';
import { CONTACT_INFO } from '../constants/contact.js';
import { t } from '../i18n/translations.js';

export function A4PageHeader({ title, lang }) {
  return (
    <header className="a4-header">
      <div>
        <div className="a4-brand-title">FUCONSA</div>
        <div className="a4-brand-sub">{title || t('customSelection', lang)}</div>
      </div>
      <div className="a4-contact-box">
        <div className="a4-contact-name">{CONTACT_INFO.fullName}</div>
        <div>{t('commercialRole', lang)}</div>
        <div>{CONTACT_INFO.phoneDisplay} · {CONTACT_INFO.email}</div>
      </div>
    </header>
  );
}
