import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { CONTACT_INFO } from '../constants/contact.js';
import { SECTORS } from '../constants/sectors.js';
import { t } from '../i18n/translations.js';

function CoverHeader({ title, totalItems, lang }) {
  return (
    <div className="a4-cover-header">
      <div className="a4-cover-brand">
        <img
          src="/assets/brand/logo.png"
          alt="Fuconsa"
          className="a4-cover-logo"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <div className="a4-cover-brand-text">
          <div className="a4-cover-brand-title">FUCONSA</div>
          <div className="a4-cover-brand-sub">Distribución y Soluciones para Alimentación y Hostelería</div>
        </div>
      </div>
      <div className="a4-cover-proposal-box">
        <span className="a4-cover-proposal-tag">{t('coverProposalLabel', lang)}</span>
        <h1 className="a4-cover-title">{title || 'Catálogo Comercial'}</h1>
        <div className="a4-cover-items-count tabular-nums">
          <strong>{totalItems}</strong> {t('coverItemsIncluded', lang)}
        </div>
      </div>
    </div>
  );
}

function CoverRepCard({ lang }) {
  return (
    <div className="a4-cover-rep-card">
      <div className="a4-cover-rep-info">
        <div className="a4-cover-rep-eyebrow">ATENCIÓN COMERCIAL DIRECTA</div>
        <div className="a4-cover-rep-name">{CONTACT_INFO.fullName}</div>
        <div className="a4-cover-rep-role">{t('commercialRole', lang)}</div>
      </div>
      <div className="a4-cover-rep-contact tabular-nums">
        <div><strong>Tel / WhatsApp:</strong> {CONTACT_INFO.phoneDisplay}</div>
        <div><strong>Email:</strong> {CONTACT_INFO.email}</div>
      </div>
    </div>
  );
}

function CoverSectorsGrid({ lang }) {
  return (
    <div className="a4-cover-sectors">
      <div className="a4-cover-sectors-label">LÍNEAS DE DISTRIBUCIÓN INCLUIDAS</div>
      <div className="a4-cover-sectors-grid">
        {SECTORS.map((sec) => (
          <div key={sec.id} className={`a4-cover-sector-box a4-border-${sec.id}`}>
            <strong>{t(sec.key, lang)}</strong>
            <small>{sec.tag}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

function CoverQRSection({ qrUrl, lang }) {
  return (
    <div className="a4-cover-qr-box">
      <div className="a4-cover-qr-frame">
        {qrUrl ? (
          <img src={qrUrl} alt="Código QR Catálogo Fuconsa" className="a4-cover-qr-img" />
        ) : (
          <div className="a4-cover-qr-placeholder">QR</div>
        )}
      </div>
      <div className="a4-cover-qr-info">
        <span className="a4-cover-qr-badge">ACCESO DIGITAL INTERACTIVO</span>
        <h2>{t('qrSectionTitle', lang)}</h2>
        <p>{t('qrSectionDesc', lang)}</p>
      </div>
    </div>
  );
}

export function A4CoverSheet({ lang, title, totalItems = 0 }) {
  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
    const currentUrl = typeof window !== 'undefined' && window.location?.origin
      ? window.location.origin
      : '';
    if (currentUrl) {
      QRCode.toDataURL(currentUrl, { width: 320, margin: 1 })
        .then(setQrUrl)
        .catch(() => {});
    }
  }, []);

  return (
    <section className="a4-sheet a4-cover-sheet">
      <CoverHeader title={title} totalItems={totalItems} lang={lang} />
      <CoverRepCard lang={lang} />
      <CoverSectorsGrid lang={lang} />
      <CoverQRSection qrUrl={qrUrl} lang={lang} />
      <footer className="a4-cover-footer tabular-nums">
        <span>Fuconsa · {t('disclaimerVat', lang)}</span>
      </footer>
    </section>
  );
}
