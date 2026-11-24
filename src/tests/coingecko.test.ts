import {
  beforeEach,
  afterEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { obtenerCriptomonedas } from '../services/coingecko';

describe('Servicio CoinGecko', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('obtiene y transforma los precios correctamente', async () => {
    const fetchSimulado = vi.mocked(fetch);

    fetchSimulado.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        bitcoin: { usd: 65000 },
        ethereum: { usd: 3200 },
        solana: { usd: 150 },
      }),
    } as Response);

    const resultado = await obtenerCriptomonedas();

    expect(resultado).toEqual([
      {
        id: 'bitcoin',
        nombre: 'Bitcoin',
        usd: 65000,
      },
      {
        id: 'ethereum',
        nombre: 'Ethereum',
        usd: 3200,
      },
      {
        id: 'solana',
        nombre: 'Solana',
        usd: 150,
      },
    ]);

    expect(fetchSimulado).toHaveBeenCalledTimes(1);
  });

  it('informa un error cuando la respuesta HTTP falla', async () => {
    const fetchSimulado = vi.mocked(fetch);

    fetchSimulado.mockResolvedValue({
      ok: false,
      status: 500,
    } as Response);

    await expect(
      obtenerCriptomonedas()
    ).rejects.toThrow('Error HTTP: 500');
  });

  it('devuelve una lista vacía cuando no hay precios', async () => {
    const fetchSimulado = vi.mocked(fetch);

    fetchSimulado.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({}),
    } as Response);

    const resultado = await obtenerCriptomonedas();

    expect(resultado).toEqual([]);
  });
});
