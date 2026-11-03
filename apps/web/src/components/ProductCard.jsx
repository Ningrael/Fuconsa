import React, { useState } from 'react';
import { getTranslation, t } from '../i18n/translations.js';
import { formatBoxPrice } from '../utils/formatters.js';
import { PlusIcon, CheckIcon } from './Icons.jsx';
import { withBase } from '../utils/assetUrl.js';

function ProductPlaceholder({ lang }) {
  return (
    <div className="product-img-box product-placeholder-box">
      <img
        src={withBase('/assets/brand/logo.png')}
        alt="Fuconsa"
        className="placeholder-brand-logo"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
      <span className="photo-coming-soon-badge">{t('photoComingSoon', lang)}</span>
    </div>
  );
}

function ProductImage({ item, lang, name }) {
  const [imgError, setImgError] = useState(false);
  const showPhoto = Boolean(item.hasPhoto && item.imagePath && !imgError);

  if (!showPhoto) {
    return <ProductPlaceholder lang={lang} />;
  }

  return (
    <div className="product-img-box">
      <img
        src={`${withBase(item.imagePath)}${item.imagePath.includes('?') ? '&' : '?'}v=2`}
        alt={name || item.id}
        className="product-img"
        loading="lazy"
        onError={() => setImgError(true)}
      />
    </div>
  );
}

function ProductPricing({ item }) {
  return (
    <div className="price-stack tabular-nums">
      <div className="price-main">{item.priceText || '—'}</div>
      {item.boxPrice ? (
        <div className="price-box">{formatBoxPrice(item.boxPrice)}</div>
      ) : null}
    </div>
  );
}

export function ProductCard({ item, lang, isSelected, onToggleSelect }) {
  const name = getTranslation(item.name, lang);
  const actionLabel = isSelected ? t('removeFromSelection', lang) : t('addToSelection', lang);

  return (
    <article className={`product-card ${isSelected ? 'selected' : ''}`}>
      <ProductImage item={item} lang={lang} name={name} />
      <div className="product-card-body">
        {item.brand ? (
          <div className="product-meta-top">
            <span className="product-brand">{item.brand}</span>
          </div>
        ) : null}
        <h2 className="product-name" title={name}>{name}</h2>
        {item.format ? <p className="product-format">{item.format}</p> : null}
        <div className="product-card-footer">
          <ProductPricing item={item} />
          <button
            type="button"
            className={`btn-add-select ${isSelected ? 'selected' : ''}`}
            onClick={() => onToggleSelect(item)}
            title={actionLabel}
            aria-label={actionLabel}
          >
            {isSelected ? <CheckIcon size={18} /> : <PlusIcon size={18} />}
          </button>
        </div>
      </div>
    </article>
  );
}
