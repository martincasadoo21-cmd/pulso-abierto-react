
type Estado = 'inicial' | 'carga' | 'resultado' | 'vacio' | 'error';

type EstadoConsultaProps = {
  estado: Estado;
  onReintentar?: () => void;
};

function EstadoConsulta({
  estado,
  onReintentar,
}: EstadoConsultaProps) {
  const mensajes: Record<Estado, string> = {
    inicial: 'Presioná el botón para iniciar la consulta.',
    carga: 'Cargando precios...',
    resultado: 'Precios obtenidos correctamente.',
    vacio: 'No se encontraron resultados.',
    error: 'No se pudieron obtener los precios.',
  };

  return (
    <div>
      <p
        role={estado === 'error' ? 'alert' : 'status'}
        aria-live="polite"
      >
        {mensajes[estado]}
      </p>

      {estado === 'error' && onReintentar && (
        <button
          type="button"
          onClick={onReintentar}
        >
          Reintentar consulta
        </button>
      )}
    </div>
  );
}

export default EstadoConsulta;

