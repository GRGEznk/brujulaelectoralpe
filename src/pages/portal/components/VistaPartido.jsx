import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api/api";
import Hero from "../../../components/Hero";
import CandidateCard from "./CandidateCard";

// Constantes
const DEFAULT_REGION_ID = 2; // Lima Metropolitana
const CARGO_TYPES = {
  PRESIDENTE: "presidente",
  VICE_1: "1er vicepresidente",
  VICE_2: "2do vicepresidente",
  SENADOR_NACIONAL: "senador nacional",
  SENADOR_REGIONAL: "senador regional",
  DIPUTADO: "diputado",
  PARLAMENTO_ANDINO: "parlamento andino",
};

const JERARQUIA_PRESIDENCIAL = {
  [CARGO_TYPES.PRESIDENTE]: 1,
  [CARGO_TYPES.VICE_1]: 2,
  [CARGO_TYPES.VICE_2]: 3,
};

// Utilidades
const getContrastYIQ = (hexcolor) => {
  if (!hexcolor) return "white";

  let cleanHex = hexcolor.replace("#", "");

  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split("")
      .map((c) => c + c)
      .join("");
  }

  const r = parseInt(cleanHex.substr(0, 2), 16);
  const g = parseInt(cleanHex.substr(2, 2), 16);
  const b = parseInt(cleanHex.substr(4, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  return yiq >= 128 ? "#151515" : "#ffffff";
};

const sortByNumero = (candidatos) => {
  return [...candidatos].sort((a, b) => {
    const numA = a.numero ?? 999;
    const numB = b.numero ?? 999;
    return numA - numB;
  });
};

const sortPresidenciales = (candidatos) => {
  return [...candidatos].sort((a, b) => {
    const cargoA = a.cargo?.toLowerCase();
    const cargoB = b.cargo?.toLowerCase();
    const valorA = JERARQUIA_PRESIDENCIAL[cargoA] || 4;
    const valorB = JERARQUIA_PRESIDENCIAL[cargoB] || 4;
    return valorA - valorB;
  });
};

// Componentes auxiliares
const LoadingState = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin mx-auto mb-4" />
      <p className="text-gray-600">Cargando...</p>
    </div>
  </div>
);

const ErrorState = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Partido no encontrado
      </h2>
      <p className="text-gray-600">
        No se pudo cargar la información del partido
      </p>
    </div>
  </div>
);

const EmptyState = ({ message }) => (
  <p className="text-gray-500 col-span-full py-8 text-center bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
    {message}
  </p>
);

const PartyHero = ({ partido, bgColor, textColor }) => (
  <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
    <aside className="relative group shrink-0 mx-auto md:mx-0 -mt-20 md:-mt-24">
      <div className="w-56 h-56 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-white shadow-xl relative z-10 bg-gray-100 mx-auto">
        <img
          src={`/candidatos/${partido.sigla}.png`}
          alt={`Candidato de ${partido.nombre}`}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "/placeholder-candidate.png";
            e.target.onerror = null;
          }}
        />
      </div>
      <div className="absolute -bottom-2 right-1/2 translate-x-1/2 md:translate-x-0 md:-right-2 md:bottom-4 w-20 h-20 md:w-24 md:h-24 bg-white rounded-full p-2 shadow-lg flex items-center justify-center z-20 animate-bounce-slow">
        <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center p-1">
          <img
            src={`/logos/${partido.sigla}.png`}
            alt={`Logo ${partido.sigla}`}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </aside>

    <div className="flex-1 pt-4 md:pt-8 text-center md:text-left">
      <p className="text-gray-700 leading-relaxed text-lg max-w-2xl mx-auto md:mx-0 font-medium text-justify">
        Con raíces que datan desde{" "}
        <span className="font-bold text-gray-900">
          {partido?.partido_metadata?.anio_fundacion || "---"}
        </span>
        ,{" "}
        <span className="font-bold text-gray-900">{partido.nombre_largo}</span>{" "}
        (o simplemente{" "}
        <span className="font-bold text-gray-900">{partido.sigla}</span>) es
        un(a){" "}
        <span className="font-bold text-gray-900">
          {partido?.partido_metadata?.tipo_organizacion ||
            "organización política"}
        </span>{" "}
        liderado(a) por{" "}
        <span className="font-bold text-gray-900">
          {partido?.partido_metadata?.lider_partido || "---"}
        </span>
        . Tras lograr su inscripción oficial en el año{" "}
        <span className="font-bold text-gray-900">
          {partido?.partido_metadata?.anio_inscripcion_jne || "---"}
        </span>
        , la organización se prepara para el proceso electoral 2026 llevando a{" "}
        <span className="font-bold text-gray-900">
          {partido?.partido_metadata?.candidato_presidencial || "---"}
        </span>{" "}
        a encabezar su plancha presidencial, buscando representar a sus
        electores.
      </p>

      {partido?.partido_metadata?.plan_gobierno && (
        <div className="mt-6 flex justify-center md:justify-start">
          <a
            href={partido.partido_metadata.plan_gobierno}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary bg-red-600 hover:bg-red-700 text-white border-none px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18 18.246 18.477 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            Ver Plan de Gobierno
          </a>
        </div>
      )}
    </div>
  </div>
);

const SectionTitle = ({ children }) => (
  <div className="mt-12 md:mt-16 first:mt-8 md:first:mt-12">
    <h2 className="text-2xl md:text-3xl font-bold font-argentum text-gray-800 mb-2 md:mb-1 leading-tight text-center md:text-left">
      {children}
    </h2>
    <hr className="border-t-2 border-gray-100 mb-6 md:mb-8" />
  </div>
);

const CandidateGrid = ({ candidatos, emptyMessage }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {candidatos.length > 0 ? (
      candidatos.map((c) => <CandidateCard key={c.candidato_id} {...c} />)
    ) : (
      <EmptyState message={emptyMessage} />
    )}
  </div>
);

const RegionSelector = ({ regiones, selectedRegionId, onRegionChange }) => (
  <div className="mt-16 md:mt-24 p-6 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
    <div className="text-center md:text-left">
      <h3 className="text-xl font-bold text-gray-800">Candidatos Regionales</h3>
      <p className="text-gray-500 text-sm">
        Selecciona una región para ver las listas de Senado y Diputados.
      </p>
    </div>
    <div className="flex items-center gap-3 w-full md:w-auto">
      <span className="hidden md:inline font-bold text-gray-700 uppercase tracking-wider text-xs whitespace-nowrap">
        Ubicación:
      </span>
      <select
        className="select select-bordered w-full md:max-w-xs bg-white font-bold text-red border-red/20 focus:outline-none focus:ring-2 focus:ring-red"
        value={selectedRegionId}
        onChange={(e) => onRegionChange(e.target.value)}
      >
        {regiones.map((reg) => (
          <option key={reg.id} value={reg.id}>
            {reg.nombre}
          </option>
        ))}
      </select>
    </div>
  </div>
);

// Componente principal
const VistaPartido = () => {
  const { sigla } = useParams();
  const [partido, setPartido] = useState(null);
  const [candidatos, setCandidatos] = useState([]);
  const [regiones, setRegiones] = useState([]);
  const [selectedRegionId, setSelectedRegionId] = useState(DEFAULT_REGION_ID);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const bgColor = partido?.partido_metadata?.color_primario || "#be1717";
  const textColor = getContrastYIQ(bgColor);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);

        const [partyRes, regRes] = await Promise.all([
          api.get(`/partidos/sigla/${sigla}`),
          api.get("/regiones"),
        ]);

        const partyData = partyRes.data;
        setPartido(partyData);
        setRegiones(regRes.data);

        if (partyData?.id) {
          const candRes = await api.get(`/partidos/${partyData.id}/candidatos`);
          setCandidatos(candRes.data);
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (sigla) {
      fetchData();
    }
  }, [sigla]);

  // Filtros y ordenamiento memoizados
  const listas = useMemo(() => {
    const filterByCargo = (cargo) =>
      candidatos.filter((c) => c.cargo?.toLowerCase() === cargo);

    const filterByCargoAndRegion = (cargo, regionId) =>
      candidatos.filter(
        (c) =>
          c.cargo?.toLowerCase() === cargo &&
          c.id_region === parseInt(regionId),
      );

    return {
      presidencial: sortPresidenciales(
        candidatos.filter((c) =>
          [
            CARGO_TYPES.PRESIDENTE,
            CARGO_TYPES.VICE_1,
            CARGO_TYPES.VICE_2,
          ].includes(c.cargo?.toLowerCase()),
        ),
      ),
      senadoNacional: sortByNumero(filterByCargo(CARGO_TYPES.SENADOR_NACIONAL)),
      senadoRegional: sortByNumero(
        filterByCargoAndRegion(CARGO_TYPES.SENADOR_REGIONAL, selectedRegionId),
      ),
      diputados: sortByNumero(
        filterByCargoAndRegion(CARGO_TYPES.DIPUTADO, selectedRegionId),
      ),
      parlamentoAndino: sortByNumero(
        filterByCargo(CARGO_TYPES.PARLAMENTO_ANDINO),
      ),
    };
  }, [candidatos, selectedRegionId]);

  const handleRegionChange = useCallback((value) => {
    setSelectedRegionId(value);
  }, []);

  // Estados de carga y error
  if (loading) return <LoadingState />;
  if (error || !partido) return <ErrorState />;

  return (
    <div className="min-h-screen bg-white">
      <Hero
        title={partido.nombre}
        style={{
          backgroundColor: bgColor,
          color: textColor,
        }}
      />

      <div className="container mx-auto px-4 mt-0 relative z-10 pb-20">
        <div className="max-w-4xl mx-auto">
          <PartyHero
            partido={partido}
            bgColor={bgColor}
            textColor={textColor}
          />

          {/* Lista Presidencial */}
          <SectionTitle>Lista presidencial</SectionTitle>
          <CandidateGrid
            candidatos={listas.presidencial}
            emptyMessage="No disponible."
          />

          {/* Senado Nacional */}
          {listas.senadoNacional.length > 0 && (
            <>
              <SectionTitle>Lista Senado Nacional</SectionTitle>
              <CandidateGrid candidatos={listas.senadoNacional} />
            </>
          )}

          {/* Selector de Región */}
          <RegionSelector
            regiones={regiones}
            selectedRegionId={selectedRegionId}
            onRegionChange={handleRegionChange}
          />

          {/* Senado Regional */}
          <SectionTitle>Lista Senado Regional</SectionTitle>
          <CandidateGrid
            candidatos={listas.senadoRegional}
            emptyMessage="No hay candidatos al Senado en esta región para este partido."
          />

          {/* Diputados */}
          <SectionTitle>Lista Diputados</SectionTitle>
          <CandidateGrid
            candidatos={listas.diputados}
            emptyMessage="No hay candidatos a Diputados en esta región para este partido."
          />

          {/* Parlamento Andino */}
          {listas.parlamentoAndino.length > 0 && (
            <>
              <SectionTitle>Lista Parlamento Andino</SectionTitle>
              <CandidateGrid candidatos={listas.parlamentoAndino} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VistaPartido;
