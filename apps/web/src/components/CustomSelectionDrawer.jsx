import React from 'react';
import { t } from '../i18n/translations.js';
import { PrintIcon } from './Icons.jsx';

export function CustomSelectionDrawer(props) {
  const { count, lang, onClear, onOpenPrint } = props;
  if (!count || count === 0) return null;

  return (
    <aside className="selection-drawer no-print" aria-label="Bandeja de selección personalizada">
      <div className="selection-info">
        <span className="selection-badge tabular-nums">{count}</span>
        <strong>{t('customSelection', lang)}</strong>
      </div>
      <div className="selection-actions">
        <button
          type="button"
          onClick={onClear}
          className="btn-secondary"
        >
          {t('clearSelection', lang)}
        </button>
        <button
          type="button"
          onClick={onOpenPrint}
          className="btn-primary"
        >
          <PrintIcon size={15} />
          <span>{t('printSheet', lang)}</span>
        </button>
      </div>
    </aside>
  );
}
