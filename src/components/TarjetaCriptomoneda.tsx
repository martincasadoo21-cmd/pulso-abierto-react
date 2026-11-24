
import type {
  Criptomoneda,
  CriptoId,
} from '../types/criptomoneda';

import { Link } from 'react-router';
import BotonFavorito from './BotonFavorito';
import { formatearPrecio } from '../utils/formatearPrecio';

type TarjetaCriptomonedaProps = {
  criptomoneda: Criptomoneda;
};

function TarjetaCriptomoneda({
  criptomoneda,
}: TarjetaCriptomonedaProps) {
  const precioFormateado = formatearPrecio(criptomoneda.usd);

  return (
    <article className="tarjeta">
      <h3>{criptomoneda.nombre}</h3>

      <p className="precio">{precioFormateado}</p>

      <BotonFavorito id={criptomoneda.id as CriptoId} />

      <p className="enlace-detalle">
        <Link to={`/criptomonedas/${criptomoneda.id}`}>
          Ver detalle
        </Link>
      </p>
    </article>
  );
}

export default TarjetaCriptomoneda;
