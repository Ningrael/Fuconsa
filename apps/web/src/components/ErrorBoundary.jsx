import React, { Component } from 'react';
import { CONTACT_INFO } from '../constants/contact.js';
import { t, DEFAULT_LANGUAGE } from '../i18n/translations.js';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
    this.handleReload = this.handleReload.bind(this);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReload() {
    this.setState({ hasError: false, error: null });
    if (typeof window !== 'undefined' && window.location) {
      window.location.reload();
    }
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }
    const lang = this.props.lang || DEFAULT_LANGUAGE;
    return (
      <div className="error-boundary-screen" role="alert">
        <div className="error-boundary-card">
          <div className="error-boundary-badge">⚠️ FUCONSA</div>
          <h2 className="error-boundary-title">{t('errorBoundaryTitle', lang)}</h2>
          <p className="error-boundary-desc">{t('contactAssistance', lang)}</p>
          <div className="error-boundary-contact">
            <strong>{CONTACT_INFO.fullName}</strong>
            <a href={`tel:${CONTACT_INFO.phoneRaw}`} className="error-contact-link">
              📞 {CONTACT_INFO.phoneDisplay}
            </a>
            <a href={`mailto:${CONTACT_INFO.email}`} className="error-contact-link">
              ✉️ {CONTACT_INFO.email}
            </a>
          </div>
          <button
            type="button"
            onClick={this.handleReload}
            className="btn-primary error-retry-btn"
          >
            🔄 {t('reloadApp', lang)}
          </button>
        </div>
      </div>
    );
  }
}
