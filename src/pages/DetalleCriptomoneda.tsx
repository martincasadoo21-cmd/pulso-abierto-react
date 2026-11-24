import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

import { obtenerCriptomonedas } from '../services/coingecko';
import type { Criptomoneda } from '../types/criptomoneda';

import BotonFavorito from '../components/BotonFavorito';
import type { CriptoId } from '../types/criptomoneda';

import { formatearPrecio } from '../utils/formatearPrecio';

const monedasValidas = ['bitcoin', 'ethereum', 'solana'];

function DetalleCriptomoneda() {
  const { id } = useParams<{ id: string }>();

  const [criptomoneda, setCriptomoneda] =
    useState<Criptomoneda | null>(null);

  const [estado, setEstado] = useState<
    'carga' | 'resultado' | 'vacio' | 'error'
  >('carga');

  const [intento, setIntento] = useState(0);

  const idValido = id !== undefined && monedasValidas.includes(id);

  useEffect(() => {
    if (!idValido) return;

    let activo = true;

    async function cargarDetalle() {
      setEstado('carga');
      setCriptomoneda(null);

      try {
        const datos = await obtenerCriptomonedas();
        if (!activo) return;

        const encontrada = datos.find((moneda) => moneda.id === id);

        if (encontrada) {
          setCriptomoneda(encontrada);
          setEstado('resultado');
        } else {
          setEstado('vacio');
        }
      } catch (error) {
        if (!activo) return;
        console.error('Error al obtener el detalle:', error);
        setEstado('error');
      }
    }

    cargarDetalle();

    return () => {
      activo = false;
    };
  }, [id, idValido, intento]);

  if (!idValido) {
    return (
      <main>
        <h2>Criptomoneda no encontrada</h2>
        <p>El identificador solicitado no existe.</p>
        <Link to="/">Volver a la consulta</Link>
      </main>
    );
  }

  return (
    <main>
      <h2>Detalle de criptomoneda</h2>

      {estado === 'carga' && (
        <p role="status">Cargando información...</p>
      )}

      {estado === 'error' && (
        <div>
          <p role="alert">No se pudo obtener la información.</p>
          <button type="button" onClick={() => setIntento((n) => n + 1)}>
            Volver a intentar
          </button>
        </div>
      )}

      
      {estado === 'resultado' && criptomoneda && (
        <article className="tarjeta">
          <h3>{criptomoneda.nombre}</h3>

          <p>
            Identificador: {criptomoneda.id}
          </p>

      <p className="precio">
          {formatearPrecio(criptomoneda.usd)}
</p>

    <BotonFavorito id={criptomoneda.id as CriptoId} />
  </article>
)}


      <p>
        <Link to="/">Volver a la consulta</Link>
      </p>
    </main>
  );
}

export default DetalleCriptomoneda;
