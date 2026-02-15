import { useState, useEffect } from "react";
import api from "../../../../api/api";
import { Save, AlertCircle, ArrowLeft } from "lucide-react";
import Pregunta from "../../../../components/Pregunta";

export default function RegistroPartidoPreg({ onCancel }) {
  const [partidos, setPartidos] = useState([]);
  const [selectedPartido, setSelectedPartido] = useState("");
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState({}); // { preguntaId: { valor: 0, fuente: "" } }
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState({ type: "", message: "" });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Cargar partidos y preguntas activas al inicio
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [partidosRes, preguntasRes] = await Promise.all([
          api.get("/partidos"),
          api.get("/preguntas?estado=activa"),
        ]);

        // Filtrar activas si el API no filtra ya
        const activeQuestions = preguntasRes.data
          .filter((p) => p.estado === "activa")
          .sort((a, b) => a.id - b.id);

        setPartidos(partidosRes.data);
        setPreguntas(activeQuestions);
      } catch (error) {
        console.error("Error cargando datos:", error);
        setNotification({
          type: "error",
          message: "Error cargando datos iniciales",
        });
      }
    };
    fetchData();
  }, []);

  // Cargar respuestas cuando se selecciona un partido
  useEffect(() => {
    if (!selectedPartido) {
      setRespuestas({});
      return;
    }

    // Reiniciar a la primera pregunta al cambiar de partido
    setCurrentQuestionIndex(0);

    const fetchRespuestas = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `/partidos/${selectedPartido}/respuestas`,
        );
        const loadedAnswers = {};
        // Mapear respuesta del servidor al estado local
        response.data.forEach((item) => {
          loadedAnswers[item.pregunta_id] = {
            valor: item.valor,
            fuente: item.fuente || "",
          };
        });
        setRespuestas(loadedAnswers);
      } catch (error) {
        console.error("Error cargando respuestas:", error);
        setNotification({
          type: "error",
          message: "Error cargando respuestas del partido",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRespuestas();
  }, [selectedPartido]);

  const handleAnswerChange = (preguntaId, valor) => {
    setRespuestas((prev) => ({
      ...prev,
      [preguntaId]: {
        ...prev[preguntaId],
        valor: parseInt(valor),
      },
    }));
  };

  const handleFuenteChange = (preguntaId, fuente) => {
    setRespuestas((prev) => ({
      ...prev,
      [preguntaId]: {
        ...prev[preguntaId],
        fuente: fuente,
      },
    }));
  };

  const handleSave = async () => {
    if (!selectedPartido) return;

    // Validar que todas las preguntas tengan respuesta (valor definido)
    const faltantes = preguntas.filter((p) => {
      const resp = respuestas[p.id];
      return !resp || resp.valor === undefined || resp.valor === null;
    });

    if (faltantes.length > 0) {
      setNotification({
        type: "error",
        message: `Falta responder ${faltantes.length} preguntas.`,
      });
      return;
    }

    setSaving(true);
    setNotification({ type: "", message: "" });

    try {
      // Convertir objeto de respuestas a array para el backend
      const payload = Object.entries(respuestas).map(([preguntaId, data]) => ({
        pregunta_id: parseInt(preguntaId),
        valor: data.valor !== undefined ? data.valor : 0, // Fallback si es nuevo
        fuente: data.fuente,
      }));

      await api.post(`/partidos/${selectedPartido}/respuestas`, {
        respuestas: payload,
      });
      setNotification({
        type: "success",
        message: "Respuestas guardadas correctamente",
      });

      // Auto ocultar mensaje de éxito
      setTimeout(() => setNotification({ type: "", message: "" }), 3000);
    } catch (error) {
      console.error("Error guardando:", error);
      setNotification({
        type: "error",
        message: "Error al guardar los cambios",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < preguntas.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const options = [
    { val: -2, label: "Totalmente en Desacuerdo" },
    { val: -1, label: "En Desacuerdo" },
    { val: 0, label: "NS/NP" },
    { val: 1, label: "De Acuerdo" },
    { val: 2, label: "Totalmente de Acuerdo" },
  ];

  const currentPregunta = preguntas[currentQuestionIndex];
  const progressPercentage =
    preguntas.length > 0
      ? ((currentQuestionIndex + 1) / preguntas.length) * 100
      : 0;

  return (
    <div className="space-y-6 pb-24">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-negro">
          Registro de Posturas de Partido
        </h2>
        {onCancel && (
          <button onClick={onCancel} className="btn btn-ghost btn-sm gap-2">
            <ArrowLeft size={16} /> Volver
          </button>
        )}
      </div>

      {/* Selector de Partido */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <label className="label">
          <span className="label-text font-bold">Seleccionar Partido</span>
        </label>
        <select
          className="select select-bordered w-full max-w-xs"
          value={selectedPartido}
          onChange={(e) => setSelectedPartido(e.target.value)}
        >
          <option value="">-- Elige un partido --</option>
          {partidos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre}
            </option>
          ))}
        </select>
      </div>

      {notification.message && (
        <div
          className={`alert ${notification.type === "error" ? "alert-error" : "alert-success"} shadow-lg`}
        >
          <div>
            {notification.type === "error" && <AlertCircle size={20} />}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Bloque de Preguntas (Siempre visible) */}
      <div
        className={`space-y-8 ${!selectedPartido ? "opacity-50 pointer-events-none filter grayscale transition-all duration-300" : ""}`}
      >
        {/* Mensaje superpuesto si no hay partido */}
        {!selectedPartido && (
          <div className="absolute inset-x-0 top-40 flex justify-center z-10">
            <div className="bg-black/70 text-white px-6 py-3 rounded-full shadow-xl text-sm font-bold animate-bounce">
              Selecciona un partido para comenzar
            </div>
          </div>
        )}

        {loading ? (
          <div className="py-10 text-center text-gray-500">
            Cargando respuestas...
          </div>
        ) : !currentPregunta ? (
          <div className="py-10 text-center text-gray-500">
            No hay preguntas disponibles.
          </div>
        ) : (
          <>
            {/* Barra de Progreso */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-500">
                <span>
                  Pregunta {currentQuestionIndex + 1} de {preguntas.length}
                </span>
                <span>{Math.round(progressPercentage)}% completado</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-red h-2.5 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            {currentPregunta && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <Pregunta
                  id={currentPregunta.id}
                  texto={currentPregunta.texto}
                  categoria={currentPregunta.categoria}
                  value={respuestas[currentPregunta.id]?.valor} // Will fail gracefully to undefined/null
                  onChange={handleAnswerChange}
                  fuente={respuestas[currentPregunta.id]?.fuente}
                  onFuenteChange={handleFuenteChange}
                  showFuente={true}
                />
              </div>
            )}

            {/* Navegación dentro del card */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-6">
              <button
                className={`btn btn-outline gap-2 ${currentQuestionIndex === 0 ? "invisible" : ""}`}
                onClick={handlePrevious}
              >
                <ArrowLeft size={16} /> Anterior
              </button>

              {currentQuestionIndex < preguntas.length - 1 ? (
                <button
                  className={`btn btn-outline gap-2 px-6 ${
                    !respuestas[currentPregunta.id] ||
                    respuestas[currentPregunta.id].valor === undefined
                      ? "border-[#6b7280] text-[#6b7280] cursor-not-allowed hover:bg-transparent hover:text-[#6b7280]"
                      : "border-red text-red hover:bg-red hover:text-white"
                  }`}
                  onClick={handleNext}
                  disabled={
                    !respuestas[currentPregunta.id] ||
                    respuestas[currentPregunta.id].valor === undefined
                  }
                >
                  Siguiente
                </button>
              ) : (
                <button
                  className={`btn gap-2 border-none ${
                    saving ||
                    loading ||
                    !respuestas[currentPregunta.id] ||
                    respuestas[currentPregunta.id].valor === undefined
                      ? "bg-[#6b7280] text-white cursor-not-allowed"
                      : "bg-red text-white hover:bg-red/90"
                  }`}
                  onClick={handleSave}
                  disabled={
                    saving ||
                    loading ||
                    !respuestas[currentPregunta.id] ||
                    respuestas[currentPregunta.id].valor === undefined
                  }
                >
                  {!saving && <Save size={20} />}
                  Finalizar y Guardar
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* Botón flotante opcional para guardar progreso parcial */}
    </div>
  );
}
