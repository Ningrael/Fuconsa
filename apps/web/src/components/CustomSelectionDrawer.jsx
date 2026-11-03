import React from 'react';
import { t } from '../i18n/translations.js';

export function CustomSelectionDrawer(props) {
  const { count, lang, onClear, onOpenPrint } = props;
  if (!count || count === 0) return null;

  return (
    <aside className="selection-drawer no-print" aria-label="Bandeja de selección personalizada">
      <div className="selection-info">
        <span className="selection-badge">{count}</span>
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
          <span>🖨️</span> {t('printSheet', lang)}
        </button>
      </div>
    </aside>
  );
}
