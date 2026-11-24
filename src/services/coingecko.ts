import type { Criptomoneda } from '../types/criptomoneda';

// Dirección de la API de CoinGecko
const API_URL =
  'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd';

// Criptomonedas disponibles
const monedas = [
  { id: 'bitcoin', nombre: 'Bitcoin' },
  { id: 'ethereum', nombre: 'Ethereum' },
  { id: 'solana', nombre: 'Solana' },
];

// Función que consulta los precios
export async function obtenerCriptomonedas(): Promise<Criptomoneda[]> {
  const respuesta = await fetch(API_URL);

  if (!respuesta.ok) {
    throw new Error(`Error HTTP: ${respuesta.status}`);
  }

  const datos: unknown = await respuesta.json();

  if (typeof datos !== 'object' || datos === null) {
    throw new Error('La respuesta de la API no es válida');
  }

  const precios = datos as Record<string, unknown>;

  const resultado: Criptomoneda[] = [];

  for (const moneda of monedas) {
    const informacion = precios[moneda.id];

    if (
      typeof informacion !== 'object' ||
      informacion === null ||
      Array.isArray(informacion)
    ) {
      continue;
    }

    const valor = (informacion as Record<string, unknown>).usd;

    if (typeof valor !== 'number' || !Number.isFinite(valor)) {
      continue;
    }

    resultado.push({
      id: moneda.id,
      nombre: moneda.nombre,
      usd: valor,
    });
  }

  return resultado;
}
