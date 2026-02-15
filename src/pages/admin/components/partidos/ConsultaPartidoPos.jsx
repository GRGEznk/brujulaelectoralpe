import { useState, useEffect } from "react";
import { Filter, Search, RotateCcw } from "lucide-react";
import api from "../../../../api/api";

export default function ConsultaPartidoPos() {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await api.get("/posiciones-partidos");
        setPositions(response.data);
      } catch (error) {
        console.error("Error al cargar posiciones:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, []);

  // Helper to calculate position percentages
  // X: -100 to +100 -> 0% to 100% (Left to Right)
  const getLeftPercent = (x) => {
    const val = parseFloat(x);
    return ((val + 100) / 200) * 100;
  };

  // Y: -100 to +100 -> 0% to 100% (Bottom to Top)
  // We want CSS 'bottom' to be this value, or 'top' to be 100 - this
  const getBottomPercent = (y) => {
    const val = parseFloat(y);
    return ((val + 100) / 200) * 100;
  };

  if (loading) {
    return (
      <div className="p-10 text-center">
        <span className="loading loading-spinner loading-lg text-blue"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-argentum">
      {/* Bloque 1: Matriz Electoral */}
      <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center transition-all duration-300 hover:shadow-xl">
        <div className="w-full mb-8">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-gradient-to-b from-[#1D3557] to-[#E63946] rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">
              Matriz Electoral
            </h2>
          </div>
          <p className="text-gray-600 mt-2 text-sm">
            Ubicación ideológica de los partidos políticos
          </p>
        </div>

        {/* Quadrant Chart Container */}
        <div className="relative w-full max-w-[640px] aspect-square bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden border border-gray-300 shadow-inner p-16">
          {/* Subtle Gradient Background */}
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-50/30 to-red-50/30"></div>

          {/* Enhanced Grid with radial effect */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            {/* Radial lines */}
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at center, transparent 30%, rgba(156, 163, 175, 0.1) 100%)`,
              }}
            ></div>

            {/* 10x10 Grid with stronger center */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                    linear-gradient(to right, rgba(156, 163, 175, 0.3) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(156, 163, 175, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: "10% 10%",
                backgroundPosition: "center",
              }}
            ></div>
          </div>

          {/* Axis Lines with gradient */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            {/* Vertical Axis with gradient */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2">
              <div className="h-full w-full bg-gradient-to-b from-[#1D3557]/80 via-[#1D3557] to-[#1D3557]/80"></div>
            </div>

            {/* Horizontal Axis with gradient */}
            <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2">
              <div className="h-full w-full bg-gradient-to-r from-[#E63946]/80 via-[#E63946] to-[#E63946]/80"></div>
            </div>

            {/* Axis intersection point */}
            <div className="absolute left-1/2 top-1/2 w-4 h-4 bg-white border-2 border-gray-800 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          {/* Elegant Labels with icons */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            {/* Top: Conservadurismo */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="w-8 h-[2px] bg-[#1D3557] mb-1"></div>
              <span className="text-sm font-semibold text-[#1D3557] bg-white/90 px-3 py-1.5 rounded-full shadow-sm border border-gray-200">
                Conservadurismo
              </span>
            </div>

            {/* Bottom: Liberalismo */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <span className="text-sm font-semibold text-[#1D3557] bg-white/90 px-3 py-1.5 rounded-full shadow-sm border border-gray-200 mb-1">
                Liberalismo
              </span>
              <div className="w-8 h-[2px] bg-[#1D3557]"></div>
            </div>

            {/* Left: Izquierda */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="h-8 w-[2px] bg-[#E63946] mb-1"></div>
              <span className="text-sm font-semibold text-[#E63946] bg-white/90 px-3 py-1.5 rounded-full shadow-sm border border-gray-200 -rotate-90 whitespace-nowrap">
                Izquierda
              </span>
            </div>

            {/* Right: Derecha */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center">
              <span className="text-sm font-semibold text-[#E63946] bg-white/90 px-3 py-1.5 rounded-full shadow-sm border border-gray-200 rotate-90 whitespace-nowrap">
                Derecha
              </span>
              <div className="h-8 w-[2px] bg-[#E63946] mt-1"></div>
            </div>
          </div>

          {/* Logos Container */}
          <div className="absolute inset-16">
            {positions.map((p) => {
              const partyName = p.nombre || "Partido";
              const logoSrc = p.sigla
                ? `/logos/${p.sigla.toUpperCase()}.png`
                : null;

              const xVal = parseFloat(p.posicion_x);
              const yVal = parseFloat(p.posicion_y);

              const x = isNaN(xVal) ? 0 : Math.max(-100, Math.min(100, xVal));
              const y = isNaN(yVal) ? 0 : Math.max(-100, Math.min(100, yVal));

              return (
                <div
                  key={p.id || Math.random()}
                  className="absolute w-11 h-11 md:w-14 md:h-14 transition-all duration-300 hover:scale-150 hover:z-30 group cursor-pointer"
                  style={{
                    left: `${getLeftPercent(x)}%`,
                    bottom: `${getBottomPercent(y)}%`,
                    transform: "translate(-50%, 50%)",
                  }}
                >
                  {/* Background Glow on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-red-100 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-sm scale-125"></div>

                  {/* Logo Container */}
                  <div className="relative w-full h-full bg-white rounded-full border-2 border-white shadow-lg overflow-hidden transition-transform duration-300 group-hover:shadow-xl">
                    {logoSrc ? (
                      <img
                        src={logoSrc}
                        alt={p.nombre}
                        className="w-full h-full object-cover p-1"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">
                          {p.sigla}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Elegant Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 hidden group-hover:block animate-fadeIn">
                    <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-xl whitespace-nowrap">
                      <div className="font-semibold">{p.nombre}</div>
                      <div className="text-gray-300 text-xs mt-0.5">
                        X: {Number(x).toFixed(1)} | Y: {Number(y).toFixed(1)}
                      </div>
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </div>
                  </div>

                  {/* Position Indicator Dot */}
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white border-2 border-gray-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              );
            })}
          </div>

          {/* Quadrant Labels */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-4 left-4 text-xs font-medium text-gray-500">
              Conservador
              <br />
              Izquierda
            </div>
            <div className="absolute top-4 right-4 text-xs font-medium text-gray-500 text-right">
              Conservador
              <br />
              Derecha
            </div>
            <div className="absolute bottom-4 left-4 text-xs font-medium text-gray-500">
              Liberal
              <br />
              Izquierda
            </div>
            <div className="absolute bottom-4 right-4 text-xs font-medium text-gray-500 text-right">
              Liberal
              <br />
              Derecha
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-500 to-blue-600"></div>
            <span className="text-gray-700">Eje Vertical: Social</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-red-500 to-red-600"></div>
            <span className="text-gray-700">Eje Horizontal: Económico</span>
          </div>
        </div>
      </div>

      {/* Bloque 2: Tabla de Datos */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-negro">
            Datos de Posicionamiento
            <span className="ml-2 text-sm font-normal text-muted">
              ({positions.length})
            </span>
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-50 text-negro">
              <tr>
                <th className="w-16">ID</th>
                <th>Nombre</th>
                <th className="text-center">Posición X</th>
                <th className="text-center">Posición Y</th>
                <th>Fecha Cálculo</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {positions.slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage,
              ).length > 0 ? (
                positions
                  .slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage,
                  )
                  .map((p) => (
                    <tr
                      key={p.id || Math.random()}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="text-sm font-mono text-muted align-middle">
                        #{p.id}
                      </td>
                      <td className="align-middle">
                        <div className="flex items-center gap-3 font-semibold text-negro">
                          <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-gray-50 rounded-full border border-gray-100 p-0.5">
                            {p.sigla ? (
                              <img
                                src={`/logos/${p.sigla.toUpperCase()}.png`}
                                alt=""
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                  e.target.nextSibling.style.display = "flex";
                                }}
                              />
                            ) : null}
                            <span
                              className="text-[10px] font-bold text-gray-400"
                              style={{ display: p.sigla ? "none" : "flex" }}
                            >
                              {p.sigla?.substring(0, 2) || "??"}
                            </span>
                          </div>
                          <span className="whitespace-nowrap">{p.nombre}</span>
                        </div>
                      </td>
                      <td className="text-center font-mono text-blue align-middle">
                        {p.posicion_x !== null
                          ? parseFloat(p.posicion_x).toFixed(2)
                          : "0.00"}
                      </td>
                      <td className="text-center font-mono text-blue align-middle">
                        {p.posicion_y !== null
                          ? parseFloat(p.posicion_y).toFixed(2)
                          : "0.00"}
                      </td>
                      <td className="text-sm text-muted align-middle whitespace-nowrap">
                        {p.fecha_calculo
                          ? new Date(p.fecha_calculo).toLocaleString()
                          : "---"}
                      </td>
                      <td className="align-middle">
                        <div className="flex justify-center gap-1">
                          <button
                            className="btn btn-ghost btn-sm text-blue hover:bg-blue-50"
                            title="Recalcular (Mock)"
                          >
                            <RotateCcw size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-12 text-muted italic"
                  >
                    No hay datos de posicionamiento disponibles.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4 border-t pt-4">
          <span className="text-sm text-gray-500">
            Mostrando{" "}
            {Math.min((currentPage - 1) * itemsPerPage + 1, positions.length)} a{" "}
            {Math.min(currentPage * itemsPerPage, positions.length)} de{" "}
            {positions.length} resultados
          </span>
          <div className="flex gap-2">
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <div className="join">
              {[...Array(Math.ceil(positions.length / itemsPerPage))].map(
                (_, i) => (
                  <button
                    key={i}
                    className={`join-item btn btn-sm ${currentPage === i + 1 ? "btn-active bg-red-600 text-white border-red-600 hover:bg-red-700" : "btn-ghost"}`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ),
              )}
            </div>
            <button
              className="btn btn-sm btn-ghost"
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(
                    prev + 1,
                    Math.ceil(positions.length / itemsPerPage),
                  ),
                )
              }
              disabled={
                currentPage === Math.ceil(positions.length / itemsPerPage)
              }
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
