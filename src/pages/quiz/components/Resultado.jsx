import React, { useState, useEffect } from "react";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import api from "../../../api/api";
import { MoveRight, RefreshCw, AlertCircle, Save } from "lucide-react";
import AuthModal from "../../../components/AuthModal";

export default function Resultado() {
  const [searchParams] = useSearchParams();
  const { slug } = useParams();
  const navigate = useNavigate();
  const sessionId = slug || searchParams.get("session_id");

  const [results, setResults] = useState([]);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [linking, setLinking] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const fetchData = async () => {
      if (!sessionId) {
        setError("No se proporcionó un ID de sesión válido.");
        setLoading(false);
        return;
      }

      try {
        // 1. Obtener afinidades
        const matchesRes = await api.get(`/quiz/session/${sessionId}/matches`);
        setResults(matchesRes.data);

        // 2. Obtener datos de la sesión para ver si es invitado
        const sessionRes = await api.get(`/quiz/session/${sessionId}`);
        const sessionData = sessionRes.data;
        setSession(sessionData);

        // 3. Si el usuario está logueado y la sesión es anónima, vincular automáticamente
        if (user && sessionData.usuario_id === null && !linking) {
          setLinking(true);
          try {
            await api.post("/quiz/link-session", {
              session_id: sessionId,
              usuario_id: user.id,
            });
            // Actualizar estado local de la sesión
            setSession((prev) => ({ ...prev, usuario_id: user.id }));
          } catch (linkErr) {
            console.error("Error vinculando sesión:", linkErr);
          } finally {
            setLinking(false);
          }
        }
      } catch (err) {
        console.error("Error al obtener resultados:", err);
        setError(
          "Hubo un problema al cargar tus resultados. Asegúrate de haber completado el quiz.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <span className="loading loading-spinner loading-lg text-red-600 mb-4"></span>
        <p className="text-gray-500 font-medium animate-pulse">
          Calculando tu afinidad política...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
        <div className="bg-red-50 p-6 rounded-2xl border border-red-100 text-center max-w-md">
          <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            ¡Ups! Algo salió mal
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => (window.location.href = "/quiz")}
            className="btn bg-[var(--color-red)] text-white border-none rounded-full px-8"
          >
            Volver al Quiz
          </button>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
        <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100 text-center max-w-md">
          <AlertCircle className="mx-auto text-yellow-500 mb-4" size={48} />
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Resultados no encontrados
          </h2>
          <p className="text-gray-600 mb-6">
            No pudimos encontrar resultados para esta sesión. Asegúrate de haber
            completado todas las preguntas.
          </p>
          <button
            onClick={() => (window.location.href = "/quiz")}
            className="btn bg-[var(--color-red)] text-white border-none rounded-full px-8"
          >
            Volver al Quiz
          </button>
        </div>
      </div>
    );
  }

  const topMatch = results[0];
  const otherMatches = results.slice(1);

  // obtener assets ganador (usamos la carpeta public con la convención de siglas)
  const topLogo = `/logos/${topMatch.sigla.toUpperCase()}.png`;
  const topCandidato = `/candidatos/${topMatch.sigla.toUpperCase()}.png`;

  const isGuest = session && session.usuario_id === null && !user;

  return (
    <div className="min-h-screen bg-white font-sans pb-20">
      <main className="max-w-4xl mx-auto px-4 md:px-6 pt-8 md:pt-12">
        {/* Notificación de guardado exitoso (si acaba de vincular) */}
        {!isGuest && session?.usuario_id && !loading && (
          <div className="mb-6 text-center">
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100 italic">
              ✓ Resultado guardado en tu cuenta
            </span>
          </div>
        )}

        {/* intro */}
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-block py-1 px-3 rounded-full bg-red-50 text-[var(--color-red)] text-xs font-bold tracking-wider uppercase mb-3">
            Resultados del Análisis
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Tu afinidad política es
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Basado en tus respuestas, hemos calculado la distancia ideológica
            con cada agrupación.
          </p>
        </div>

        {/* hero ganador */}
        <section className="bg-[var(--color-cards)] rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden shadow-sm border border-gray-100 mx-4 md:mx-0">
          {/* decoracion fondo */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-100 to-transparent rounded-bl-full opacity-50 -mr-20 -mt-20"></div>

          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 relative z-10">
            {/* lado imagen */}
            <div className="relative group">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-8 border-white shadow-xl relative z-10">
                <img
                  src={topCandidato}
                  alt={topMatch.candidato_presidencial}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/candidatos/default.png"; // Placeholder si no existe la foto
                  }}
                />
              </div>
              {/* badge partido flotante */}
              <div className="absolute -bottom-4 -right-4 w-20 h-20 md:w-24 md:h-24 bg-white rounded-full p-2 shadow-lg flex items-center justify-center z-20 animate-bounce-slow">
                <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center p-1">
                  <img
                    src={topLogo}
                    alt={topMatch.nombre}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/logos/default.png"; // Placeholder si no existe el logo
                    }}
                  />
                </div>
              </div>
            </div>

            {/* lado datos */}
            <div className="text-center md:text-left flex-1">
              <div className="mb-2 text-gray-400 font-medium tracking-wide">
                TU MEJOR COINCIDENCIA
              </div>
              <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
                {topMatch.nombre}
              </h3>
              <p className="text-gray-500 font-medium">
                {topMatch.candidato_presidencial}
              </p>

              <div className="flex flex-col md:flex-row items-center gap-6 mt-6">
                <div className="flex items-end gap-2">
                  <span className="text-4xl md:text-5xl font-black text-[var(--color-red)]">
                    {topMatch.match_percentage}%
                  </span>
                  <span className="text-gray-500 font-medium mb-1">
                    de afinidad
                  </span>
                </div>
                <div className="h-12 w-px bg-gray-300 hidden md:block"></div>
                <p className="text-sm text-gray-500 md:max-w-xs text-left">
                  Tus valores y visiones coinciden significativamente con los
                  planteamientos de esta agrupación.
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button
                  onClick={() => navigate(`/portal/${topMatch.sigla}`)}
                  className="btn bg-[var(--color-red)] hover:bg-red-700 text-white border-none rounded-full px-8 shadow-lg shadow-red-200"
                >
                  Ver detalles
                </button>
                <button className="btn btn-outline text-gray-600 hover:bg-gray-50 border-gray-300 rounded-full px-8">
                  Comparar propuestas
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Alerta para invitados */}
        {isGuest && (
          <div className="mb-8 p-4 bg-blue-50 border border-blue-100 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-full text-white">
                <Save size={20} />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-blue-900 leading-none">
                  ¿Deseas guardar tu resultado?
                </h4>
                <p className="text-sm text-blue-700 mt-1">
                  Regístrate o inicia sesión para vincularlo a tu historial.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowAuthModal(true)}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-colors whitespace-nowrap shadow-md shadow-blue-200"
            >
              Iniciar Sesión / Registrarse
            </button>
          </div>
        )}

        {/* lista ranking */}
        <section className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 px-4 flex items-center gap-3">
            <span className="bg-gray-900 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
              2
            </span>
            El resto del tablero
          </h3>

          <div className="space-y-4 px-4 md:px-0">
            {otherMatches.map((item, index) => {
              const partyLogo = `/logos/${item.sigla.toUpperCase()}.png`;
              return (
                <div
                  key={item.id}
                  className="group bg-white rounded-2xl p-4 md:p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center gap-4 md:gap-6"
                >
                  <div className="font-bold text-gray-300 text-xl w-6 text-center">
                    #{index + 2}
                  </div>

                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-50 rounded-xl p-2 flex-shrink-0">
                    <img
                      src={partyLogo}
                      alt={item.nombre}
                      className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/logos/default.png";
                      }}
                    />
                  </div>

                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-base md:text-lg">
                      {item.nombre}
                    </h4>
                    <div className="w-full bg-gray-100 rounded-full h-2 mt-2 max-w-xs overflow-hidden">
                      <div
                        className="bg-gray-400 group-hover:bg-[var(--color-blue)] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${item.match_percentage}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xl md:text-2xl font-bold text-gray-900">
                      {item.match_percentage}%
                    </div>
                  </div>

                  <div className="hidden md:block">
                    <button
                      onClick={() => navigate(`/portal/${item.sigla}`)}
                      className="btn btn-circle btn-sm btn-ghost text-gray-400 group-hover:text-[var(--color-blue)]"
                    >
                      <MoveRight size={20} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => (window.location.href = "/quiz")}
              className="btn btn-ghost text-gray-500 gap-2"
            >
              <RefreshCw size={18} />
              Reiniciar Quiz
            </button>
          </div>
        </section>
      </main>

      {/* Modal de Autenticación */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
}
