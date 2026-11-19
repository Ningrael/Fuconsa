import React from 'react';
import { SECTORS } from '../constants/sectors.js';
import { CONTACT_INFO } from '../constants/contact.js';
import { t } from '../i18n/translations.js';
import { withBase } from '../utils/assetUrl.js';
import { ArrowRightIcon } from './Icons.jsx';
import { BrandLogosGrid } from './BrandLogos.jsx';

const SECTOR_META = Object.freeze({
  horeca: { code: '01 · CANAL HORECA', volume: '+380 refs' },
  supermercados: { code: '02 · RETAIL & GRAN CONSUMO', volume: '+260 refs' },
  latinos: { code: '03 · ALIMENTACIÓN LATINA', volume: '+75 refs' },
  acai: { code: '04 · ESPECIALIDAD AÇAÍ', volume: '+45 refs' }
});

function SectorPhotoCard({ sec, idx, lang, onSelectSector }) {
  const label = t(sec.key, lang);
  const meta = SECTOR_META[sec.id] || { code: sec.id.toUpperCase(), volume: '+50 refs' };
  return (
    <button
      type="button"
      className={`sector-showcase-card sector-card-${sec.id}`}
      style={{ animationDelay: `${0.08 + idx * 0.07}s` }}
      onClick={() => onSelectSector(sec.id)}
      aria-label={label}
    >
      <span className="sector-ambient-orb" aria-hidden="true" />
      <span className="sector-photo-wrap">
        <span className="sector-photo-halo" aria-hidden="true" />
        <img src={withBase(sec.img)} alt={label} className="sector-showcase-img" loading="eager" />
      </span>
      <span className="sector-card-content">
        <span className="sector-top-badges">
          <span className="sector-eyebrow-code">{meta.code}</span>
          <span className="sector-volume-pill tabular-nums">{meta.volume}</span>
        </span>
        <strong>{label}</strong>
        <span className="sector-showcase-tag">{sec.tag}</span>
        <span className="sector-cta-link">
          <span>{t('exploreSectorCta', lang)}</span>
          <ArrowRightIcon size={15} />
        </span>
      </span>
    </button>
  );
}

function SectorsPhotoGrid({ lang, onSelectSector }) {
  return (
    <section className="sectors-showcase-section" aria-label={t('sectorsHeading', lang)}>
      <div className="sectors-section-header">
        <h2 className="showcase-heading">{t('sectorsHeading', lang)}</h2>
        <button
          type="button"
          className="btn-enter-catalog"
          onClick={() => onSelectSector('')}
          aria-label="Entrar al Catálogo (Todos los sectores)"
        >
          <span>{t('enterCatalog', lang)}</span>
          <ArrowRightIcon size={16} />
        </button>
      </div>
      <div className="sector-showcase-grid">
        {SECTORS.map((sec, idx) => (
          <SectorPhotoCard key={sec.id} sec={sec} idx={idx} lang={lang} onSelectSector={onSelectSector} />
        ))}
      </div>
    </section>
  );
}

function HowItWorksSteps({ lang }) {
  const steps = [
    ['01', 'step1Title', 'step1Desc'],
    ['02', 'step2Title', 'step2Desc'],
    ['03', 'step3Title', 'step3Desc']
  ];
  return (
    <section className="how-it-works-section" aria-label={t('howItWorksTitle', lang)}>
      <div className="how-it-works-bar">
        <span className="how-it-works-label">{t('howItWorksTitle', lang)}</span>
        <div className="steps-grid">
          {steps.map(([num, titleKey, descKey]) => (
            <div key={num} className="step-card">
              <span className="step-number tabular-nums">{num}</span>
              <div className="step-body">
                <strong>{t(titleKey, lang)}</strong>
                <p>{t(descKey, lang)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandsTrustStrip({ lang }) {
  return (
    <section className="brands-trust-strip" aria-label={t('brandsTrustTitle', lang)}>
      <p className="showcase-eyebrow">{t('brandsTrustTitle', lang)}</p>
      <BrandLogosGrid />
    </section>
  );
}

function QrFullscreenModal({ show, onClose, qrSvg, lang }) {
  if (!show) return null;
  const handleBackdrop = (e) => { if (e.target === e.currentTarget) onClose(); };
  return (
    <div
      className="qr-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={t('qrSectionTitle', lang)}
      onClick={handleBackdrop}
    >
      <div className="qr-modal-card">
        <p className="qr-modal-brand">FUCONSA · {CONTACT_INFO.fullName}</p>
        <h2 className="qr-modal-title">{t('qrSectionTitle', lang)}</h2>
        <div
          className="qr-modal-frame"
          dangerouslySetInnerHTML={qrSvg ? { __html: qrSvg } : undefined}
        />
        <p className="qr-modal-desc">{t('qrSectionDesc', lang)}</p>
        <p className="qr-modal-contact tabular-nums">
          {CONTACT_INFO.phoneDisplay} · {CONTACT_INFO.email}
        </p>
        <button type="button" className="btn-close-qr-modal" onClick={onClose}>
          {t('closeQrBtn', lang)}
        </button>
      </div>
    </div>
  );
}

export function LandingSectorsShowcase({ lang, onSelectSector, showQrModal, onCloseQr, qrSvg }) {
  return (
    <>
      <SectorsPhotoGrid lang={lang} onSelectSector={onSelectSector} />
      <BrandsTrustStrip lang={lang} />
      <HowItWorksSteps lang={lang} />
      <QrFullscreenModal show={showQrModal} onClose={onCloseQr} qrSvg={qrSvg} lang={lang} />
    </>
  );
}
