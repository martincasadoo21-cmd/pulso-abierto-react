import { useState } from 'react';
import { consultaSchema } from '../schemas/consultaSchema';

export type FiltrosConsulta = {
  busqueda: string;
  criptomoneda: 'todas' | 'bitcoin' | 'ethereum' | 'solana';
};

type ConsultaFormProps = {
  onConsultar: (filtros: FiltrosConsulta) => void;
  cargando: boolean;
};

function ConsultaForm({ onConsultar, cargando }: ConsultaFormProps) {
  const [busqueda, setBusqueda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('todas');

  const [errores, setErrores] = useState<{
    busqueda?: string;
    criptomoneda?: string;
  }>({});

  function manejarEnvio(evento: React.SubmitEvent<HTMLFormElement>) {
    evento.preventDefault();

    const resultado = consultaSchema.safeParse({
      busqueda,
      criptomoneda,
    });

    if (!resultado.success) {
      const campos = resultado.error.flatten().fieldErrors;

      setErrores({
        busqueda: campos.busqueda?.[0],
        criptomoneda: campos.criptomoneda?.[0],
      });

      return;
    }

    setErrores({});
    onConsultar(resultado.data);
  }

  return (
    <section aria-labelledby="consulta-titulo">
      <h2 id="consulta-titulo">Consultar precios</h2>

      <form onSubmit={manejarEnvio} noValidate>
        <div className="campo-formulario">
          <label htmlFor="busqueda">Buscar por nombre</label>

          <input
            id="busqueda"
            type="text"
            value={busqueda}
            onChange={(evento) => setBusqueda(evento.target.value)}
            aria-invalid={Boolean(errores.busqueda)}
            aria-describedby={errores.busqueda ? 'error-busqueda' : undefined}
          />

          {errores.busqueda && (
            <p id="error-busqueda" className="error">
              {errores.busqueda}
            </p>
          )}
        </div>

        <div className="campo-formulario">
          <label htmlFor="criptomoneda">Seleccionar criptomoneda</label>

          <select
            id="criptomoneda"
            value={criptomoneda}
            onChange={(evento) => setCriptomoneda(evento.target.value)}
            aria-invalid={Boolean(errores.criptomoneda)}
            aria-describedby={
              errores.criptomoneda ? 'error-criptomoneda' : undefined
            }
          >
            <option value="todas">Todas</option>
            <option value="bitcoin">Bitcoin</option>
            <option value="ethereum">Ethereum</option>
            <option value="solana">Solana</option>
          </select>

          {errores.criptomoneda && (
            <p id="error-criptomoneda" className="error">
              {errores.criptomoneda}
            </p>
          )}
        </div>

        <button type="submit" disabled={cargando}>
          {cargando ? 'Consultando...' : 'Consultar precios'}
        </button>
      </form>
    </section>
  );
}

export default ConsultaForm;
