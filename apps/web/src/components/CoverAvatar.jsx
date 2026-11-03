import React, { useState } from 'react';
import { withBase } from '../utils/assetUrl.js';

export function CoverAvatar() {
  const [imgError, setImgError] = useState(false);
  return (
    <div className="cover-avatar" aria-label="Logo Fuconsa">
      {!imgError ? (
        <img
          src={withBase('/assets/brand/logo.png')}
          alt="Fuconsa"
          className="cover-logo-img"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="cover-logo-fallback">FUCONSA</span>
      )}
    </div>
  );
}
