import Hero from "../../components/Hero";
import ComparadorRespuestas from "./components/ComparadorRespuestas";
import { useEffect, useState } from "react";
import api from "../../api/api";

export default function Comparador() {
  const [partidosDisponibles, setPartidosDisponibles] = useState([]);
  const [preguntas, setPreguntas] = useState([]);
  const [partido1, setPartido1] = useState(null);
  const [partido2, setPartido2] = useState(null);
  const [respuestas, setRespuestas] = useState({});

  // Cargar partidos y preguntas al inicio
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [partidosRes, preguntasRes] = await Promise.all([
          api.get("/parties"),
          api.get("/questions"),
        ]);
        setPartidosDisponibles(partidosRes.data);
        setPreguntas(preguntasRes.data);
      } catch (err) {
        console.error("Error al cargar datos iniciales:", err);
      }
    };
    fetchData();
  }, []);

  // Cargar respuestas de un partido
  const fetchRespuestas = async (partidoId) => {
    if (!respuestas[partidoId]) {
      try {
        const response = await api.get(`/parties/${partidoId}/answers`);
        setRespuestas((prev) => ({
          ...prev,
          [partidoId]: response.data,
        }));
      } catch (err) {
        console.error(
          `Error al cargar respuestas del partido ${partidoId}:`,
          err,
        );
      }
    }
  };

  const handleSelect1 = (e) => {
    const id = parseInt(e.target.value);
    const partido = partidosDisponibles.find((p) => p.id === id);
    if (partido) {
      setPartido1(partido);
      fetchRespuestas(partido.id);
    } else {
      setPartido1(null);
    }
  };

  const handleSelect2 = (e) => {
    const id = parseInt(e.target.value);
    const partido = partidosDisponibles.find((p) => p.id === id);
    if (partido) {
      setPartido2(partido);
      fetchRespuestas(partido.id);
    } else {
      setPartido2(null);
    }
  };

  const partidosSeleccionados = [partido1, partido2].filter(Boolean);

  return (
    <>
      <Hero
        title="Comparador de Partidos Políticos"
        description="Selecciona dos partidos para comparar las respuestas de sus candidatos presidenciales."
      />

      <div className="w-full max-w-[1200px] mx-auto mt-20 mb-[80px] p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          {/* Candidato 1 */}
          <div className="flex flex-col items-center gap-6 p-8 bg-[var(--color-fondos)] rounded-[30px] shadow-sm border border-[var(--color-bordes)] relative">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-md bg-white flex items-center justify-center">
              {partido1 ? (
                <img
                  src={`/candidatos/${partido1.sigla.toUpperCase()}.png`}
                  alt={partido1.candidato_presidencial}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/candidatos/default.png";
                  }}
                />
              ) : (
                <div className="text-[var(--color-muted)] text-center p-4">
                  Selecciona un partido
                </div>
              )}
            </div>
            <div className="w-full">
              <label className="text-sm font-bold text-[var(--color-muted)] mb-2 block uppercase tracking-wider">
                Candidato 1
              </label>
              <select
                className="w-full p-4 bg-white border border-[var(--color-bordes)] rounded-xl font-bold cursor-pointer outline-none focus:border-[var(--color-primario)] transition-colors"
                onChange={handleSelect1}
                value={partido1?.id || ""}
              >
                <option value="">Seleccionar partido...</option>
                {partidosDisponibles
                  .filter((p) => p.id !== partido2?.id)
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.candidato_presidencial} - {p.nombre}
                    </option>
                  ))}
              </select>
            </div>
            {partido1 && (
              <div className="text-center">
                <h3 className="text-xl font-bold text-[var(--color-negro)]">
                  {partido1.candidato_presidencial}
                </h3>
                <p className="text-[var(--color-primario)] font-semibold">
                  {partido1.sigla}
                </p>
              </div>
            )}
          </div>

          {/* Candidato 2 */}
          <div className="flex flex-col items-center gap-6 p-8 bg-[var(--color-fondos)] rounded-[30px] shadow-sm border border-[var(--color-bordes)] relative">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-md bg-white flex items-center justify-center">
              {partido2 ? (
                <img
                  src={`/candidatos/${partido2.sigla.toUpperCase()}.png`}
                  alt={partido2.candidato_presidencial}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/candidatos/default.png";
                  }}
                />
              ) : (
                <div className="text-[var(--color-muted)] text-center p-4">
                  Selecciona un partido
                </div>
              )}
            </div>
            <div className="w-full">
              <label className="text-sm font-bold text-[var(--color-muted)] mb-2 block uppercase tracking-wider">
                Candidato 2
              </label>
              <select
                className="w-full p-4 bg-white border border-[var(--color-bordes)] rounded-xl font-bold cursor-pointer outline-none focus:border-[var(--color-primario)] transition-colors"
                onChange={handleSelect2}
                value={partido2?.id || ""}
              >
                <option value="">Seleccionar partido...</option>
                {partidosDisponibles
                  .filter((p) => p.id !== partido1?.id)
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.candidato_presidencial} - {p.nombre}
                    </option>
                  ))}
              </select>
            </div>
            {partido2 && (
              <div className="text-center">
                <h3 className="text-xl font-bold text-[var(--color-negro)]">
                  {partido2.candidato_presidencial}
                </h3>
                <p className="text-[var(--color-primario)] font-semibold">
                  {partido2.sigla}
                </p>
              </div>
            )}
          </div>
        </div>

        {partidosSeleccionados.length > 0 && (
          <div className="w-full animate-fade-in">
            <ComparadorRespuestas
              partidosSeleccionados={partidosSeleccionados}
              preguntas={preguntas}
              respuestas={respuestas}
            />
          </div>
        )}
      </div>
    </>
  );
}
