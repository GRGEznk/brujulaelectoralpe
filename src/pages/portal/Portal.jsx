import React, { useEffect, useState } from 'react';
import portal from '../../assets/portal.png';
import Hero from '../../components/Hero.jsx';
import { Search } from 'lucide-react';
import Card from './components/Card.jsx';
import api from '../../api/api';

export default function Portal() {
  const [partidos, setPartidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartidos = async () => {
      try {
        const response = await api.get('/partidos');
        setPartidos(response.data);
      } catch (error) {
        console.error('Error al cargar partidos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartidos();
  }, []);
  return (
    <div>
      <Hero
        title="Portal de Transparencia"
        description="Explora la información pública de cada partido político del Perú"
      />

      <section className="w-full bg-blanco min-h-screen flex items-center py-12 px-4">
        <div className="max-w-[1000px] mx-auto w-full">
          <h2 className="text-3xl md:text-4xl font-bold font-argentum text-center mb-10">
            Del discurso al dato: conoce a quién eliges
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <img
              src={portal}
              alt="Portal transparencia"
              className="w-[280px] md:w-[320px] lg:w-[360px] h-auto"
              loading="lazy"
            />

            <div className="max-w-[500px] text-center md:text-left">
              <div className="space-y-4">
                <p className="text-gray-700 text-base md:text-lg leading-[1.7]">
                  El Portal de Transparencia Electoral reúne la información
                  pública más relevante sobre los partidos políticos del Perú.
                  Aquí puedes consultar planes de gobierno, hojas de vida,
                  financiamiento y compromisos de campaña, todo en un solo lugar
                  y con datos verificados.
                </p>

                <p className="text-gray-700 text-base md:text-lg leading-[1.7]">
                  Nuestro objetivo es que cada ciudadano pueda comparar,
                  contrastar y decidir con criterio, sin tener que navegar entre
                  cientos de páginas oficiales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-fondos py-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Título centrado */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">
              Catálogo Electoral
            </h2>
          </div>

          {/* Contenedor para alinear la barra de búsqueda a la derecha */}
          <div className="flex justify-end mb-10">
            <form className="w-full md:w-auto">
              <div className="relative flex w-full md:w-96">
                {/* Input */}
                <input
                  type="text"
                  placeholder="Buscar candidato, partido o propuesta..."
                  className="w-full py-3.5 pl-5 pr-12 text-gray-800 bg-white border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />

                {/* Botón con ícono de lupa de lucide-react */}
                <button
                  type="submit"
                  className="bg-blue text-white py-3.5 px-6 rounded-r-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 flex items-center justify-center"
                  aria-label="Buscar"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>

          {/* Grid para las Cards */}
          <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {loading ? (
                <div className="col-span-full text-center py-10">
                  <span className="loading loading-spinner loading-lg text-blue"></span>
                </div>
              ) : partidos.length > 0 ? (
                partidos.map((partido) => (
                  <div key={partido.id} className="flex justify-center">
                    <Card siglas={partido.sigla} nombre={partido.nombre} />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-10 text-gray-500">
                  No se encontraron partidos.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
