import { useState, useEffect } from "react";
import { Edit, Trash2, Search, User } from "lucide-react";
import api from "../../../../api/api";

export default function ConsultaCandidato({ onEdit }) {
  const [candidatos, setCandidatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [partidos, setPartidos] = useState([]);
  const [regiones, setRegiones] = useState([]);
  const [filters, setFilters] = useState({
    nombre: "",
    cargo: "",
    id_partido: "",
    id_region: "",
  });

  useEffect(() => {
    fetchCandidatos();
    fetchPartidos();
    fetchRegiones();
  }, []);

  const fetchPartidos = async () => {
    try {
      const response = await api.get("/partidos");
      setPartidos(response.data);
    } catch (error) {
      console.error("Error al cargar partidos:", error);
    }
  };

  const fetchRegiones = async () => {
    try {
      const response = await api.get("/regiones");
      setRegiones(response.data);
    } catch (error) {
      console.error("Error al cargar regiones:", error);
    }
  };

  const fetchCandidatos = async () => {
    try {
      const response = await api.get("/candidatos");
      setCandidatos(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar candidatos:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este candidato?")) {
      try {
        await api.delete(`/candidatos/${id}`);
        fetchCandidatos();
      } catch (error) {
        console.error("Error al eliminar candidato:", error);
        alert("Error al eliminar candidato");
      }
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      nombre: "",
      cargo: "",
      id_partido: "",
      id_region: "",
    });
  };

  const filteredCandidatos = candidatos.filter((c) => {
    const searchStr = `${c.nombres} ${c.apellidos}`.toLowerCase();
    const matchesNombre = searchStr.includes(filters.nombre.toLowerCase());
    const matchesCargo = filters.cargo ? c.cargo === filters.cargo : true;
    const matchesPartido = filters.id_partido
      ? String(c.id_partido) === String(filters.id_partido)
      : true;
    const matchesRegion = filters.id_region
      ? String(c.id_region) === String(filters.id_region)
      : true;

    return matchesNombre && matchesCargo && matchesPartido && matchesRegion;
  });

  if (loading) return <div className="p-4">Cargando candidatos...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-negro">Gestión de Candidatos</h1>
      </div>

      {/* Bloque de Filtros */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          <div className="form-control">
            <label className="label py-1">
              <span className="label-text font-bold text-xs text-gray-500 uppercase">
                Nombre
              </span>
            </label>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                name="nombre"
                placeholder="Buscar..."
                className="input input-bordered w-full pl-10 h-10 text-sm"
                value={filters.nombre}
                onChange={handleFilterChange}
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label py-1">
              <span className="label-text font-bold text-xs text-gray-500 uppercase">
                Cargo
              </span>
            </label>
            <select
              name="cargo"
              className="select select-bordered w-full h-10 min-h-0 text-sm"
              value={filters.cargo}
              onChange={handleFilterChange}
            >
              <option value="">Todos los cargos</option>
              <option value="presidente">Presidente</option>
              <option value="1er vicepresidente">1er Vicepresidente</option>
              <option value="2do vicepresidente">2do Vicepresidente</option>
              <option value="diputado">Diputado</option>
              <option value="senador nacional">Senador Nacional</option>
              <option value="senador regional">Senador Regional</option>
              <option value="parlamento andino">Parlamento Andino</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label py-1">
              <span className="label-text font-bold text-xs text-gray-500 uppercase">
                Partido
              </span>
            </label>
            <select
              name="id_partido"
              className="select select-bordered w-full h-10 min-h-0 text-sm"
              value={filters.id_partido}
              onChange={handleFilterChange}
            >
              <option value="">Todos los partidos</option>
              {partidos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.sigla} - {p.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label className="label py-1">
              <span className="label-text font-bold text-xs text-gray-500 uppercase">
                Región
              </span>
            </label>
            <select
              name="id_region"
              className="select select-bordered w-full h-10 min-h-0 text-sm"
              value={filters.id_region}
              onChange={handleFilterChange}
            >
              <option value="">Todas las regiones</option>
              {regiones.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.nombre}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={clearFilters}
            className="btn btn-outline btn-sm h-10 text-gray-500 border-gray-300 hover:bg-gray-100"
          >
            Limpiar filtros
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 font-semibold text-gray-600">Candidato</th>
                <th className="p-4 font-semibold text-gray-600">N°</th>
                <th className="p-4 font-semibold text-gray-600">Cargo</th>
                <th className="p-4 font-semibold text-gray-600">Partido</th>
                <th className="p-4 font-semibold text-gray-600">Región</th>
                <th className="p-4 font-semibold text-gray-600 text-right">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCandidatos.map((candidato) => (
                <tr
                  key={candidato.candidato_id || candidato.id}
                  className="hover:bg-gray-50"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {candidato.foto ? (
                        <img
                          src={candidato.foto}
                          alt={candidato.nombres}
                          className="w-12 h-16 rounded-lg object-cover shadow-sm"
                        />
                      ) : (
                        <div className="w-12 h-16 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500 shadow-sm">
                          <User size={24} />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-negro">
                          {candidato.nombres} {candidato.apellidos}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red/10 text-red font-bold text-sm">
                      {candidato.numero || "-"}
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium uppercase">
                      {candidato.cargo}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {candidato.sigla && (
                        <img
                          src={`/logos/${candidato.sigla.toUpperCase()}.png`}
                          alt="logo"
                          className="w-6 h-6 object-contain"
                          onError={(e) => (e.target.style.display = "none")}
                        />
                      )}
                      <span className="text-gray-600">
                        {candidato.nombre_partido || "Sin partido"}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">
                    {candidato.region || "-"}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onEdit(candidato)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() =>
                          handleDelete(candidato.candidato_id || candidato.id)
                        }
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCandidatos.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-muted">
                    No se encontraron candidatos
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
