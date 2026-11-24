import { useState } from 'react';
import './App.css';

import ConsultaForm from './components/ConsultaForm';
import type { FiltrosConsulta } from './components/ConsultaForm';
import EstadoConsulta from './components/EstadoConsulta';
import ListaCriptomonedas from './components/ListaCriptomonedas';

import { obtenerCriptomonedas } from './services/coingecko';
import type { Criptomoneda } from './types/criptomoneda';


import { Routes, Route } from 'react-router';
import DetalleCriptomoneda from './pages/DetalleCriptomoneda';
import PaginaNoEncontrada from './pages/PaginaNoEncontrada';

import { useFavoritosStore } from './store/useFavoritosStore';


type Estado = 'inicial' | 'carga' | 'resultado' | 'vacio' | 'error';

function PaginaConsulta() {
  const [estado, setEstado] = useState<Estado>('inicial');
  const [criptomonedas, setCriptomonedas] = useState<Criptomoneda[]>([]);
  const [ultimosFiltros, setUltimosFiltros] =
    useState<FiltrosConsulta | null>(null);
  const cantidadFavoritos = useFavoritosStore(
  (estado) => estado.favoritos.length
);

  async function consultarPrecios(filtros: FiltrosConsulta) {
    if (estado === 'carga') return;

    setUltimosFiltros(filtros);
    setEstado('carga');
    setCriptomonedas([]);

    try {
      const datos = await obtenerCriptomonedas();

      const filtradas = datos.filter((cripto) => {
        const coincideNombre = cripto.nombre
          .toLowerCase()
          .includes(filtros.busqueda.toLowerCase());

        const coincideSeleccion =
          filtros.criptomoneda === 'todas' ||
          cripto.id === filtros.criptomoneda;

        return coincideNombre && coincideSeleccion;
      });

      setCriptomonedas(filtradas);
      setEstado(filtradas.length === 0 ? 'vacio' : 'resultado');
    } catch (error) {
      console.error('Error al consultar CoinGecko:', error);
      setEstado('error');
    }
  }

  return (
    <>
      <header>
        <h1>Pulso Abierto</h1>
        <p>Consulta de precios de criptomonedas</p>
        <p className="contador-favoritos">
          Favoritos: {cantidadFavoritos}
        </p>
      </header>
      <main>
        <ConsultaForm
          onConsultar={consultarPrecios}
          cargando={estado === 'carga'}
        />

        
        <EstadoConsulta
          estado={estado}
          onReintentar={() => {
            if (ultimosFiltros) {
              void consultarPrecios(ultimosFiltros);
            }
          }}
        />


        {estado === 'resultado' && (
          <ListaCriptomonedas
            criptomonedas={criptomonedas}
          />
        )}
      </main>

      <footer>
        <p>Datos proporcionados por CoinGecko.</p>
      </footer>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<PaginaConsulta />} />

      <Route
        path="/criptomonedas/:id"
        element={<DetalleCriptomoneda />}
      />

      <Route path="*" element={<PaginaNoEncontrada />} />
    </Routes>
  );
}

export default App;
