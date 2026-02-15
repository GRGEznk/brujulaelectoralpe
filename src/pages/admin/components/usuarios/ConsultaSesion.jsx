import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
} from "lucide-react";
import api from "../../../../api/api";

export default function ConsultaSesion() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    completado: "",
    fechaInicio: "",
    fechaFin: "",
    usuarioType: "todos", // todos, registrado, invitado
  });

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchSessions();
  }, [filters]);

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.completado !== "")
        params.append("completado", filters.completado);
      if (filters.fechaInicio)
        params.append("fecha_inicio", filters.fechaInicio);
      if (filters.fechaFin) params.append("fecha_fin", filters.fechaFin);

      if (filters.usuarioType === "invitado") {
        params.append("usuario_id", "null");
      }

      const response = await api.get(`/quiz/sessions?${params.toString()}`);

      // Filtro local adicional para "registrado" si es necesario,
      // aunque el backend podría manejarlo mejor. Por ahora filtramos localmente
      // la respuesta si es "registrado" para simplificar el backend.
      let data = response.data;
      if (filters.usuarioType === "registrado") {
        data = data.filter((s) => s.usuario_id !== null);
      }

      setSessions(data);
    } catch (error) {
      console.error("Error al cargar sesiones:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSessions = sessions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sessions.length / itemsPerPage);

  if (loading && sessions.length === 0) {
    return (
      <div className="p-10 text-center">
        <span className="loading loading-spinner loading-lg text-red"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-argentum">
      {/* Bloque 1: Filtros */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-xl font-bold text-negro mb-4 flex items-center gap-2">
          <Filter size={20} className="text-red" />
          Filtros de Sesiones
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-negro">
                Estado
              </span>
            </label>
            <select
              name="completado"
              value={filters.completado}
              onChange={handleFilterChange}
              className="select select-bordered w-full"
            >
              <option value="">Todos los estados</option>
              <option value="1">Completo</option>
              <option value="0">Incompleto</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-negro">
                Usuario
              </span>
            </label>
            <select
              name="usuarioType"
              value={filters.usuarioType}
              onChange={handleFilterChange}
              className="select select-bordered w-full"
            >
              <option value="todos">Todos</option>
              <option value="registrado">Registrados</option>
              <option value="invitado">Invitados</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-negro">
                Fecha Desde
              </span>
            </label>
            <input
              type="date"
              name="fechaInicio"
              value={filters.fechaInicio}
              onChange={handleFilterChange}
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-negro">
                Fecha Hasta
              </span>
            </label>
            <input
              type="date"
              name="fechaFin"
              value={filters.fechaFin}
              onChange={handleFilterChange}
              className="input input-bordered w-full"
            />
          </div>
        </div>
      </div>

      {/* Bloque 2: Tabla */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-negro">
            Historial de Sesiones ({sessions.length})
          </h2>
          {loading && (
            <span className="loading loading-spinner loading-sm text-red"></span>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-50 text-negro">
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th className="text-center">X (Económico)</th>
                <th className="text-center">Y (Social)</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentSessions.length > 0 ? (
                currentSessions.map((session) => (
                  <tr key={session.id} className="hover">
                    <td className="font-mono text-sm text-muted">
                      #{session.id}
                    </td>
                    <td>
                      <div className="flex flex-col">
                        <span className="font-semibold">
                          {session.usuario_id
                            ? session.usuario_nombre || "Usuario"
                            : "Invitado"}
                        </span>
                        {session.usuario_email && (
                          <span className="text-xs text-muted">
                            {session.usuario_email}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="text-center">
                      {session.resultado_x !== null ? (
                        <span
                          className={`font-mono font-bold ${session.resultado_x > 0 ? "text-blue-600" : "text-red-600"}`}
                        >
                          {Number(session.resultado_x).toFixed(2)}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="text-center">
                      {session.resultado_y !== null ? (
                        <span
                          className={`font-mono font-bold ${session.resultado_y > 0 ? "text-green-600" : "text-purple-600"}`}
                        >
                          {Number(session.resultado_y).toFixed(2)}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>
                      {session.completado ? (
                        <div className="badge badge-success gap-1 text-white py-3 px-4">
                          <CheckCircle2 size={14} /> Completo
                        </div>
                      ) : (
                        <div className="badge badge-warning gap-1 text-white py-3 px-4">
                          <Clock size={14} /> Incompleto
                        </div>
                      )}
                    </td>
                    <td className="text-sm text-muted">
                      {new Date(session.fecha).toLocaleString()}
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-ghost btn-xs text-red hover:bg-red-50"
                        title="Ver Detalles"
                        onClick={() => alert("Función en desarrollo")}
                      >
                        Ver
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-muted">
                    No se encontraron sesiones.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`btn btn-sm ${currentPage === i + 1 ? "text-white border-none" : "btn-ghost"}`}
                style={
                  currentPage === i + 1 ? { backgroundColor: "#be1717" } : {}
                }
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
