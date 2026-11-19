import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import QRCode from 'qrcode';
import { render, screen, fireEvent, waitFor, within, act } from '@testing-library/react';
import { CoverQRCard } from '../src/components/CoverQRCard.jsx';
import { LEADING_BRANDS } from '../src/constants/sectors.js';
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

  it('applies cover-landing class on landing and cover-compact inside catalog', () => {
    const { container, rerender } = render(
      <CoverQRCard lang="es" currentSector="" onSelectSector={() => {}} isLanding={true} />
    );
    expect(container.querySelector('header')).toHaveClass('cover-landing');
    rerender(<CoverQRCard lang="es" currentSector="horeca" onSelectSector={() => {}} isLanding={false} />);
    expect(container.querySelector('header')).toHaveClass('cover-compact');
  });

  it('renders +760 badge, leading brands, 3-step guide, 4 sectors and single Fuconsa alt', async () => {
    const qrSpy = vi.spyOn(QRCode, 'toString');
    const { container } = render(<CoverQRCard lang="es" currentSector="" onSelectSector={() => {}} />);
    expect(screen.getByText(/\+760 Referencias/i)).toBeInTheDocument();
    const brandsStrip = within(container.querySelector('.brands-trust-strip'));
    expect(brandsStrip.getByText('GRANDES MARCAS QUE DISTRIBUIMOS')).toBeInTheDocument();
    LEADING_BRANDS.forEach((brand) => {
      expect(brandsStrip.getByText(brand)).toBeInTheDocument();
    });
    expect(screen.getByText('1. Elige tu sector')).toBeInTheDocument();
    expect(screen.getByText('2. Toca «+ Añadir a PDF»')).toBeInTheDocument();
    expect(screen.getByText('3. Descarga tu PDF A4')).toBeInTheDocument();
    ['Horeca', 'Supermercados', 'Productos Latinos', 'Mundo Açaí / Polpa Norte'].forEach((sec) => {
      expect(screen.getByRole('button', { name: sec })).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: 'Entrar al Catálogo (Todos los sectores)' })).toBeInTheDocument();
    expect(screen.getAllByAltText('Fuconsa')).toHaveLength(1);
    await act(async () => { await qrSpy.mock.results[0]?.value; });
    qrSpy.mockRestore();
  });

  it('opens and closes fullscreen QR modal via Mostrar mi QR and Cerrar QR', async () => {
    render(<CoverQRCard lang="es" currentSector="" onSelectSector={() => {}} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /mostrar mi qr/i }));
    const modal = await screen.findByRole('dialog', { name: /escanea mi contacto/i });
    expect(within(modal).getByText(/FUCONSA · Matías Sosa Marrazzo/)).toBeInTheDocument();
    expect(within(modal).getByText('+34 613 018 609 · sosamatias@gmail.com')).toBeInTheDocument();
    await waitFor(() => {
      expect(modal.querySelector('.qr-modal-frame svg')).toBeInTheDocument();
    });
    fireEvent.click(within(modal).getByRole('button', { name: /cerrar qr/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
