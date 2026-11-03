import React from 'react';
import { CONTACT_INFO } from '../constants/contact.js';
import { t } from '../i18n/translations.js';

export function A4PageFooter({ pageNumber, totalPages, lang }) {
  return (
    <footer className="a4-footer tabular-nums">
      <span>{t('disclaimerVat', lang)}</span>
      <span>
        {t('page', lang)} {pageNumber} / {totalPages} · WhatsApp: {CONTACT_INFO.phoneDisplay}
      </span>
    </footer>
  );
}
