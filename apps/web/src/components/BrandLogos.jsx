import React, { useState } from 'react';
import { LEADING_BRANDS, BRAND_LOGOS } from '../constants/sectors.js';
import { withBase } from '../utils/assetUrl.js';

export function BrandLogoBadge({ brand, compact = false }) {
  const [imgError, setImgError] = useState(false);
  const logoPath = BRAND_LOGOS[brand];

  return (
    <span className={`brand-logo-plate ${compact ? 'brand-logo-plate-compact' : ''}`} title={brand}>
      {logoPath && !imgError ? (
        <>
          <img
            src={withBase(logoPath)}
            alt={`Logo ${brand}`}
            className="brand-logo-real-img"
            crossOrigin="anonymous"
            loading="eager"
            onError={() => setImgError(true)}
          />
          <span className="visually-hidden-accessible">{brand}</span>
        </>
      ) : (
        <span className="brand-logo-wordmark">{brand}</span>
      )}
    </span>
  );
}

export function BrandLogosGrid({ compact = false }) {
  return (
    <div className={`brand-logos-showcase ${compact ? 'brand-logos-compact' : ''}`}>
      {LEADING_BRANDS.map((brand) => (
        <BrandLogoBadge key={brand} brand={brand} compact={compact} />
      ))}
    </div>
  );
}
