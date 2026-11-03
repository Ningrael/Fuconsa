import React, { useState, useRef } from 'react';
import { A4PageHeader } from './A4PageHeader.jsx';
import { A4PageFooter } from './A4PageFooter.jsx';
import { A4CoverSheet } from './A4CoverSheet.jsx';
import { paginateSelection, paginateCatalog, DENSITY_MODES } from '../utils/paginateA4.js';
import { getTranslation, t } from '../i18n/translations.js';
import { formatBoxPrice } from '../utils/formatters.js';
import { PrintIcon } from './Icons.jsx';
import { downloadA4Pdf, shareOrDownloadA4Pdf } from '../utils/pdfGenerator.js';
import { withBase } from '../utils/assetUrl.js';

function A4ItemImage({ item, lang, name }) {
  const [imgError, setImgError] = useState(false);
  const showPhoto = Boolean(item.hasPhoto && item.imagePath && !imgError);

  if (showPhoto) {
    return (
      <div className="a4-item-img-wrap">
        <img
          src={withBase(item.imagePath)}
          alt={name}
          className="a4-item-img"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }
  return (
    <div className="a4-item-placeholder">
      <img
        src={withBase('/assets/brand/logo.png')}
        alt="Fuconsa"
        className="a4-placeholder-logo"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
      <span className="a4-placeholder-badge">{t('photoComingSoon', lang)}</span>
    </div>
  );
}

function A4ItemCard({ item, lang }) {
  const name = getTranslation(item.name, lang);
  return (
    <article className="a4-item-card">
      <A4ItemImage item={item} lang={lang} name={name} />
      <div className="a4-item-title">{name}</div>
      <div className="a4-item-meta">{item.brand} {item.format ? `· ${item.format}` : ''}</div>
      <div className="a4-item-price tabular-nums">{item.priceText || '—'}</div>
    </article>
  );
}

function A4TableBody({ items, lang }) {
  return (
    <div className="a4-table-body">
      <table className="a4-data-table">
        <thead>
          <tr>
            <th>{t('colCode', lang)}</th>
            <th>{t('colProduct', lang)}</th>
            <th>{t('colBrand', lang)}</th>
            <th>{t('colFormat', lang)}</th>
            <th>{t('colUnitPrice', lang)}</th>
            <th>{t('colBoxPrice', lang)}</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="tabular-nums">{item.id}</td>
              <td><strong>{getTranslation(item.name, lang)}</strong></td>
              <td>{item.brand || '—'}</td>
              <td>{item.format || '—'}</td>
              <td className="tabular-nums">{item.priceText || '—'}</td>
              <td className="tabular-nums">{item.boxPrice ? formatBoxPrice(item.boxPrice) : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function A4Controls({ onClose, onDownloadPdf, onSharePdf, isBusy, lang }) {
  return (
    <div className="no-print print-controls-bar">
      <button type="button" onClick={() => window.print()} className="btn-primary" disabled={isBusy}>
        <PrintIcon size={15} />
        <span>{t('printSheet', lang)}</span>
      </button>
      <button type="button" onClick={onDownloadPdf} className="btn-action-pdf" disabled={isBusy}>
        <span>{isBusy ? t('generatingPdf', lang) : t('downloadPdf', lang)}</span>
      </button>
      <button type="button" onClick={onSharePdf} className="btn-action-share" disabled={isBusy}>
        <span>{t('sharePdf', lang)}</span>
      </button>
      <button type="button" onClick={onClose} className="btn-secondary" disabled={isBusy}>
        ✕ {t('closePreview', lang)}
      </button>
    </div>
  );
}

function A4Page({ page, lang, title }) {
  const isTable = page.type === 'table';
  const gridClass = page.density === DENSITY_MODES.SHOWCASE ? 'a4-grid-showcase' : 'a4-grid-high';
  return (
    <section className="a4-sheet">
      <A4PageHeader title={title} lang={lang} />
      {isTable ? (
        <A4TableBody items={page.items} lang={lang} />
      ) : (
        <div className={`a4-body ${gridClass}`}>
          {page.items.map((item) => (
            <A4ItemCard key={item.id} item={item} lang={lang} />
          ))}
        </div>
      )}
      <A4PageFooter pageNumber={page.pageNumber} totalPages={page.totalPages} lang={lang} />
    </section>
  );
}

export function A4PrintDocument(props) {
  const { items, lang, title, onClose, documentMode = 'selection' } = props;
  const containerRef = useRef(null);
  const [isBusy, setIsBusy] = useState(false);

  const result = documentMode === 'catalog'
    ? paginateCatalog(items, { includeCompactTable: true })
    : paginateSelection(items);

  const handleDownloadPdf = async () => {
    if (isBusy || !containerRef.current) return;
    setIsBusy(true);
    try {
      await downloadA4Pdf(containerRef.current, `Fuconsa-${documentMode}.pdf`);
    } catch {
      window.print();
    } finally {
      setIsBusy(false);
    }
  };

  const handleSharePdf = async () => {
    if (isBusy || !containerRef.current) return;
    setIsBusy(true);
    try {
      await shareOrDownloadA4Pdf(containerRef.current, `Fuconsa-${documentMode}.pdf`, title);
    } catch {
      window.print();
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <div className="print-preview-modal" role="dialog" aria-modal="true">
      <A4Controls
        onClose={onClose}
        onDownloadPdf={handleDownloadPdf}
        onSharePdf={handleSharePdf}
        isBusy={isBusy}
        lang={lang}
      />
      <div className="print-container" ref={containerRef}>
        <A4CoverSheet lang={lang} title={title} totalItems={items.length} />
        {result.pages.map((page) => (
          <A4Page key={page.pageNumber} page={page} lang={lang} title={title} />
        ))}
      </div>
    </div>
  );
}
