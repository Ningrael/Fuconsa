import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from '../src/components/ProductCard.jsx';

describe('ProductCard Component', () => {
  const sampleItem = {
    id: 'TEST-01',
    brand: 'Fuconsa Test',
    name: { es: 'Lomo Bacalao', ca: 'Llom Bacallà', en: 'Cod Loin' },
    format: 'Caja 5kg',
    unitPrice: 12.5,
    boxPrice: 62.5,
    priceText: '12,50 €/kg',
    hasPhoto: true,
    imagePath: '/images/test.jpg'
  };

  const noPhotoItem = {
    id: 'TEST-02',
    brand: 'Fuconsa Basic',
    name: { es: 'Harina Fina' },
    format: 'Saco 25kg',
    unitPrice: 1.2,
    priceText: '1,20 €/kg',
    hasPhoto: false
  };

  it('renders product details and localized name', () => {
    render(
      <ProductCard
        item={sampleItem}
        lang="es"
        isSelected={false}
        onToggleSelect={() => {}}
      />
    );
    expect(screen.getByText('Lomo Bacalao')).toBeInTheDocument();
    expect(screen.getByText('Fuconsa Test')).toBeInTheDocument();
    expect(screen.getByText('Caja 5kg')).toBeInTheDocument();
    expect(screen.getByText('12,50 €/kg')).toBeInTheDocument();
  });

  it('triggers onToggleSelect when plus button is clicked', () => {
    const handleToggle = vi.fn();
    render(
      <ProductCard
        item={sampleItem}
        lang="es"
        isSelected={false}
        onToggleSelect={handleToggle}
      />
    );
    const btn = screen.getByRole('button', { name: /añadir a selección/i });
    fireEvent.click(btn);
    expect(handleToggle).toHaveBeenCalledWith(sampleItem);
  });

  it('renders official brand placeholder when product has no photo', () => {
    render(
      <ProductCard
        item={noPhotoItem}
        lang="es"
        isSelected={false}
        onToggleSelect={() => {}}
      />
    );
    expect(screen.getByText('Imagen en preparación')).toBeInTheDocument();
    const logo = screen.getByRole('img', { name: 'Fuconsa' });
    expect(logo).toHaveAttribute('src', '/assets/brand/logo.png');
  });

  it('falls back to brand placeholder when image fires onError', () => {
    render(
      <ProductCard
        item={sampleItem}
        lang="es"
        isSelected={false}
        onToggleSelect={() => {}}
      />
    );
    const img = screen.getByAltText('Lomo Bacalao');
    fireEvent.error(img);
    expect(screen.getByText('Imagen en preparación')).toBeInTheDocument();
  });

  it('renders product reference code and box price in card', () => {
    const { container } = render(
      <ProductCard item={sampleItem} lang="es" isSelected={false} onToggleSelect={() => {}} />
    );
    expect(container.querySelector('.product-code')).toHaveTextContent('TEST-01');
    expect(screen.getByText('62,50 €/caja')).toBeInTheDocument();
  });

  it('shows explicit PDF button label while preserving accessible aria-label', () => {
    const { rerender } = render(
      <ProductCard item={sampleItem} lang="es" isSelected={false} onToggleSelect={() => {}} />
    );
    const addBtn = screen.getByRole('button', { name: 'Añadir a selección' });
    expect(addBtn).toHaveTextContent('+ Añadir a PDF');
    rerender(<ProductCard item={sampleItem} lang="es" isSelected={true} onToggleSelect={() => {}} />);
    const removeBtn = screen.getByRole('button', { name: 'Quitar' });
    expect(removeBtn).toHaveTextContent('✓ En tu PDF');
    expect(removeBtn).toHaveClass('selected');
  });
});
