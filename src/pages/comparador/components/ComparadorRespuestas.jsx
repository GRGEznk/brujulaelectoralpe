import React from "react";
import { Compass } from "lucide-react";

const ComparadorRespuestas = ({
  partidosSeleccionados,
  preguntas,
  respuestas,
  categoriaSeleccionada,
}) => {
  // Agrupar preguntas por categoría
  const preguntasPorCategoria = preguntas.reduce((acc, pregunta) => {
    const { categoria } = pregunta;
    if (!acc[categoria]) acc[categoria] = [];
    acc[categoria].push(pregunta);
    return acc;
  }, {});

  const categorias = Object.keys(preguntasPorCategoria);

  // Filtrar categorías si hay una seleccionada
  const categoriasAMostrar = categoriaSeleccionada
    ? [categoriaSeleccionada].filter((c) => preguntasPorCategoria[c])
    : categorias;

  const getValorTexto = (valor) => {
    switch (valor) {
      case 2:
        return "Muy de acuerdo";
      case 1:
        return "De acuerdo";
      case 0:
        return "Neutro";
      case -1:
        return "En desacuerdo";
      case -2:
        return "Muy en desacuerdo";
      default:
        return "Sin respuesta";
    }
  };

  return (
    <div className="w-full flex flex-col gap-12 mt-10">
      {categoriasAMostrar.map((categoria) => (
        <div key={categoria} className="flex flex-col gap-8">
          {/* Solo mostramos el título si hay más de una categoría o ninguna seleccionada */}
          {!categoriaSeleccionada && (
            <h2 className="text-3xl font-bold text-center text-[var(--color-negro)] mb-4">
              {categoria}
            </h2>
          )}

          {preguntasPorCategoria[categoria].map((pregunta) => (
            <div key={pregunta.id} className="flex flex-col gap-8 mb-16">
              {/* Título de la Pregunta */}
              <div className="text-center max-w-4xl mx-auto px-4">
                <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-negro)] mb-6 leading-tight">
                  {pregunta.texto}
                </h3>
                {pregunta.descripcion && (
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    {pregunta.descripcion}
                  </p>
                )}
              </div>

              {/* Comparativa de Candidatos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 px-4 md:px-10">
                {partidosSeleccionados.map((partido, index) => {
                  if (!partido) {
                    return (
                      <div
                        key={`empty-${index}`}
                        className="flex flex-col gap-6 opacity-30 select-none"
                      >
                        <div className="flex items-center gap-5">
                          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-dashed border-gray-300 flex-shrink-0 bg-gray-50" />
                          <div className="flex flex-col">
                            <span className="h-6 w-48 bg-gray-200 rounded-lg animate-pulse mb-2" />
                            <span className="h-4 w-32 bg-gray-100 rounded-lg animate-pulse" />
                          </div>
                        </div>
                        <div className="h-20 w-full bg-gray-50 rounded-xl animate-pulse" />
                      </div>
                    );
                  }

                  const respuestasPartido = respuestas[partido.id] || [];
                  const respuesta = respuestasPartido.find(
                    (r) => r.pregunta_id === pregunta.id,
                  );

                  return (
                    <div key={partido.id} className="flex flex-col gap-6">
                      {/* Cabecera: Foto + Info */}
                      <div className="flex items-center gap-5">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0 bg-gray-100">
                          <img
                            src={`/candidatos/${partido.sigla.toUpperCase()}.png`}
                            alt={partido.nombre}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = "/candidatos/default.png";
                            }}
                          />
                        </div>
                        <div className="flex flex-col uppercase tracking-wider">
                          <span className="text-xl md:text-2xl font-black text-[var(--color-negro)] leading-none mb-1">
                            {partido.partido_metadata?.candidato_presidencial ||
                              "Candidato"}
                          </span>
                          <span className="text-sm md:text-base font-bold text-gray-500">
                            {partido.nombre}
                          </span>
                        </div>
                      </div>

                      {/* Respuesta del Candidato */}
                      <div className="text-lg md:text-xl leading-relaxed text-gray-700">
                        {respuesta ? (
                          <p>
                            <span className="font-black text-[var(--color-negro)]">
                              {getValorTexto(respuesta.valor)}
                            </span>
                            {respuesta.fuente && (
                              <span className="font-medium">
                                {" | "}
                                {respuesta.fuente}
                              </span>
                            )}
                          </p>
                        ) : (
                          <p className="text-gray-400 italic font-medium">
                            Información no proporcionada
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Separador con Brújula */}
              <div className="relative mt-12 px-4">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t-2 border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <div className="bg-white px-4">
                    <div className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center bg-white text-gray-400 rotate-45">
                      <Compass size={28} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ComparadorRespuestas;
