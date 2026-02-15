import React, { useState, useEffect } from "react";
import {
  Save,
  Flag,
  X,
  Info,
  Palette,
  User,
  Image as ImageIcon,
} from "lucide-react";
import api from "../../../../api/api";

const RegistroPartidos = ({ partidoToEdit, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    nombre_largo: "",
    sigla: "",
    candidato_presidencial: "",
    lider_partido: "",
    color_primario: "#000000",
    plan_gobierno: "",
    anio_fundacion: "",
    anio_inscripcion_jne: "",
    tipo_organizacion: "Partido Político",
  });

  useEffect(() => {
    if (partidoToEdit) {
      const meta =
        (Array.isArray(partidoToEdit.partido_metadata)
          ? partidoToEdit.partido_metadata[0]
          : partidoToEdit.partido_metadata) || {};

      setFormData({
        nombre: partidoToEdit.nombre || "",
        nombre_largo: partidoToEdit.nombre_largo || "",
        sigla: partidoToEdit.sigla || "",
        candidato_presidencial: meta.candidato_presidencial || "",
        lider_partido: meta.lider_partido || "",
        color_primario: meta.color_primario || "#000000",
        plan_gobierno: meta.plan_gobierno || "",
        anio_fundacion: meta.anio_fundacion || "",
        anio_inscripcion_jne: meta.anio_inscripcion_jne || "",
        tipo_organizacion: meta.tipo_organizacion || "Partido Político",
      });
    }
  }, [partidoToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGuardar = async () => {
    // Validaciones
    if (!formData.nombre.trim()) {
      alert("Por favor ingrese el nombre del partido");
      return;
    }
    if (!formData.nombre_largo.trim()) {
      alert("Por favor ingrese el nombre largo del partido");
      return;
    }
    if (!formData.sigla.trim()) {
      alert("Por favor ingrese la sigla del partido");
      return;
    }

    if (formData.nombre.length > 50) {
      alert("El nombre no puede exceder 50 caracteres");
      return;
    }
    if (formData.nombre_largo.length > 100) {
      alert("El nombre largo no puede exceder 100 caracteres");
      return;
    }
    if (formData.sigla.length > 10) {
      alert("La sigla no puede exceder 10 caracteres");
      return;
    }

    try {
      if (partidoToEdit) {
        // Actualizar existente
        await api.put(`/partidos/${partidoToEdit.id}`, formData);
        alert("Partido actualizado exitosamente");
        onSuccess();
      } else {
        // Crear nuevo
        await api.post("/partidos", formData);
        alert("Partido registrado exitosamente");
        // Limpiar formulario
        setFormData({
          // Tabla Partido
          nombre: "",
          nombre_largo: "",
          sigla: "",
          plan_gobierno: "",

          // Tabla Partido Metadata
          candidato_presidencial: "",
          lider_partido: "",
          color_primario: "#000000",
          anio_fundacion: "",
          anio_inscripcion_jne: "",
          tipo_organizacion: "Partido Político",
        });
      }
    } catch (error) {
      console.error("Error al guardar partido:", error);
      alert(error.response?.data?.error || "Error al guardar el partido");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up">
      {/* Formulario de Registro de Partido */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-negro flex items-center gap-2">
            <Flag className="text-red" size={24} />
            {partidoToEdit
              ? "Editar Partido Político"
              : "Registro de Partido Político"}
          </h2>
          {partidoToEdit && (
            <button
              onClick={onCancel}
              className="btn btn-ghost btn-sm btn-circle"
            >
              <X size={20} />
            </button>
          )}
        </div>

        <div className="space-y-8">
          {/* 1. Datos Principales */}
          <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-100">
            <h3 className="flex items-center gap-2 text-lg font-bold text-blue mb-4 pb-2 border-b border-gray-200">
              <Info size={18} /> Información General
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control md:col-span-2">
                <label className="label font-semibold">
                  Nombre Largo (Oficial)
                </label>
                <input
                  type="text"
                  name="nombre_largo"
                  className="input input-bordered w-full focus:input-error"
                  placeholder="Ej: Partido Democrático Somos Perú"
                  value={formData.nombre_largo}
                  onChange={handleInputChange}
                  maxLength={100}
                />
              </div>

              <div className="form-control">
                <label className="label font-semibold">Nombre Corto</label>
                <input
                  type="text"
                  name="nombre"
                  className="input input-bordered w-full focus:input-error"
                  placeholder="Ej: Somos Perú"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  maxLength={50}
                />
              </div>

              <div className="form-control">
                <label className="label font-semibold">Sigla</label>
                <input
                  type="text"
                  name="sigla"
                  className="input input-bordered w-full focus:input-error"
                  placeholder="Ej: SP"
                  value={formData.sigla}
                  onChange={handleInputChange}
                  maxLength={10}
                />
              </div>
              <div className="form-control">
                <label className="label font-semibold">Año Fundación</label>
                <input
                  type="number"
                  name="anio_fundacion"
                  className="input input-bordered w-full focus:input-error"
                  placeholder="Ej: 1990"
                  value={formData.anio_fundacion}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-control">
                <label className="label font-semibold">
                  Año Inscripción JNE
                </label>
                <input
                  type="number"
                  name="anio_inscripcion_jne"
                  className="input input-bordered w-full focus:input-error"
                  placeholder="Ej: 2000"
                  value={formData.anio_inscripcion_jne}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-control">
                <label className="label font-semibold">Tipo Organización</label>
                <select
                  name="tipo_organizacion"
                  className="select select-bordered w-full focus:select-error"
                  value={formData.tipo_organizacion}
                  onChange={handleInputChange}
                >
                  <option>Partido Político</option>
                  <option>Alianza Electoral</option>
                  <option>Movimiento Regional</option>
                </select>
              </div>
            </div>
          </div>

          {/* 2. Identidad Visual (Assets) */}
          <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-100">
            <h3 className="flex items-center gap-2 text-lg font-bold text-red mb-4 pb-2 border-b border-gray-200">
              <Palette size={18} /> Identidad Visual
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Vista Previa de Logo */}
              <div className="space-y-4">
                <div className="form-control w-full">
                  <label className="label font-semibold">
                    Previsualización Logo
                  </label>
                  <div className="h-32 bg-white rounded-xl border border-dashed border-gray-300 flex items-center justify-center p-4">
                    {formData.sigla ? (
                      <img
                        src={`/logos/${formData.sigla}.png`}
                        alt="Preview Logo"
                        className="h-20 object-contain"
                        onError={(e) => {
                          e.target.src = "/brujula.ico"; // Fallback
                          e.target.className = "h-12 opacity-20 grayscale";
                        }}
                      />
                    ) : (
                      <div className="text-gray-400 flex flex-col items-center">
                        <ImageIcon size={24} />
                        <span className="text-[10px] mt-1">
                          Ingrese sigla para ver logo
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Color Picker */}
              <div className="space-y-4">
                <div className="form-control w-full">
                  <label className="label font-semibold">Color Primario</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      name="color_primario"
                      className="h-12 w-16 p-0 border-0 rounded-lg cursor-pointer overflow-hidden shadow-sm"
                      value={formData.color_primario}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="color_primario"
                      className="input input-bordered flex-1 font-mono uppercase"
                      value={formData.color_primario}
                      onChange={handleInputChange}
                    />
                  </div>
                  {/* Color Preview */}
                  <div
                    className="h-20 rounded-xl shadow-sm flex items-center justify-center text-white font-bold text-sm mt-4"
                    style={{ backgroundColor: formData.color_primario }}
                  >
                    Color Muestra
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Liderazgo */}
          <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-100">
            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-700 mb-4 pb-2 border-b border-gray-200">
              <User size={18} /> Liderazgo
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label font-semibold">
                  Candidato Presidencial
                </label>
                <input
                  type="text"
                  name="candidato_presidencial"
                  className="input input-bordered w-full"
                  placeholder="Nombre completo"
                  value={formData.candidato_presidencial}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-control">
                <label className="label font-semibold">Líder del Partido</label>
                <input
                  type="text"
                  name="lider_partido"
                  className="input input-bordered w-full"
                  placeholder="Si es distinto al candidato"
                  value={formData.lider_partido}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-control md:col-span-2">
                <label className="label font-semibold">
                  Plan de Gobierno (Enlace)
                </label>
                <input
                  type="url"
                  name="plan_gobierno"
                  className="input input-bordered w-full"
                  placeholder="https://ejemplo.com/plan.pdf"
                  value={formData.plan_gobierno}
                  onChange={handleInputChange}
                />
              </div>

              {/* Foto Candidato */}
              <div className="form-control md:col-span-2">
                <label className="label font-semibold">
                  Vista Previa Candidato
                </label>
                <div className="flex gap-4 items-center p-4 bg-white rounded-xl border border-dashed border-gray-300">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-red bg-gray-50 flex items-center justify-center">
                    {formData.sigla ? (
                      <img
                        src={`/candidatos/${formData.sigla}.png`}
                        alt="Preview Candidato"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "block";
                        }}
                      />
                    ) : null}
                    <User
                      size={32}
                      className="text-gray-300"
                      style={{ display: formData.sigla ? "none" : "block" }}
                    />
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-gray-700">
                      Foto del Candidato
                    </p>
                    <p className="text-gray-500 text-xs">
                      Se vincula automáticamente por la sigla:{" "}
                      <span className="font-mono bg-gray-100 px-1 rounded">
                        {formData.sigla || "---"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-2 pt-4">
            {partidoToEdit && (
              <button onClick={onCancel} className="btn btn-ghost px-6">
                Cancelar
              </button>
            )}
            <button
              onClick={handleGuardar}
              className="btn bg-red text-white hover:bg-red-dark gap-2 px-8 shadow-lg shadow-red/20 border-none rounded-full"
            >
              <Save size={20} />
              {partidoToEdit ? "Actualizar Partido" : "Guardar Partido"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroPartidos;
