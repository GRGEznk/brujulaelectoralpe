import { useState, useEffect } from "react";
import { Search, Edit2, Trash2, Filter, FileText } from "lucide-react";
import api from "../../../../api/api";

export default function ConsultaPartidos({ onEdit }) {
  const [partidos, setPartidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    nombre: "",
  });

  // Cargar partidos desde la API
  useEffect(() => {
    const fetchPartidos = async () => {
      try {
        const response = await api.get("/partidos");
        setPartidos(response.data);
      } catch (error) {
        console.error("Error al cargar partidos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartidos();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredPartidos = partidos.filter(
    (p) =>
      p.nombre?.toLowerCase().includes(filters.nombre.toLowerCase()) ||
      p.nombre_largo?.toLowerCase().includes(filters.nombre.toLowerCase()) ||
      (p.sigla && p.sigla.toLowerCase().includes(filters.nombre.toLowerCase())),
  );

  if (loading) {
    return (
      <div className="p-10 text-center">
        <span className="loading loading-spinner loading-lg text-blue"></span>
      </div>
    );
  }

  const handleDelete = async (id, nombre) => {
    if (window.confirm(`¿Estás seguro de eliminar el partido: "${nombre}"?`)) {
      try {
        await api.delete(`/partidos/${id}`);
        setPartidos((prev) => prev.filter((p) => p.id !== id));
      } catch (error) {
        console.error("Error al eliminar partido:", error);
        alert("Error al eliminar el partido");
      }
    }
  };

  return (
    <div className="space-y-6 font-argentum">
      {/* Filtros */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-xl font-bold text-negro mb-4 flex items-center gap-2">
          <Filter size={20} className="text-blue" />
          Filtros de Búsqueda
        </h2>
        <div className="max-w-md">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-negro">
                Nombre o Sigla
              </span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="nombre"
                value={filters.nombre}
                onChange={handleFilterChange}
                placeholder="Ej: Avanza Pais"
                className="input input-bordered w-full pl-10"
              />
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-negro">
            Partidos Políticos
            <span className="ml-2 text-sm font-normal text-muted">
              ({filteredPartidos.length})
            </span>
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-50 text-negro text-xs uppercase tracking-wider">
              <tr>
                <th className="w-16 text-center">Logo</th>
                <th>Sigla</th>
                <th>Nombre</th>
                <th>Presidencial</th>
                <th>Líder</th>
                <th className="text-center">Fund.</th>
                <th className="text-center">Inscrip.</th>
                <th className="text-center">Plan</th>
                <th className="text-center w-32">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPartidos.length > 0 ? (
                filteredPartidos.map((p) => {
                  const meta =
                    p.partido_metadata?.[0] || p.partido_metadata || {};
                  const sigla = p.sigla || "";

                  return (
                    <tr
                      key={p.id}
                      className="hover:bg-gray-50 transition-colors group"
                    >
                      {/* Columna Logo */}
                      <td className="align-middle p-2">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white border border-gray-100 shadow-sm p-1 flex items-center justify-center mx-auto">
                          {sigla ? (
                            <img
                              src={`/logos/${sigla.toUpperCase()}.png`}
                              alt={sigla}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                e.target.src = "/brujula.ico";
                                e.target.className = "w-6 opacity-20 grayscale";
                              }}
                            />
                          ) : (
                            <span className="text-[10px] font-bold text-gray-300">
                              N/A
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Columna Sigla */}
                      <td className="align-middle">
                        <span
                          className="px-2 py-1 rounded text-white font-bold text-xs"
                          style={{
                            backgroundColor: meta.color_primario || "#000000",
                          }}
                        >
                          {sigla}
                        </span>
                      </td>

                      {/* Columna Nombre */}
                      <td className="align-middle">
                        <div className="flex flex-col">
                          <span className="font-bold text-negro text-sm">
                            {p.nombre}
                          </span>
                          <span className="text-[10px] text-muted truncate max-w-[150px]">
                            {p.nombre_largo}
                          </span>
                        </div>
                      </td>

                      {/* Columna Candidato */}
                      <td className="align-middle">
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="w-8 h-8 rounded-full ring-1 ring-gray-100 overflow-hidden bg-gray-50 flex items-center justify-center">
                              {sigla ? (
                                <img
                                  src={`/candidatos/${sigla.toUpperCase()}.png`}
                                  alt="Candidato"
                                  className="object-cover w-full h-full"
                                  onError={(e) => {
                                    e.target.style.display = "none";
                                  }}
                                />
                              ) : null}
                            </div>
                          </div>
                          <div className="font-semibold text-sm text-gray-700">
                            {meta.candidato_presidencial || (
                              <span className="text-gray-400 italic text-xs">
                                No definido
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Columna Líder */}
                      <td className="align-middle">
                        <span className="text-sm text-gray-700">
                          {meta.lider_partido || (
                            <span className="text-gray-400 italic text-xs">
                              N/A
                            </span>
                          )}
                        </span>
                      </td>

                      {/* Columna Año Fundación */}
                      <td className="align-middle text-center">
                        <span className="text-sm text-gray-700">
                          {meta.anio_fundacion || "-"}
                        </span>
                      </td>

                      {/* Columna Año Inscripción */}
                      <td className="align-middle text-center">
                        <span className="text-sm text-gray-700">
                          {meta.anio_inscripcion_jne || "-"}
                        </span>
                      </td>

                      {/* Columna Plan de Gobierno */}
                      <td className="align-middle text-center">
                        {meta.plan_gobierno ? (
                          <a
                            href={meta.plan_gobierno}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-ghost btn-xs text-blue hover:bg-blue-50"
                            title="Ver Plan de Gobierno"
                          >
                            <FileText size={16} />
                          </a>
                        ) : (
                          <span className="text-gray-300">
                            <FileText size={16} className="opacity-30" />
                          </span>
                        )}
                      </td>

                      <td className="align-middle">
                        <div className="flex justify-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => onEdit(p)}
                            className="btn btn-ghost btn-sm text-blue hover:bg-blue-50"
                            title="Editar"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id, p.nombre)}
                            className="btn btn-ghost btn-sm text-red hover:bg-red-50"
                            title="Eliminar"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-12 text-muted italic"
                  >
                    No se encontraron partidos registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
