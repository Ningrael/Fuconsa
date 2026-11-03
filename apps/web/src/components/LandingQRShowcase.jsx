import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { CONTACT_INFO } from '../constants/contact.js';
import { t } from '../i18n/translations.js';
import { PhoneIcon } from './Icons.jsx';

function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showIosGuide, setShowIosGuide] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const triggerInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice.catch(() => {});
      setDeferredPrompt(null);
    } else {
      setShowIosGuide(true);
    }
  };

  return { showIosGuide, dismissed, setDismissed, triggerInstall };
}

function InstallAppBanner({ lang }) {
  const { showIosGuide, dismissed, setDismissed, triggerInstall } = useInstallPrompt();
  if (dismissed) return null;

  return (
    <div className="install-pwa-banner" role="region" aria-label="Instalar aplicación web">
      <div className="install-pwa-info">
        <strong>{t('installAppTitle', lang)}</strong>
        {showIosGuide ? <p className="install-ios-hint">{t('installIosHint', lang)}</p> : null}
      </div>
      <div className="install-pwa-actions">
        <button type="button" onClick={triggerInstall} className="btn-install-pwa">
          {t('installAppBtn', lang)}
        </button>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="btn-dismiss-pwa"
          aria-label={t('closePreview', lang)}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export function LandingQRShowcase({ lang }) {
  const [qrSvg, setQrSvg] = useState('');
  const currentUrl = typeof window !== 'undefined' && window.location?.origin
    ? window.location.origin
    : '';

  useEffect(() => {
    let active = true;
    QRCode.toString(currentUrl, {
      type: 'svg',
      margin: 1,
      width: 200,
      color: { dark: '#0F172A', light: '#FFFFFF' }
    })
      .then((svg) => {
        if (active) setQrSvg(svg);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [currentUrl]);

  return (
    <section className="landing-qr-showcase" aria-label="Código QR de acceso móvil">
      <InstallAppBanner lang={lang} />
      <div className="qr-hero-box">
        <div
          className="qr-svg-frame"
          aria-label="Código QR del catálogo"
          dangerouslySetInnerHTML={qrSvg ? { __html: qrSvg } : undefined}
        />
        <div className="qr-hero-text">
          <span className="qr-badge">ACCESO DIRECTO EN MÓVIL · TARIFA DIGITAL</span>
          <h2>{t('qrSectionTitle', lang)}</h2>
          <p>{t('qrSectionDesc', lang)}</p>
          <div className="qr-contact-pill tabular-nums">
            <PhoneIcon size={14} />
            <span>Atención directa: <strong>{CONTACT_INFO.phoneDisplay}</strong> · {CONTACT_INFO.email}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
