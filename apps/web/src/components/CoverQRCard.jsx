import React from 'react';
import { LandingVCard } from './LandingVCard.jsx';
import { CatalogMasthead } from './CatalogMasthead.jsx';

export { LandingVCard, CatalogMasthead };

export function CoverQRCard(props) {
  const { lang, onChangeLang, currentSector, onSelectSector, isLanding = true, onBackToHome } = props;
  const isLandingMode = isLanding !== false;
  return (
    <header className={`cover-card ${isLandingMode ? 'cover-landing' : 'cover-compact'}`}>
      {isLandingMode ? (
        <LandingVCard
          lang={lang}
          onChangeLang={onChangeLang}
          onSelectSector={onSelectSector}
        />
      ) : (
        <CatalogMasthead
          lang={lang}
          onChangeLang={onChangeLang}
          currentSector={currentSector}
          onSelectSector={onSelectSector}
          onBackToHome={onBackToHome}
        />
      )}
    </header>
  );
}
