import React from 'react';
import { SUPPORTED_LANGUAGES, t } from '../i18n/translations.js';
import { SearchIcon, PrintIcon, ArrowLeftIcon } from './Icons.jsx';

function LanguageSwitcher({ lang, onChangeLang }) {
  if (!onChangeLang) return null;
  return (
    <div className="lang-switch" role="group" aria-label="Selector de idioma">
      {SUPPORTED_LANGUAGES.map((code) => (
        <button
          key={code}
          type="button"
          className={`btn-lang ${lang === code ? 'active' : ''}`}
          onClick={() => onChangeLang(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function SearchBox({ search, onChangeSearch, lang }) {
  return (
    <div className="search-input-wrapper">
      <SearchIcon size={16} className="search-input-icon" />
      <input
        type="search"
        value={search}
        onChange={(e) => onChangeSearch(e.target.value)}
        placeholder={t('searchPlaceholder', lang)}
        className="search-input"
        aria-label="Buscar productos"
      />
      {search ? (
        <button
          type="button"
          className="btn-clear-search"
          onClick={() => onChangeSearch('')}
          aria-label="Limpiar búsqueda"
        >
          ✕
        </button>
      ) : null}
    </div>
  );
}

function SectionFilter({ section, onChangeSection, sections = [], lang }) {
  return (
    <div className="section-select-wrapper">
      <select
        value={section || ''}
        onChange={(e) => onChangeSection && onChangeSection(e.target.value)}
        className="section-select"
        aria-label={t('allSections', lang)}
      >
        <option value="">{t('allSections', lang)}</option>
        {sections.map((sec) => (
          <option key={sec} value={sec}>
            {sec}
          </option>
        ))}
      </select>
    </div>
  );
}

function SubcategoryChips({ section, onChangeSection, sections = [], lang }) {
  if (!sections || sections.length === 0) return null;
  return (
    <div className="subcategories-bar" role="navigation" aria-label="Subcategorías">
      <button
        type="button"
        className={`subcat-bar-chip ${!section ? 'active' : ''}`}
        onClick={() => onChangeSection && onChangeSection('')}
      >
        {t('allSections', lang)}
      </button>
      {sections.map((sec) => (
        <button
          key={sec}
          type="button"
          className={`subcat-bar-chip ${section === sec ? 'active' : ''}`}
          onClick={() => onChangeSection && onChangeSection(sec)}
        >
          {sec}
        </button>
      ))}
    </div>
  );
}

function ViewModeSwitcher(props) {
  const { onlyWithPhoto, onTogglePhoto, viewMode, onChangeViewMode, lang } = props;
  return (
    <div className="view-mode-controls">
      <label className="filter-toggle">
        <input
          type="checkbox"
          checked={Boolean(onlyWithPhoto)}
          onChange={(e) => onTogglePhoto && onTogglePhoto(e.target.checked)}
        />
        <span>{t('onlyWithPhoto', lang)}</span>
      </label>
      {onChangeViewMode ? (
        <div className="view-segmented-toggle" role="group" aria-label="Modo de vista">
          <button
            type="button"
            className={`btn-view-toggle ${viewMode === 'allCards' ? 'active' : ''}`}
            onClick={() => onChangeViewMode('allCards')}
          >
            {t('viewAllCards', lang)}
          </button>
          <button
            type="button"
            className={`btn-view-toggle ${viewMode !== 'allCards' ? 'active' : ''}`}
            onClick={() => onChangeViewMode('split')}
          >
            {t('viewSplit', lang)}
          </button>
        </div>
      ) : null}
    </div>
  );
}

function PrintSectionAction({ onPrintSection, selectedCount = 0, lang }) {
  if (!onPrintSection) return null;
  const label = selectedCount > 0
    ? `${t('customSelection', lang)} (${selectedCount})`
    : t('printSectionA4', lang);
  return (
    <button
      type="button"
      onClick={onPrintSection}
      className={`btn-print-section ${selectedCount > 0 ? 'has-selection' : ''}`}
      title={t('printSectionA4', lang)}
      aria-label={t('printSectionA4', lang)}
    >
      <PrintIcon size={15} />
      <span>{label}</span>
    </button>
  );
}

export function CatalogToolbar(props) {
  const { lang, search, onChangeSearch, section, onChangeSection, sections } = props;
  return (
    <div className="toolbar-container">
      <div className="toolbar-row toolbar-row-main">
        {props.onBackToHome ? (
          <button type="button" onClick={props.onBackToHome} className="btn-back-home">
            <ArrowLeftIcon size={14} />
            <span>{t('backToHome', lang)}</span>
          </button>
        ) : null}
        <SearchBox search={search} onChangeSearch={onChangeSearch} lang={lang} />
        <PrintSectionAction
          onPrintSection={props.onPrintSection}
          selectedCount={props.selectedCount}
          lang={lang}
        />
        <LanguageSwitcher lang={lang} onChangeLang={props.onChangeLang} />
      </div>
      <div className="toolbar-row toolbar-row-filters">
        <SubcategoryChips section={section} onChangeSection={onChangeSection} sections={sections} lang={lang} />
        <div className="toolbar-secondary-tools">
          <SectionFilter section={section} onChangeSection={onChangeSection} sections={sections} lang={lang} />
          <ViewModeSwitcher
            onlyWithPhoto={props.onlyWithPhoto}
            onTogglePhoto={props.onTogglePhoto}
            viewMode={props.viewMode}
            onChangeViewMode={props.onChangeViewMode}
            lang={lang}
          />
        </div>
      </div>
    </div>
  );
}
