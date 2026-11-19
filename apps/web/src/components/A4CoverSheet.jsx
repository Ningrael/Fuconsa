import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { withBase } from '../utils/assetUrl.js';
import { CONTACT_INFO } from '../constants/contact.js';
import { t } from '../i18n/translations.js';
import { BrandLogosGrid } from './BrandLogos.jsx';

function CoverBrandMasthead({ title, totalItems, lang }) {
  const formattedDate = new Date().toLocaleDateString(lang === 'en' ? 'en-GB' : 'es-ES');
  return (
    <div className="a4-cover-masthead">
      <div className="a4-cover-top-row">
        <div className="a4-cover-logo-wrap">
          <img
            src={withBase('/assets/brand/logo.png')}
            alt="Fuconsa"
            className="a4-cover-logo"
            crossOrigin="anonymous"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <span className="visually-hidden-accessible">FUCONSA</span>
        </div>
        <div className="a4-cover-top-meta tabular-nums">
          <span className="a4-cover-leader-pill">{t('a4LeaderBadge', lang)}</span>
          <span className="a4-cover-date-text">{formattedDate}</span>
        </div>
      </div>
      <div className="visually-hidden-accessible">
        <span>{t('coverProposalLabel', lang)}</span>
        <h1>{title}</h1>
        <span>{totalItems} {t('coverItemsIncluded', lang)}</span>
      </div>
    </div>
  );
}

function CoverPersonalCard({ lang }) {
  return (
    <div className="a4-cover-personal-card">
      <div className="a4-personal-card-header">
        <span className="a4-personal-eyebrow">ATENCIÓN COMERCIAL DIRECTA · PEDIDOS Y CONSULTAS</span>
        <div className="a4-personal-name">{CONTACT_INFO.fullName}</div>
        <div className="a4-personal-role">{t('commercialRole', lang)}</div>
      </div>
      <div className="a4-personal-contact-grid tabular-nums">
        <div className="a4-personal-contact-box">
          <span className="a4-contact-box-label">TELÉFONO Y WHATSAPP DIRECTO</span>
          <strong className="a4-contact-box-value a4-phone-highlight">{CONTACT_INFO.phoneDisplay}</strong>
        </div>
        <div className="a4-personal-contact-box">
          <span className="a4-contact-box-label">CORREO ELECTRÓNICO</span>
          <strong className="a4-contact-box-value">{CONTACT_INFO.email}</strong>
        </div>
      </div>
    </div>
  );
}

function CoverQrPortal({ qrUrl, lang }) {
  return (
    <div className="a4-cover-qr-portal">
      <div className="a4-cover-qr-frame">
        {qrUrl ? (
          <img src={qrUrl} alt="Código QR Catálogo Fuconsa" className="a4-cover-qr-img" />
        ) : (
          <div className="a4-cover-qr-placeholder">QR</div>
        )}
      </div>
      <div className="a4-cover-qr-copy">
        <span className="a4-cover-qr-badge">ACCESO DIGITAL INTERACTIVO</span>
        <h2>{t('qrSectionTitle', lang)}</h2>
        <p>{t('qrSectionDesc', lang)}</p>
        <div className="a4-cover-qr-subnote">
          Escanea este código QR con la cámara de tu móvil para volver a entrar en cualquier momento a nuestro catálogo completo actualizado.
        </div>
      </div>
    </div>
  );
}

function CoverBrandsFooter({ lang }) {
  return (
    <div className="a4-cover-brands-footer">
      <span className="a4-cover-brands-eyebrow">{t('brandsTrustTitle', lang)}</span>
      <BrandLogosGrid compact={true} />
    </div>
  );
}

export function A4CoverSheet({ lang, title, totalItems = 0 }) {
  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
    let active = true;
    const currentUrl = typeof window !== 'undefined' && window.location?.origin
      ? window.location.href.split('#')[0].split('?')[0]
      : '';
    if (currentUrl) {
      QRCode.toDataURL(currentUrl, { width: 380, margin: 1, color: { dark: '#102755', light: '#FFFFFF' } })
        .then((url) => { if (active) setQrUrl(url); })
        .catch(() => {});
    }
    return () => { active = false; };
  }, []);

  return (
    <section className="a4-sheet a4-cover-sheet">
      <CoverBrandMasthead title={title} totalItems={totalItems} lang={lang} />
      <CoverPersonalCard lang={lang} />
      <CoverQrPortal qrUrl={qrUrl} lang={lang} />
      <CoverBrandsFooter lang={lang} />
      <footer className="a4-cover-footer tabular-nums">
        <span>FUCONSA · Fumats i Congelats S.A.</span>
        <span>Distribución en Cataluña</span>
      </footer>
    </section>
  );
}
