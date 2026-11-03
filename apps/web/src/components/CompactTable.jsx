import React from 'react';
import { getTranslation, t } from '../i18n/translations.js';
import { formatBoxPrice } from '../utils/formatters.js';

function CompactTableRow(props) {
  const { item, lang, isSelected, onToggleSelect } = props;
  const name = getTranslation(item.name, lang);
  return (
    <tr>
      <td className="tabular-nums">{item.id}</td>
      <td><strong>{name}</strong></td>
      <td>{item.brand || '—'}</td>
      <td>{item.format || '—'}</td>
      <td className="tabular-nums"><strong>{item.priceText || '—'}</strong></td>
      <td className="tabular-nums">{item.boxPrice ? formatBoxPrice(item.boxPrice) : '—'}</td>
      <td style={{ textAlign: 'center' }}>
        <button
          type="button"
          className={`btn-add-select ${isSelected ? 'selected' : ''}`}
          onClick={() => onToggleSelect(item)}
          aria-label={isSelected ? t('removeFromSelection', lang) : t('addToSelection', lang)}
        >
          {isSelected ? '✓' : '+'}
        </button>
      </td>
    </tr>
  );
}

export function CompactTable({ items, lang, isSelected, onToggleSelect }) {
  if (!items || items.length === 0) return null;
  return (
    <section className="compact-table-section">
      <h3 className="compact-table-title">{t('compactTableTitle', lang)} ({items.length})</h3>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>{t('colCode', lang)}</th>
              <th>{t('colProduct', lang)}</th>
              <th>{t('colBrand', lang)}</th>
              <th>{t('colFormat', lang)}</th>
              <th>{t('colUnitPrice', lang)}</th>
              <th>{t('colBoxPrice', lang)}</th>
              <th style={{ textAlign: 'center' }}>{t('addToSelection', lang)}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <CompactTableRow
                key={item.id}
                item={item}
                lang={lang}
                isSelected={isSelected(item.id)}
                onToggleSelect={onToggleSelect}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
