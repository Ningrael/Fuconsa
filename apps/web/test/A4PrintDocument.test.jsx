import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { A4PrintDocument } from '../src/components/A4PrintDocument.jsx';
import { LEADING_BRANDS } from '../src/constants/sectors.js';

describe('A4PrintDocument Component', () => {
  const selectedItems = [
    {
      id: 'SEL-1',
      brand: 'Polpa Norte',
      name: { es: 'Açaí Cubeta 5kg' },
      format: 'Cubeta 5kg',
      priceText: '7,90 €/kg',
      hasPhoto: true,
      imagePath: '/acai.jpg'
    }
  ];

  const mixedItems = [
    {
      id: 'GRID-1',
      brand: 'Fuconsa',
      name: { es: 'Solomillo Ibérico' },
      format: '1kg',
      priceText: '15,00 €/kg',
      hasPhoto: true,
      imagePath: '/meat.jpg'
    },
    {
      id: 'NO-PHOTO-1',
      brand: 'Básico',
      name: { es: 'Aceite Girasol' },
      format: 'Garrafa 5L',
      priceText: '8,50 €/garrafa',
      boxPrice: 17.0,
      hasPhoto: false
    }
  ];

  it('renders A4 sheet header, item and footer without fucon.es or footer phones', () => {
    render(
      <A4PrintDocument
        items={selectedItems}
        lang="es"
        title="Selección a Medida"
        onClose={() => {}}
      />
    );
    expect(screen.getAllByText('FUCONSA').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Matías Sosa Marrazzo').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('PROPUESTA COMERCIAL Y SELECCIÓN DE PRODUCTOS')).toBeInTheDocument();
    expect(screen.getByText('Açaí Cubeta 5kg')).toBeInTheDocument();
    expect(screen.getByText(/Página 1 \/ 1/)).toBeInTheDocument();
    expect(screen.queryByText(/fucon\.es/i)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /descargar pdf/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /compartir pdf/i })).toBeInTheDocument();
  });

  it('provides print and close triggers', () => {
    const handleClose = vi.fn();
    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => {});
    render(
      <A4PrintDocument
        items={selectedItems}
        lang="es"
        title="Selección a Medida"
        onClose={handleClose}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /imprimir a4/i }));
    expect(printSpy).toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: /cerrar/i }));
    expect(handleClose).toHaveBeenCalled();
    printSpy.mockRestore();
  });

  it('renders brand placeholder for items without photos in A4 grid', () => {
    const itemsWithoutPhoto = [
      {
        id: 'NO-IMG-1',
        brand: 'Fuconsa Selection',
        name: { es: 'Pimienta Negra' },
        format: 'Bote 800g',
        priceText: '5,00 €/ud',
        hasPhoto: false
      }
    ];
    render(
      <A4PrintDocument
        items={itemsWithoutPhoto}
        lang="es"
        title="Selección a Medida"
        onClose={() => {}}
      />
    );
    expect(screen.getByText('Imagen en preparación')).toBeInTheDocument();
  });

  it('renders compact table pages when documentMode is catalog', () => {
    render(
      <A4PrintDocument
        items={mixedItems}
        documentMode="catalog"
        lang="es"
        title="Catálogo General"
        onClose={() => {}}
      />
    );
    expect(screen.getByText('Solomillo Ibérico')).toBeInTheDocument();
    expect(screen.getByText('Aceite Girasol')).toBeInTheDocument();
    expect(screen.getByText('NO-PHOTO-1')).toBeInTheDocument();
    expect(screen.getByText('Garrafa 5L')).toBeInTheDocument();
  });

  it('renders executive A4 cover with leader badge, brands, Matias contact and QR block', () => {
    const { container } = render(
      <A4PrintDocument items={selectedItems} lang="es" title="Selección a Medida" onClose={() => {}} />
    );
    const cover = within(container.querySelector('.a4-cover-sheet'));
    expect(cover.getByText(/DISTRIBUIDORA LÍDER.*\+760 REFERENCIAS/i)).toBeInTheDocument();
    expect(cover.getByText('Matías Sosa Marrazzo')).toBeInTheDocument();
    expect(cover.getByText(/\+34 613 018 609/)).toBeInTheDocument();
    expect(cover.getByText(/sosamatias@gmail\.com/)).toBeInTheDocument();
    LEADING_BRANDS.forEach((brand) => {
      expect(cover.getByText(brand)).toBeInTheDocument();
    });
    expect(cover.getByText('ACCESO DIGITAL INTERACTIVO')).toBeInTheDocument();
    expect(cover.getByText('Escanea mi contacto')).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/fucon\.es/i);
  });

  it('renders ref code, format, unit price and optional box price on A4 item cards', () => {
    const { container } = render(
      <A4PrintDocument items={selectedItems} lang="es" title="Selección a Medida" onClose={() => {}} />
    );
    const refBadge = screen.getByText('SEL-1');
    expect(refBadge).toHaveClass('a4-item-code');
    expect(refBadge).toHaveAttribute('title', 'Ref. SEL-1');
    expect(screen.getByText('Cubeta 5kg')).toBeInTheDocument();
    expect(screen.getByText('7,90 €/kg')).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/fucon\.es/i);

    render(<A4PrintDocument items={mixedItems} lang="es" title="Con Caja" onClose={() => {}} />);
    expect(screen.getByText('17,00 €/caja')).toBeInTheDocument();
  });
});
