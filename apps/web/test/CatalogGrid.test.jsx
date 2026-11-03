import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CatalogGrid } from '../src/components/CatalogGrid.jsx';

describe('CatalogGrid Component', () => {
  const mixedItems = [
    {
      id: 'WITH-1',
      brand: 'B1',
      name: { es: 'Con Foto 1' },
      format: '1kg',
      unitPrice: 10,
      priceText: '10 €',
      hasPhoto: true,
      imagePath: '/img1.jpg'
    },
    {
      id: 'WITHOUT-1',
      brand: 'B2',
      name: { es: 'Sin Foto 1' },
      format: '2kg',
      unitPrice: 5,
      priceText: '5 €',
      hasPhoto: false
    }
  ];

  it('renders both cards and compact table in full rate mode', () => {
    render(
      <CatalogGrid
        items={mixedItems}
        lang="es"
        isOffline={false}
        onRetry={() => {}}
        isSelected={() => false}
        onToggleSelect={() => {}}
        onlyWithPhoto={false}
      />
    );
    expect(screen.getByText('Con Foto 1')).toBeInTheDocument();
    expect(screen.getByText('Sin Foto 1')).toBeInTheDocument();
  });

  it('hides compact table when onlyWithPhoto is true', () => {
    render(
      <CatalogGrid
        items={mixedItems}
        lang="es"
        isOffline={false}
        onRetry={() => {}}
        isSelected={() => false}
        onToggleSelect={() => {}}
        onlyWithPhoto={true}
      />
    );
    expect(screen.getByText('Con Foto 1')).toBeInTheDocument();
    expect(screen.queryByText('Sin Foto 1')).not.toBeInTheDocument();
  });

  it('shows offline notice with retry action when offline', () => {
    const handleRetry = vi.fn();
    render(
      <CatalogGrid
        items={mixedItems}
        lang="es"
        isOffline={true}
        onRetry={handleRetry}
        isSelected={() => false}
        onToggleSelect={() => {}}
        onlyWithPhoto={false}
      />
    );
    const retryBtn = screen.getByRole('button', { name: /reintentar/i });
    expect(retryBtn).toBeInTheDocument();
    fireEvent.click(retryBtn);
    expect(handleRetry).toHaveBeenCalled();
  });
});
