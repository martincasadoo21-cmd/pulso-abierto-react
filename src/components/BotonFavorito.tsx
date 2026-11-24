import { useFavoritosStore } from '../store/useFavoritosStore';
import type { CriptoId } from '../types/criptomoneda';

interface Props {
  id: CriptoId;
}

const nombres: Record<CriptoId, string> = {
  bitcoin: 'Bitcoin',
  ethereum: 'Ethereum',
  solana: 'Solana',
};

export default function BotonFavorito({ id }: Props) {
  const esFavorito = useFavoritosStore(
    (estado) => estado.favoritos.includes(id)
  );

  const alternarFavorito = useFavoritosStore(
    (estado) => estado.alternarFavorito
  );

  return (
    <button
      type="button"
      aria-pressed={esFavorito}
      aria-label={
        esFavorito
          ? `Quitar ${nombres[id]} de favoritos`
          : `Agregar ${nombres[id]} a favoritos`
      }
      onClick={() => alternarFavorito(id)}
    >
      {esFavorito ? '★ Quitar favorito' : '☆ Agregar favorito'}
    </button>
  );
}
