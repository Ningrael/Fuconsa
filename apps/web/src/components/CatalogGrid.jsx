import React from 'react';
import { ProductCard } from './ProductCard.jsx';
import { CompactTable } from './CompactTable.jsx';
import { t } from '../i18n/translations.js';

function OfflineNotice({ lang, onRetry }) {
  return (
    <div className="offline-notice-banner" role="status">
      <span className="offline-notice-text">⚠️ {t('offlineNotice', lang)}</span>
      <button type="button" onClick={onRetry} className="btn-secondary btn-retry-offline">
        🔄 {t('retry', lang)}
      </button>
    </div>
  );
}

function EmptyState({ lang }) {
  return (
    <div className="empty-state">
      <p style={{ fontSize: '16px', fontWeight: '600' }}>{t('noProductsFound', lang)}</p>
    </div>
  );
}

export function CatalogGrid(props) {
  const { items, lang, isOffline, onRetry, isSelected, onToggleSelect, onlyWithPhoto, viewMode } = props;
  const showAllAsCards = viewMode === 'allCards';
  const cardItems = showAllAsCards ? items : items.filter((it) => Boolean(it.hasPhoto));
  const tableItems = showAllAsCards ? [] : items.filter((it) => !it.hasPhoto);

  if (items.length === 0) {
    return (
      <div>
        {isOffline ? <OfflineNotice lang={lang} onRetry={onRetry} /> : null}
        <EmptyState lang={lang} />
      </div>
    );
  }

  return (
    <div>
      {isOffline ? <OfflineNotice lang={lang} onRetry={onRetry} /> : null}
      <div className="catalog-grid">
        {cardItems.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            lang={lang}
            isSelected={isSelected(item.id)}
            onToggleSelect={onToggleSelect}
          />
        ))}
      </div>
      {!onlyWithPhoto && tableItems.length > 0 ? (
        <CompactTable
          items={tableItems}
          lang={lang}
          isSelected={isSelected}
          onToggleSelect={onToggleSelect}
        />
      ) : null}
    </div>
  );
}
