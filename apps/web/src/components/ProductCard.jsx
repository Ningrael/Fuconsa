import React, { useState } from 'react';
import { getTranslation, t } from '../i18n/translations.js';
import { formatBoxPrice } from '../utils/formatters.js';

function ProductPlaceholder({ lang }) {
  return (
    <div className="product-img-box product-placeholder-box">
      <img
        src="/assets/brand/logo.png"
        alt="Fuconsa"
        className="placeholder-brand-logo"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
      <span className="placeholder-cat-icon" aria-hidden="true">🏷️</span>
      <span className="photo-coming-soon-badge">{t('photoComingSoon', lang)}</span>
    </div>
  );
}

function ProductImage({ item, lang }) {
  const [imgError, setImgError] = useState(false);
  const showPhoto = Boolean(item.hasPhoto && item.imagePath && !imgError);

  if (!showPhoto) {
    return <ProductPlaceholder lang={lang} />;
  }

  return (
    <div className="product-img-box">
      <img
        src={item.imagePath}
        alt={item.id}
        className="product-img"
        loading="lazy"
        onError={() => setImgError(true)}
      />
    </div>
  );
}

function ProductPricing({ item }) {
  return (
    <div className="tabular-nums">
      <div className="price-main">{item.priceText || '—'}</div>
      {item.boxPrice ? (
        <div className="price-box">{formatBoxPrice(item.boxPrice)}</div>
      ) : null}
    </div>
  );
}

export function ProductCard({ item, lang, isSelected, onToggleSelect }) {
  const name = getTranslation(item.name, lang);
  return (
    <article className={`product-card ${isSelected ? 'selected' : ''}`}>
      <ProductImage item={item} lang={lang} />
      <div className="product-card-body">
        {item.brand ? <span className="product-brand">{item.brand}</span> : null}
        <h2 className="product-name">{name}</h2>
        {item.format ? <p className="product-format">{item.format}</p> : null}
        <div className="product-card-footer">
          <ProductPricing item={item} />
          <button
            type="button"
            className={`btn-add-select ${isSelected ? 'selected' : ''}`}
            onClick={() => onToggleSelect(item)}
            title={isSelected ? t('removeFromSelection', lang) : t('addToSelection', lang)}
            aria-label={isSelected ? t('removeFromSelection', lang) : t('addToSelection', lang)}
          >
            {isSelected ? '✓' : '+'}
          </button>
        </div>
      </div>
    </article>
  );
}
