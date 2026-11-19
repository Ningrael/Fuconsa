import React, { useState, useRef } from 'react';
import { A4PageHeader } from './A4PageHeader.jsx';
import { A4PageFooter } from './A4PageFooter.jsx';
import { A4CoverSheet } from './A4CoverSheet.jsx';
import { paginateSelection, paginateCatalog, DENSITY_MODES } from '../utils/paginateA4.js';
import { getTranslation, t } from '../i18n/translations.js';
import { formatBoxPrice } from '../utils/formatters.js';
import { PrintIcon } from './Icons.jsx';
import { downloadA4Pdf, shareOrDownloadA4Pdf, isIOSOrSafari } from '../utils/pdfGenerator.js';
import { withBase } from '../utils/assetUrl.js';

function A4ItemImage({ item, lang, name }) {
  const [imgError, setImgError] = useState(false);
  const showPhoto = Boolean(item.hasPhoto && item.imagePath && !imgError);

  if (showPhoto) {
    return (
      <div className="a4-item-img-wrap">
        <img src={withBase(item.imagePath)} alt={name} className="a4-item-img" crossOrigin="anonymous" onError={() => setImgError(true)} />
      </div>
    );
  }
  return (
    <div className="a4-item-placeholder">
      <img
        src={withBase('/assets/brand/logo.png')}
        alt="Fuconsa"
        className="a4-placeholder-logo"
        crossOrigin="anonymous"
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
      <span className="a4-placeholder-badge">{t('photoComingSoon', lang)}</span>
    </div>
  );
}

function A4ItemCard({ item, lang }) {
  const name = getTranslation(item.name, lang);
  return (
    <article className="a4-item-card">
      <div className="a4-item-top-bar">
        <span className="a4-item-brand">{item.brand || 'Fuconsa'}</span>
        <span className="a4-item-code visually-hidden-accessible tabular-nums" title={`${t('a4RefLabel', lang)} ${item.id}`}>
          {item.id}
        </span>
      </div>
      <A4ItemImage item={item} lang={lang} name={name} />
      <div className="a4-item-title">{name}</div>
      <div className="a4-item-meta">{item.format || ''}</div>
      <div className="a4-item-price-footer">
        <div className="a4-item-price tabular-nums">{item.priceText || '—'}</div>
        {item.boxPrice != null ? (
          <span className="a4-item-box-price tabular-nums">{formatBoxPrice(item.boxPrice)}</span>
        ) : null}
      </div>
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

function openPreWindow() {
  if (!isIOSOrSafari() || typeof window === 'undefined') return null;
  const win = window.open('about:blank', '_blank');
  if (win && win.document) {
    win.document.write(
      '<div style="font-family:system-ui,-apple-system,sans-serif;padding:48px 24px;text-align:center;color:#0F2342;">'
      + '<h2 style="margin:0 0 8px 0;font-size:20px;">Fuconsa</h2>'
      + '<p style="margin:0;color:#64748B;font-size:14px;">Generando documento PDF...</p></div>'
    );
  }
  return win;
}

async function runPdfExport(containerEl, isBusy, setIsBusy, action) {
  if (isBusy || !containerEl) return;
  setIsBusy(true);
  let preWin = null;
  try {
    preWin = openPreWindow();
    await action(containerEl, preWin);
  } catch {
    if (preWin && !preWin.closed) preWin.close();
    window.print();
  } finally {
    setIsBusy(false);
  }
}

export function A4PrintDocument(props) {
  const { items, lang, title, onClose, documentMode = 'selection' } = props;
  const containerRef = useRef(null);
  const [isBusy, setIsBusy] = useState(false);

  const result = documentMode === 'catalog'
    ? paginateCatalog(items, { includeCompactTable: true })
    : paginateSelection(items);

  const filename = `Fuconsa-${documentMode}.pdf`;
  const handleDownloadPdf = () => runPdfExport(containerRef.current, isBusy, setIsBusy,
    (el, preWin) => downloadA4Pdf(el, filename, preWin));
  const handleSharePdf = () => runPdfExport(containerRef.current, isBusy, setIsBusy,
    (el, preWin) => shareOrDownloadA4Pdf(el, filename, title, preWin));

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
