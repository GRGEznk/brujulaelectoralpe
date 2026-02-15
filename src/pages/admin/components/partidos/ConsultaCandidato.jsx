import { useState, useEffect } from "react";
import { Edit, Trash2, Search, User } from "lucide-react";
import api from "../../../../api/api";

export default function ConsultaCandidato({ onEdit }) {
  const [candidatos, setCandidatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCandidatos();
  }, []);

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

  const filteredCandidatos = candidatos.filter((c) =>
    `${c.nombres} ${c.apellidos} ${c.partido_nombre || ""}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  if (loading) return <div className="p-4">Cargando candidatos...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-negro">Gestión de Candidatos</h1>
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Buscar candidato..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
                      {candidato.logo_key && (
                        <img
                          src={`/logos/${candidato.logo_key.toUpperCase()}.png`}
                          alt="logo"
                          className="w-6 h-6 object-contain"
                          onError={(e) => (e.target.style.display = "none")}
                        />
                      )}
                      <span className="text-gray-600">
                        {candidato.partido_nombre || "Sin partido"}
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
