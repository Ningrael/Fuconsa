import React from 'react';
import { t } from '../i18n/translations.js';

export function A4PageFooter({ pageNumber, totalPages, lang }) {
  return (
    <footer className="a4-footer tabular-nums">
      <span>Fuconsa · Fumats i Congelats S.A.</span>
      <span>
        {t('page', lang)} {pageNumber} / {totalPages}
      </span>
    </footer>
  );
}
