import { useState } from "react";
import { Save, X } from "lucide-react";
import { CATEGORIAS } from "./data/categorias";

export default function RegistroPreguntas({
  onSubmit,
  editData,
  onCancelEdit,
}) {
  const [formData, setFormData] = useState(
    editData || {
      texto: "",
      eje: "X",
      direccion: 1,
      estado: "activa",
      categoria: "",
    },
  );

  const [errors, setErrors] = useState({});
  const charLimit = 120;
  const remainingChars = charLimit - formData.texto.length;

  const handleChange = (e) => {
    const { name, value } = e.target;

    // direccion a numero
    const finalValue = name === "direccion" ? parseInt(value) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));

    // limpiar error
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.texto.trim()) {
      newErrors.texto = "El texto de la pregunta es requerido";
    } else if (formData.texto.length > charLimit) {
      newErrors.texto = `El texto no puede exceder ${charLimit} caracteres`;
    }

    if (!formData.categoria.trim()) {
      newErrors.categoria = "La categoría es requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit(formData);

    // limpiar formulario si no edita
    if (!editData) {
      setFormData({
        texto: "",
        eje: "X",
        direccion: 1,
        estado: "activa",
        categoria: "",
      });
    }
  };

  const handleCancel = () => {
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-negro">
          {editData ? "Editar Pregunta" : "Nueva Pregunta"}
        </h2>
        {editData && (
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-ghost btn-sm btn-circle"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* texto */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold text-negro">
              Texto de la Pregunta *
            </span>
            <span
              className={`label-text-alt ${
                remainingChars < 20 ? "text-red" : "text-muted"
              }`}
            >
              {remainingChars} caracteres restantes
            </span>
          </label>
          <textarea
            name="texto"
            value={formData.texto}
            onChange={handleChange}
            maxLength={charLimit}
            className={`textarea textarea-bordered w-full h-24 ${
              errors.texto ? "textarea-error" : ""
            }`}
            placeholder="Escribe la pregunta aquí..."
          />
          {errors.texto && (
            <label className="label">
              <span className="label-text-alt text-red">{errors.texto}</span>
            </label>
          )}
        </div>

        {/* eje y direccion */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* eje */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-negro">Eje *</span>
            </label>
            <select
              name="eje"
              value={formData.eje}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="X">Eje X (Económico)</option>
              <option value="Y">Eje Y (Social)</option>
            </select>
          </div>

          {/* direccion */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-negro">
                Dirección *
              </span>
            </label>
            <select
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value={-1}>← Negativo (-1)</option>
              <option value={1}>→ Positivo (+1)</option>
            </select>
          </div>
        </div>

        {/* categoria y estado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* categoria */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-negro">
                Categoría *
              </span>
            </label>
            <select
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              className={`select select-bordered w-full ${errors.categoria ? "select-error" : ""}`}
            >
              <option value="">Selecciona una categoría</option>
              {CATEGORIAS.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.categoria && (
              <label className="label">
                <span className="label-text-alt text-red">
                  {errors.categoria}
                </span>
              </label>
            )}
          </div>

          {/* estado */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-negro">
                Estado *
              </span>
            </label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="activa">Activa</option>
              <option value="inactiva">Inactiva</option>
            </select>
          </div>
        </div>

        {/* boton submiit */}
        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            className="btn bg-blue text-white hover:bg-blue-dark flex items-center gap-2"
          >
            <Save size={18} />
            {editData ? "Actualizar Pregunta" : "Crear Pregunta"}
          </button>
          {editData && (
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-ghost"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
