import React from 'react';
import { t } from '../i18n/translations.js';

export function A4PageFooter({ pageNumber, totalPages, lang }) {
  return (
    <footer className="a4-footer tabular-nums">
      <span>{t('disclaimerVat', lang)}</span>
      <span>
        {t('page', lang)} {pageNumber} / {totalPages}
      </span>
    </footer>
  );
}
