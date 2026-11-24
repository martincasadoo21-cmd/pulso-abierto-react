import { Link } from 'react-router';

function PaginaNoEncontrada() {
  return (
    <main>
      <h2>Página no encontrada</h2>

      <p>La dirección que ingresaste no existe.</p>

      <Link to="/">Volver al inicio</Link>
    </main>
  );
}

export default PaginaNoEncontrada;
