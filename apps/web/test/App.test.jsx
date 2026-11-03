import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { App } from '../src/App.jsx';

describe('App Full Integration Flow', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('API offline')));
  });

  async function renderApp() {
    const utils = render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Matías Sosa Marrazzo')).toBeInTheDocument();
    });
    return utils;
  }

  it('renders application with default Spanish language and contact card', async () => {
    await renderApp();
    expect(screen.getByText('Comercial Fuconsa en Cataluña')).toBeInTheDocument();
    expect(screen.getByText(/Otras referencias disponibles/)).toBeInTheDocument();
  });

  it('allows switching language to Catalan and updates labels', async () => {
    await renderApp();
    const caBtn = screen.getByRole('button', { name: 'CA' });
    fireEvent.click(caBtn);
    await waitFor(() => {
      expect(screen.getByText('Comercial Fuconsa a Catalunya')).toBeInTheDocument();
    });
  });

  it('filters catalog items via search input', async () => {
    await renderApp();
    const searchInput = screen.getByRole('searchbox');
    fireEvent.change(searchInput, { target: { value: 'Croquetas' } });
    expect(screen.getByText(/Croquetas Artesanas/)).toBeInTheDocument();
    expect(screen.queryByText(/Pizza Ristorante/)).not.toBeInTheDocument();
  });

  it('adds product to custom selection, shows drawer and opens A4 preview', async () => {
    await renderApp();
    const addBtns = screen.getAllByRole('button', { name: /añadir a selección/i });
    fireEvent.click(addBtns[0]);
    expect(screen.getByText('Selección a Medida')).toBeInTheDocument();
    const printBtn = screen.getByRole('button', { name: /imprimir a4/i });
    fireEvent.click(printBtn);
    expect(screen.getByText(/FUCONSA/)).toBeInTheDocument();
    const closeBtn = screen.getByRole('button', { name: /cerrar/i });
    fireEvent.click(closeBtn);
    expect(screen.queryByText(/Página 1 \/ 1/)).not.toBeInTheDocument();
  });

  it('opens A4 section print modal via toolbar print button', async () => {
    await renderApp();
    const printSectionBtn = screen.getByRole('button', { name: /imprimir sección a4/i });
    fireEvent.click(printSectionBtn);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/Página 1 \//)).toBeInTheDocument();
    const closeBtn = screen.getByRole('button', { name: /cerrar/i });
    fireEvent.click(closeBtn);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('displays offline banner notice with functional retry button', async () => {
    await renderApp();
    expect(screen.getByText(/Modo sin conexión/i)).toBeInTheDocument();
    const retryBtn = screen.getByRole('button', { name: /reintentar/i });
    expect(retryBtn).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(retryBtn);
    });
  });
});
