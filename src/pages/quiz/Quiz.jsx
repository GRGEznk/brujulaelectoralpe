import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../../components/Hero.jsx";
import Pregunta from "../../components/Pregunta.jsx";
import api from "../../api/api";
import Responde from "../../assets/responde.png";
import Analiza from "../../assets/analiza.png";
import Profundiza from "../../assets/profundiza.png";

export default function Quiz() {
  // PASO 1: INICIO (Montaje y Estados)
  // Aquí definimos los "contenedores" donde React guardará la información que cambia
  const navigate = useNavigate();
  // estado respuestas: guarda {id_pregunta: valor}
  const [respuestas, setRespuestas] = useState({});
  // estado pregunta actual: índice de la pregunta que se muestra
  const [preguntaActual, setPreguntaActual] = useState(0);
  // estado preguntas api: lista de preguntas cargadas desde el backend
  const [preguntas, setPreguntas] = useState([]);

  // estados de carga, sesión y envío
  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const totalPreguntas = preguntas.length;

  // PASO 2: ALGORITMO DE CARGA (Se ejecuta una sola vez al montar el componente)
  useEffect(() => {
    const initializeQuiz = async () => {
      try {
        // 2.1. Solicitud al servidor: obtenemos todas las preguntas de la BD
        const questionsRes = await api.get("/preguntas");

        // 2.2. Filtrado: solo nos quedamos con las que están marcadas como "activa"
        let preguntasActivas = questionsRes.data.filter(
          (p) => p.estado === "activa",
        );

        // 2.3. Aleatorización (Algoritmo Fisher-Yates): para que el orden sea sorpresa
        for (let i = preguntasActivas.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [preguntasActivas[i], preguntasActivas[j]] = [
            preguntasActivas[j],
            preguntasActivas[i],
          ];
        }
        setPreguntas(preguntasActivas);

        // 2.4. Identificación: verificamos si hay un usuario logueado en el navegador
        const storedUser = localStorage.getItem("user");
        let userId = null;
        if (storedUser) {
          try {
            const user = JSON.parse(storedUser);
            userId = user.id;
          } catch (e) {
            console.error("Error al leer usuario de localStorage:", e);
          }
        }

        // 2.5. Inicio de sesión: avisamos a la API que comienza un nuevo quiz
        const startRes = await api.post("/quiz/start", { usuario_id: userId });
        setSessionId(startRes.data.session_id);
      } catch (error) {
        console.error("Error inicializando quiz:", error);
        // manejar error
      } finally {
        setLoading(false);
      }
    };

    initializeQuiz();
  }, []);

  // PASO 3: BUCLE DE INTERACCIÓN (El usuario responde y navega)
  // Maneja el cambio de una respuesta específica
  const handleRespuestaChange = (id, valor) => {
    // Patrón de inmutabilidad: creamos una copia del estado previo y añadimos la nueva respuesta
    setRespuestas((prev) => ({
      ...prev,
      [id]: valor,
    }));

    // auto-avance opcional (desactivado)
    // setTimeout(() => siguientePregunta(), 300);
  };

  const pregunta = preguntas[preguntaActual];

  // navegacion
  const siguientePregunta = () => {
    if (preguntaActual < totalPreguntas - 1) {
      setPreguntaActual(preguntaActual + 1);
    } else {
      // ultima pregunta finaliza
    }
  };

  const anteriorPregunta = () => {
    if (preguntaActual > 0) {
      setPreguntaActual(preguntaActual - 1);
    }
  };

  // PASO 4: ALGORITMO DE FINALIZACIÓN
  const handleFinalizar = async () => {
    if (!sessionId) return;
    setSubmitting(true);

    try {
      // 4.1. Transformación: Convertimos el objeto de respuestas en una lista (Payload) para la API
      const answersPayload = Object.entries(respuestas).map(([pId, val]) => ({
        pregunta_id: parseInt(pId),
        valor: parseInt(val),
      }));

      // 4.2. Envío: Guardamos todas las respuestas en el servidor
      await api.post("/quiz/answers", {
        session_id: sessionId,
        answers: answersPayload,
      });

      // 4.3. Obtención del resultado: Pedimos el token generado por el backend
      const sessionRes = await api.get(`/quiz/session/${sessionId}`);
      const token = sessionRes.data.token;

      // 4.4. Redirección: Navegamos a la pantalla de resultados con el token
      navigate(`/resultado/${token || sessionId}`);
    } catch (error) {
      console.error("Error guardando respuestas:", error);
      alert("Hubo un error al guardar tus resultados. Intenta nuevamente.");
    } finally {
      setSubmitting(false);
    }
  };

  // calcular progreso
  // PASO 5: RENDERIZADO DINÁMICO (La Interfaz reacciona al Estado)
  // 5.1. Cálculos derivados: React recalcula estos valores cada vez que el estado cambia
  const progreso =
    totalPreguntas > 0 ? ((preguntaActual + 1) / totalPreguntas) * 100 : 0;
  const preguntasRespondidas = Object.keys(respuestas).length;

  // 5.2. Validación en tiempo real: ¿Ya respondió la pregunta actual?
  const currentAnswered = pregunta && respuestas[pregunta.id] !== undefined;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Hero
        title="Quiz Electoral"
        description="Descubre qué candidato o propuesta se alinea más con tus valores políticos"
      />

      {/* seccion como funciona */}
      <section className="py-10 md:py-12 px-4 md:px-6 bg-blanco">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8 md:mb-10 text-blue">
            Cómo funciona
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mb-10 md:mb-8">
            <div className="flex justify-center">
              <img
                src={Responde}
                alt="¿Qué piensas realmente?"
                className="w-[200px] md:w-[200px] aspect-square object-cover"
              />
            </div>
            <div className="max-w-md text-center md:text-left">
              <h3 className="text-2xl font-bold text-negro mb-3">
                ¿Qué piensas realmente?
              </h3>
              <p className="text-base md:text-lg text-muted leading-relaxed">
                Responde a 60 afirmaciones clave sobre sociedad, economía y
                valores
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mb-10 md:mb-8">
            <div className="max-w-md text-center md:text-right order-2 md:order-1">
              <h3 className="text-2xl font-bold text-negro mb-3">
                Recibe tu análisis al instante
              </h3>
              <p className="text-base md:text-lg text-muted leading-relaxed">
                Te mostramos tu ranking de sintonía con los partidos, para que
                lo veas claro
              </p>
            </div>
            <div className="flex justify-center order-1 md:order-2">
              <img
                src={Analiza}
                alt="Tu voto, informado"
                className="w-[200px] md:w-[200px] aspect-square object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
            <div className="flex justify-center">
              <img
                src={Profundiza}
                alt="Tu voto, informado"
                className="w-[200px] md:w-[200px] aspect-square object-cover"
              />
            </div>
            <div className="max-w-md text-center md:text-left">
              <h3 className="text-2xl font-bold text-negro mb-3">
                Tu voto, informado
              </h3>
              <p className="text-base md:text-lg text-muted leading-relaxed">
                Descubre qué propuestas políticas se alinean más con tus valores
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* seccion quiz */}
      <section
        className="py-8 md:py-12 px-4 md:px-6 scroll-snap-y-proximity"
        style={{ scrollSnapType: "y proximity" }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8 md:mb-10 text-blue">
            Responde el Quiz
          </h2>

          {/* PASO 5.3: Renderizado Condicional - Si está cargando muestra el spinner, si no, el quiz */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
              <p className="text-gray-500 animate-pulse">
                Preparando tu cuestionario...
              </p>
            </div>
          ) : (
            <>
              {/* PASO 5.4: Barra de Progreso Dinámica - Usa el cálculo del punto 5.1 */}
              <div className="mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                      Pregunta {preguntaActual + 1} de {totalPreguntas}
                    </span>
                    <h2 className="text-xl font-bold text-gray-800">
                      Tu opinión importa
                    </h2>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-[var(--color-red)]">
                      {Math.round(progreso)}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-[var(--color-red)] h-3 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progreso}%` }}
                  ></div>
                </div>
              </div>

              {/* PASO 5.5: Inyección de datos - Pasamos la pregunta actual al componente hijo */}
              {pregunta && (
                <div className="animate-in fade-in zoom-in-95 duration-300">
                  <Pregunta
                    id={pregunta.id}
                    texto={pregunta.texto}
                    categoria={pregunta.categoria}
                    value={respuestas[pregunta.id]}
                    onChange={handleRespuestaChange}
                    showFuente={false}
                  />
                </div>
              )}

              {/* navegacion */}
              <div className="mt-8 flex justify-between items-center gap-4">
                <button
                  onClick={anteriorPregunta}
                  disabled={preguntaActual === 0}
                  className={`btn btn-ghost gap-2 ${preguntaActual === 0 ? "invisible" : ""}`}
                >
                  ← Anterior
                </button>

                <div className="flex gap-2">
                  {preguntaActual < totalPreguntas - 1 ? (
                    <button
                      onClick={siguientePregunta}
                      disabled={!currentAnswered}
                      className={`btn px-8 shadow-lg transition-all ${
                        currentAnswered
                          ? "bg-[var(--color-red)] text-white border-none transform hover:scale-105 hover:bg-[var(--color-red)] hover:opacity-90"
                          : "btn-disabled bg-gray-200 text-gray-400"
                      }`}
                    >
                      Siguiente
                    </button>
                  ) : (
                    <button
                      onClick={handleFinalizar}
                      disabled={
                        submitting || preguntasRespondidas < totalPreguntas
                      }
                      className={`btn px-8 shadow-lg gap-2 text-white border-none ${
                        !submitting && preguntasRespondidas === totalPreguntas
                          ? "bg-[var(--color-red)] hover:bg-[var(--color-red)] hover:opacity-90"
                          : ""
                      } ${submitting ? "loading" : ""}`}
                    >
                      Finalizar y Ver Resultados
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
