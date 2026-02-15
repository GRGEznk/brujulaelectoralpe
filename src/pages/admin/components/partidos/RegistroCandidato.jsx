import { useState, useEffect } from "react";
import api from "../../../../api/api";
import { Save, X, Upload } from "lucide-react";

export default function RegistroCandidato({
  candidatoToEdit,
  onSuccess,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    cargo: "presidente",
    numero: "",
    id_region: 1, // Default a 'No Aplica'
    foto: "",
    hojavida: "",
    id_partido: "",
  });

  const [partidos, setPartidos] = useState([]);
  const [regiones, setRegiones] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPartidos();
    fetchRegiones();
  }, []);

  useEffect(() => {
    if (candidatoToEdit) {
      setFormData({
        nombres: candidatoToEdit.nombres || "",
        apellidos: candidatoToEdit.apellidos || "",
        cargo: candidatoToEdit.cargo || "presidente",
        numero: candidatoToEdit.numero || "",
        id_region: candidatoToEdit.id_region || 1,
        foto: candidatoToEdit.foto || "",
        hojavida: candidatoToEdit.hojavida || "",
        id_partido: candidatoToEdit.id_partido || "",
      });
    }
  }, [candidatoToEdit]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (candidatoToEdit) {
        await api.put(
          `/candidatos/${candidatoToEdit.candidato_id || candidatoToEdit.id}`,
          formData,
        );
      } else {
        await api.post("/candidatos", formData);
      }
      onSuccess();
    } catch (error) {
      console.error("Error al guardar candidato:", error);
      alert("Error al guardar el candidato");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-negro">
          {candidatoToEdit ? "Editar Candidato" : "Nuevo Candidato"}
        </h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombres */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-negro">Nombres</span>
              </label>
              <input
                type="text"
                name="nombres"
                value={formData.nombres}
                onChange={handleChange}
                placeholder="Ej: Juan"
                className="input input-bordered w-full bg-slate-50"
                required
              />
            </div>

            {/* Apellidos */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-negro">
                  Apellidos
                </span>
              </label>
              <input
                type="text"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                placeholder="Ej: Pérez"
                className="input input-bordered w-full bg-slate-50"
                required
              />
            </div>

            {/* Partido */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-negro">
                  Partido Político
                </span>
              </label>
              <select
                name="id_partido"
                value={formData.id_partido}
                onChange={handleChange}
                className="select select-bordered w-full bg-slate-50"
                required
              >
                <option value="">Seleccione un partido</option>
                {partidos.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Cargo */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-negro">
                  Cargo al que postula
                </span>
              </label>
              <select
                name="cargo"
                value={formData.cargo}
                onChange={handleChange}
                className="select select-bordered w-full bg-slate-50"
                required
              >
                <option value="presidente">Presidente</option>
                <option value="1er vicepresidente">1er Vicepresidente</option>
                <option value="2do vicepresidente">2do Vicepresidente</option>
                <option value="diputado">Diputado</option>
                <option value="senador nacional">Senador Nacional</option>
                <option value="senador regional">Senador Regional</option>
                <option value="parlamento andino">Parlamento Andino</option>
              </select>
            </div>

            {/* Número */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-negro">Número</span>
              </label>
              <input
                type="number"
                name="numero"
                value={formData.numero}
                onChange={(e) => {
                  if (e.target.value.length <= 2) {
                    handleChange(e);
                  }
                }}
                placeholder="0-99"
                className="input input-bordered w-full bg-slate-50"
                min="0"
                max="99"
              />
            </div>

            {/* Región Dropdown */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-negro">Región</span>
              </label>
              <select
                name="id_region"
                value={formData.id_region}
                onChange={handleChange}
                className="select select-bordered w-full bg-slate-50"
                required
              >
                {regiones.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Foto URL */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-negro">
                  URL Foto
                </span>
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  name="foto"
                  value={formData.foto}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="input input-bordered w-full bg-slate-50"
                />
              </div>
              {formData.foto && (
                <div className="mt-2 text-center">
                  <img
                    src={formData.foto}
                    alt="Vista previa"
                    className="w-24 h-32 object-cover rounded-lg mx-auto border shadow-sm"
                  />
                </div>
              )}
            </div>

            {/* Hoja de Vida URL */}
            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text font-bold text-negro">
                  URL Hoja de Vida
                </span>
              </label>
              <input
                type="url"
                name="hojavida"
                value={formData.hojavida}
                onChange={handleChange}
                placeholder="https://..."
                className="input input-bordered w-full bg-slate-50"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-ghost hover:bg-gray-100"
            >
              <X size={20} className="mr-2" />
              Cancelar
            </button>
            <button
              type="submit"
              className="btn bg-red text-white hover:bg-red-800 border-none"
              disabled={loading}
            >
              <Save size={20} className="mr-2" />
              {loading ? "Guardando..." : "Guardar Candidato"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
