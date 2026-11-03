import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CoverQRCard } from '../src/components/CoverQRCard.jsx';
import * as vcardModule from '../src/utils/vcard.js';

describe('CoverQRCard Component', () => {
  it('renders commercial profile info for Matias Sosa Marrazzo', () => {
    render(<CoverQRCard lang="es" currentSector="" onSelectSector={() => {}} />);
    expect(screen.getByText('Matías Sosa Marrazzo')).toBeInTheDocument();
    expect(screen.getByText('Comercial Fuconsa en Cataluña')).toBeInTheDocument();
  });

  it('renders official brand logo with fallback in avatar', () => {
    render(<CoverQRCard lang="es" currentSector="" onSelectSector={() => {}} />);
    const logoImg = screen.getByRole('img', { name: 'Fuconsa' });
    expect(logoImg).toHaveAttribute('src', '/assets/brand/logo.png');
    fireEvent.error(logoImg);
    expect(screen.getByText('FUCONSA')).toBeInTheDocument();
  });

  it('provides direct links for WhatsApp and Phone call', () => {
    render(<CoverQRCard lang="es" currentSector="" onSelectSector={() => {}} />);
    const waLink = screen.getByRole('link', { name: /whatsapp/i });
    expect(waLink).toHaveAttribute('href', 'https://wa.me/34613018609');
    const callLink = screen.getByRole('link', { name: /llamar/i });
    expect(callLink).toHaveAttribute('href', 'tel:+34613018609');
  });

  it('triggers downloadVCard when clicking save contact', () => {
    const spy = vi.spyOn(vcardModule, 'downloadVCard').mockImplementation(() => '');
    render(<CoverQRCard lang="es" currentSector="" onSelectSector={() => {}} />);
    const vcfBtn = screen.getByRole('button', { name: /guardar contacto/i });
    fireEvent.click(vcfBtn);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('renders sector pills and invokes callback on selection', () => {
    const handleSelect = vi.fn();
    render(<CoverQRCard lang="es" currentSector="" onSelectSector={handleSelect} />);
    const horecaChip = screen.getByRole('button', { name: 'Horeca' });
    fireEvent.click(horecaChip);
    expect(handleSelect).toHaveBeenCalledWith('horeca');
  });
});
