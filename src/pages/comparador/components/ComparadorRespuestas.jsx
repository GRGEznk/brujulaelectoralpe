import React from "react";

const ComparadorRespuestas = ({
  partidosSeleccionados,
  preguntas,
  respuestas,
}) => {
  // 1. Agrupar las preguntas por categoría
  const preguntasPorCategoria = preguntas.reduce((acc, pregunta) => {
    const { categoria } = pregunta;
    if (!acc[categoria]) {
      acc[categoria] = [];
    }
    acc[categoria].push(pregunta);
    return acc;
  }, {});

  // 2. Obtener las categorías únicas
  const categorias = Object.keys(preguntasPorCategoria);

  return (
    <div className="w-full flex flex-col gap-10">
      {categorias.map((categoria) => (
        <div
          key={categoria}
          className="bg-[var(--color-fondos)] p-5 md:p-10 rounded-[20px] md:rounded-[40px] shadow-[5px_5px_10px_var(--muted),-5px_-5px_10px_white] md:shadow-[10px_10px_20px_var(--muted),-10px_-10px_20px_white]"
        >
          <h3 className="text-xl md:text-2xl font-bold mb-8 text-[var(--color-negro)] border-b-2 border-[var(--color-bordes)] pb-2 inline-block">
            {categoria}
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-[var(--color-bordes)]">
                  <th className="text-left p-4 w-[30%] font-semibold text-[var(--color-muted)]">
                    Pregunta
                  </th>
                  {partidosSeleccionados.map((partido) => (
                    <th key={partido.id} className="text-left p-4 w-[35%]">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-[var(--color-bordes)] bg-white flex items-center justify-center p-1">
                          <img
                            src={`/logos/${partido.sigla.toLowerCase()}.png`}
                            alt={partido.nombre}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.target.src = "/logos/default.png";
                            }}
                          />
                        </div>
                        <span className="font-bold text-[var(--color-negro)]">
                          {partido.nombre}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preguntasPorCategoria[categoria].map((pregunta) => (
                  <tr
                    key={pregunta.id}
                    className="border-b border-[var(--color-bordes)] hover:bg-[var(--hover)] transition-colors"
                  >
                    <td className="p-4 align-top font-medium text-[var(--color-negro)] leading-snug">
                      {pregunta.texto}
                    </td>
                    {partidosSeleccionados.map((partido) => {
                      const respuestasPartido = respuestas[partido.id] || [];
                      const respuesta = respuestasPartido.find(
                        (r) => r.pregunta_id === pregunta.id,
                      );

                      return (
                        <td
                          key={`${pregunta.id}-${partido.id}`}
                          className="p-4 align-top text-sm leading-relaxed text-[var(--color-negro)]"
                        >
                          {respuesta?.fuente ? (
                            <div className="bg-white p-3 rounded-xl border border-[var(--color-bordes)] shadow-sm whitespace-pre-wrap">
                              {respuesta.fuente}
                            </div>
                          ) : (
                            <span className="text-[var(--color-muted)] italic">
                              Información no proporcionada
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComparadorRespuestas;
