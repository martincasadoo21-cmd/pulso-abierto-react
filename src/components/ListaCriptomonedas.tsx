import type { Criptomoneda } from '../types/criptomoneda';
import TarjetaCriptomoneda from './TarjetaCriptomoneda';

type ListaCriptomonedasProps = {
  criptomonedas: Criptomoneda[];
  favoritas?: string[];
  onCambiarFavorita?: (id: string) => void;
};

function ListaCriptomonedas({
  criptomonedas,
}: ListaCriptomonedasProps) {
  return (
    <section aria-labelledby="resultados-titulo">
      <h2 id="resultados-titulo">Resultados</h2>

      <p>
        Se encontraron {criptomonedas.length} criptomonedas.
      </p>

      <div className="lista-criptomonedas">
        {criptomonedas.map((cripto) => (
          <TarjetaCriptomoneda
            key={cripto.id}
            criptomoneda={cripto}
          />
        ))}
      </div>
    </section>
  );
}

export default ListaCriptomonedas;
