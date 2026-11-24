import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';

import App from '../App';
import { obtenerCriptomonedas } from '../services/coingecko';

vi.mock('../services/coingecko', () => ({
  obtenerCriptomonedas: vi.fn(),
}));

const obtenerSimulado = vi.mocked(obtenerCriptomonedas);

describe('Consulta de criptomonedas', () => {
  beforeEach(() => {
    obtenerSimulado.mockReset();
  });

  it('muestra el resultado de una consulta exitosa', async () => {
    obtenerSimulado.mockResolvedValue([
      { id: 'bitcoin', nombre: 'Bitcoin', usd: 65000 },
      { id: 'ethereum', nombre: 'Ethereum', usd: 3200 },
      { id: 'solana', nombre: 'Solana', usd: 150 },
    ]);

    const usuario = userEvent.setup();
    render(
        <MemoryRouter>
            <App />
        </MemoryRouter>
        );

    await usuario.click(
      screen.getByRole('button', { name: /consultar precios/i })
    );

    expect(
      await screen.findByText('Precios obtenidos correctamente.')
    ).toBeInTheDocument();

    expect(
        screen.getByRole('heading', { name: 'Bitcoin' })
    ).toBeInTheDocument();
  });

  it('muestra error y permite reintentar', async () => {
    obtenerSimulado
      .mockRejectedValueOnce(new Error('Sin conexión'))
      .mockResolvedValueOnce([
        { id: 'bitcoin', nombre: 'Bitcoin', usd: 65000 },
      ]);

    const usuario = userEvent.setup();
    render(
        <MemoryRouter>
            <App />
        </MemoryRouter>
        );

    await usuario.click(
      screen.getByRole('button', { name: /consultar precios/i })
    );

    expect(
      await screen.findByText('No se pudieron obtener los precios.')
    ).toBeInTheDocument();

    await usuario.click(
      screen.getByRole('button', { name: /reintentar consulta/i })
    );

    await waitFor(() => {
      expect(obtenerSimulado).toHaveBeenCalledTimes(2);
    });

    expect(
      await screen.findByText('Precios obtenidos correctamente.')
    ).toBeInTheDocument();
  });
});
