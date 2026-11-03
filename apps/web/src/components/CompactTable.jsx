import React from 'react';
import { getTranslation, t } from '../i18n/translations.js';
import { formatBoxPrice } from '../utils/formatters.js';
import { PlusIcon, CheckIcon } from './Icons.jsx';

function CompactTableRow(props) {
  const { item, lang, isSelected, onToggleSelect } = props;
  const name = getTranslation(item.name, lang);
  const actionLabel = isSelected ? t('removeFromSelection', lang) : t('addToSelection', lang);
  return (
    <tr className={isSelected ? 'row-selected' : ''}>
      <td className="tabular-nums td-code">{item.id}</td>
      <td><strong className="td-product-name">{name}</strong></td>
      <td className="td-brand">{item.brand || '—'}</td>
      <td className="td-format">{item.format || '—'}</td>
      <td className="tabular-nums td-price"><strong>{item.priceText || '—'}</strong></td>
      <td className="tabular-nums td-box-price">{item.boxPrice ? formatBoxPrice(item.boxPrice) : '—'}</td>
      <td className="td-action">
        <button
          type="button"
          className={`btn-add-select btn-add-table ${isSelected ? 'selected' : ''}`}
          onClick={() => onToggleSelect(item)}
          aria-label={actionLabel}
          title={actionLabel}
        >
          {isSelected ? <CheckIcon size={16} /> : <PlusIcon size={16} />}
        </button>
      </td>
    </tr>
  );
}

export function CompactTable({ items, lang, isSelected, onToggleSelect }) {
  if (!items || items.length === 0) return null;
  return (
    <section className="compact-table-section">
      <div className="compact-table-header">
        <h3 className="compact-table-title">{t('compactTableTitle', lang)}</h3>
        <span className="compact-table-count tabular-nums">{items.length} ref.</span>
      </div>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>{t('colCode', lang)}</th>
              <th>{t('colProduct', lang)}</th>
              <th>{t('colBrand', lang)}</th>
              <th>{t('colFormat', lang)}</th>
              <th className="th-price">{t('colUnitPrice', lang)}</th>
              <th className="th-price">{t('colBoxPrice', lang)}</th>
              <th className="th-action">{t('addToSelection', lang)}</th>
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
