import React, { useState } from 'react';
import { CoverQRCard } from './components/CoverQRCard.jsx';
import { CatalogToolbar } from './components/CatalogToolbar.jsx';
import { CatalogGrid } from './components/CatalogGrid.jsx';
import { CustomSelectionDrawer } from './components/CustomSelectionDrawer.jsx';
import { A4PrintDocument } from './components/A4PrintDocument.jsx';
import { ErrorBoundary } from './components/ErrorBoundary.jsx';
import { useCatalog } from './hooks/useCatalog.js';
import { useSelection } from './hooks/useSelection.js';
import { DEFAULT_LANGUAGE, t } from './i18n/translations.js';

function CatalogSection(props) {
  const { catalog, selection, lang, viewMode, setViewMode, onPrintSection, onBackToHome } = props;
  return (
    <>
      <CatalogToolbar
        lang={lang}
        search={catalog.search}
        onChangeSearch={catalog.setSearch}
        section={catalog.section}
        onChangeSection={catalog.setSection}
        sections={catalog.sections}
        onlyWithPhoto={catalog.onlyWithPhoto}
        onTogglePhoto={catalog.setOnlyWithPhoto}
        viewMode={viewMode}
        onChangeViewMode={setViewMode}
        onPrintSection={onPrintSection}
        selectedCount={selection.count}
        onBackToHome={onBackToHome}
      />
      <CatalogGrid
        items={catalog.items}
        lang={lang}
        isOffline={catalog.isOffline}
        onRetry={catalog.retry}
        isSelected={selection.isSelected}
        onToggleSelect={selection.toggleItem}
        onlyWithPhoto={catalog.onlyWithPhoto}
        viewMode={viewMode}
      />
    </>
  );
}

function PrintModalContainer({ show, items, mode, lang, title, onClose }) {
  if (!show) return null;
  return (
    <A4PrintDocument
      items={items}
      documentMode={mode === 'section' ? 'catalog' : 'selection'}
      lang={lang}
      title={title}
      onClose={onClose}
    />
  );
}

export function App() {
  const [lang, setLang] = useState(DEFAULT_LANGUAGE);
  const [hasEnteredCatalog, setHasEnteredCatalog] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [printMode, setPrintMode] = useState('selection');
  const [viewMode, setViewMode] = useState('split');
  const selection = useSelection();
  const catalog = useCatalog(lang);

  const openPrint = (mode) => {
    setPrintMode(mode);
    setShowPrintModal(true);
  };

  const handleSelectSector = (secId) => {
    catalog.setSector(secId);
    setHasEnteredCatalog(true);
  };

  const handleSelectSubcategory = (secId, subName) => {
    catalog.setSector(secId);
    catalog.setSection(subName);
    setHasEnteredCatalog(true);
  };

  const printItems = printMode === 'section' ? catalog.items : selection.selectedItems;
  const printTitle = printMode === 'section' ? (catalog.section || t('fullRate', lang)) : t('customSelection', lang);
  const activeSectorKey = hasEnteredCatalog ? (catalog.sector || 'all') : '';

  return (
    <ErrorBoundary lang={lang}>
      <div className="app-container" data-sector={catalog.sector || 'all'}>
        <div className={showPrintModal ? 'no-print' : ''}>
          <CoverQRCard
            lang={lang}
            onChangeLang={setLang}
            currentSector={activeSectorKey}
            onSelectSector={handleSelectSector}
            onSelectSubcategory={handleSelectSubcategory}
            isLanding={!hasEnteredCatalog}
          />
          {hasEnteredCatalog ? (
            <CatalogSection
              catalog={catalog}
              selection={selection}
              lang={lang}
              viewMode={viewMode}
              setViewMode={setViewMode}
              onPrintSection={() => openPrint(selection.count > 0 ? 'selection' : 'section')}
              onBackToHome={() => setHasEnteredCatalog(false)}
            />
          ) : null}
        </div>
        <CustomSelectionDrawer
          count={selection.count}
          lang={lang}
          onClear={selection.clearSelection}
          onOpenPrint={() => openPrint('selection')}
        />
        <PrintModalContainer
          show={showPrintModal}
          items={printItems}
          mode={printMode}
          lang={lang}
          title={printTitle}
          onClose={() => setShowPrintModal(false)}
        />
      </div>
    </ErrorBoundary>
  );
}
