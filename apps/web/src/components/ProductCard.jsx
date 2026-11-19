import React, { useState } from 'react';
import { getTranslation, t } from '../i18n/translations.js';
import { getBrandLogoUrl } from '../constants/sectors.js';
import { formatBoxPrice } from '../utils/formatters.js';
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

function SelectPdfButton({ isSelected, lang, onClick }) {
  const actionLabel = isSelected ? t('removeFromSelection', lang) : t('addToSelection', lang);

  return (
    <button
      type="button"
      className={`btn-add-select ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      title={actionLabel}
      aria-label={actionLabel}
    >
      <span className="btn-add-text">
        {isSelected ? t('addedToPdfShort', lang) : t('addToPdfShort', lang)}
      </span>
    </button>
  );
}

export function ProductCard({ item, lang, isSelected, onToggleSelect }) {
  const name = getTranslation(item.name, lang);
  const brandLogo = item.brand && !item.brand.toLowerCase().includes('fuconsa')
    ? getBrandLogoUrl(item.brand)
    : '';

  return (
    <article className={`product-card ${isSelected ? 'selected' : ''}`}>
      <ProductImage item={item} lang={lang} name={name} />
      <div className="product-card-body">
        {item.brand || item.id ? (
          <div className="product-meta-top">
            {brandLogo ? (
              <span className="product-brand-logo-pill" title={item.brand}>
                <img src={withBase(brandLogo)} alt="" aria-hidden="true" className="product-brand-logo-img" />
                <span className="visually-hidden-accessible">{item.brand}</span>
              </span>
            ) : (
              item.brand ? <span className="product-brand">{item.brand}</span> : null
            )}
            {item.id ? <span className="product-code visually-hidden-accessible tabular-nums">{item.id}</span> : null}
          </div>
        ) : null}
        <h2 className="product-name" title={name}>{name}</h2>
        {item.format ? <p className="product-format">{item.format}</p> : null}
        <div className="product-card-footer">
          <ProductPricing item={item} />
          <SelectPdfButton
            isSelected={isSelected}
            lang={lang}
            onClick={() => onToggleSelect(item)}
          />
        </div>
      </div>
    </article>
  );
}
