import { useEffect, useState } from "react";
import api from "../../api/api";
import Hero from "../../components/Hero";
import ComparadorRespuestas from "./components/ComparadorRespuestas";
import { Compass } from "lucide-react";

const Comparador = () => {
  const [partidos, setPartidos] = useState([]);
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const [idPartido1, setIdPartido1] = useState("");
  const [idPartido2, setIdPartido2] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [datosPartidosSeleccionados, setDatosPartidosSeleccionados] = useState(
    [],
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [partidosRes, preguntasRes] = await Promise.all([
          api.get("/partidos"),
          api.get("/preguntas"),
        ]);
        setPartidos(partidosRes.data);
        setPreguntas(preguntasRes.data);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };
    fetchData();
  }, []);

  const categoriasUnicas = [
    ...new Set(preguntas.map((p) => p.categoria)),
  ].sort();

  const fetchRespuestas = async (id) => {
    if (!id || respuestas[id]) return;
    try {
      const response = await api.get(`/partidos/${id}/respuestas`);
      setRespuestas((prev) => ({ ...prev, [id]: response.data }));
    } catch (error) {
      console.error("Error al cargar respuestas:", error);
    }
  };

  useEffect(() => {
    if (idPartido1) fetchRespuestas(idPartido1);
  }, [idPartido1]);

  useEffect(() => {
    if (idPartido2) fetchRespuestas(idPartido2);
  }, [idPartido2]);

  useEffect(() => {
    const seleccionados = [];
    if (idPartido1) {
      const p1 = partidos.find((p) => p.id === parseInt(idPartido1));
      if (p1) seleccionados.push(p1);
    }
    if (idPartido2) {
      const p2 = partidos.find((p) => p.id === parseInt(idPartido2));
      if (p2) seleccionados.push(p2);
    }
    setDatosPartidosSeleccionados(seleccionados);
  }, [idPartido1, idPartido2, partidos]);

  return (
    <div>
      <Hero
        title="Comparador Electoral"
        description="Compara las propuestas de los partidos políticos sobre los temas más importantes para el país"
      />

      <div className="container mx-auto px-4 mt-8 pb-20">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-gray-700">
                  Selecciona el primer partido
                </span>
              </label>
              <select
                className="select select-bordered w-full h-12 bg-gray-50 border-gray-200 focus:border-red rounded-xl"
                value={idPartido1}
                onChange={(e) => setIdPartido1(e.target.value)}
              >
                <option value="">Selecciona un partido</option>
                {partidos
                  .filter((p) => p.id !== parseInt(idPartido2))
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nombre}
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-gray-700">
                  Selecciona el segundo partido
                </span>
              </label>
              <select
                className="select select-bordered w-full h-12 bg-gray-50 border-gray-200 focus:border-red rounded-xl"
                value={idPartido2}
                onChange={(e) => setIdPartido2(e.target.value)}
              >
                <option value="">Selecciona un partido</option>
                {partidos
                  .filter((p) => p.id !== parseInt(idPartido1))
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nombre}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="form-control w-full max-w-md mx-auto mt-6 pt-6 border-t border-gray-100">
            <label className="label justify-center">
              <span className="label-text font-bold text-gray-700 text-lg">
                Filtrar por Categoría de Interés
              </span>
            </label>
            <select
              className="select select-bordered w-full h-12 bg-gray-50 border-gray-200 focus:border-red rounded-xl font-medium text-center"
              value={categoriaSeleccionada}
              onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            >
              <option value="">Todas las categorías</option>
              {categoriasUnicas.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {datosPartidosSeleccionados.length > 0 ? (
          <ComparadorRespuestas
            partidosSeleccionados={datosPartidosSeleccionados}
            preguntas={preguntas}
            respuestas={respuestas}
            categoriaSeleccionada={categoriaSeleccionada}
          />
        ) : (
          <div className="text-center py-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <Compass
              className="mx-auto mb-4 text-gray-300 animate-pulse"
              size={64}
            />
            <p className="text-gray-500 text-xl font-medium">
              Elige dos partidos para comparar sus planes de gobierno
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comparador;
