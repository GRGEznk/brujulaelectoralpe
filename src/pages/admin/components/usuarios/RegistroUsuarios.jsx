import { useState, useEffect } from "react";
import { Eye, EyeOff, Save, X } from "lucide-react";
import api from "../../../../api/api";
import {
  validatePassword,
  PASSWORD_REQUIREMENTS_TEXT,
  getPasswordStrength,
} from "../../../../utils/passwordValidator";

export default function RegistroUsuarios({ userToEdit, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
    rol: "user",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const strength = getPasswordStrength(formData.password);
  const strengthColors = [
    "bg-gray-200",
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-500",
  ];
  const strengthLabels = [
    "Muy débil",
    "Débil",
    "Aceptable",
    "Buena",
    "Fuerte",
    "Excelente",
  ];

  // Cargar datos si estamos en modo edición
  useEffect(() => {
    if (userToEdit) {
      setFormData({
        nombre: userToEdit.nombre || "",
        email: userToEdit.email || "",
        password: "",
        confirmPassword: "",
        rol: userToEdit.rol || "user",
      });
    } else {
      // Reset si no hay usuario (modo crear)
      setFormData({
        nombre: "",
        email: "",
        password: "",
        confirmPassword: "",
        rol: "user",
      });
    }
  }, [userToEdit]);

  // Validaciones
  const validate = (values) => {
    const errors = {};

    //  Nombre
    if (!values.nombre.trim()) {
      errors.nombre = "El nombre es requerido";
    } else if (values.nombre.length > 50) {
      errors.nombre = "El nombre no puede exceder 50 caracteres";
    }

    // Email con regex simple de formato
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!values.email) {
      errors.email = "El email es requerido";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Ingrese un email válido (nombre@email.com)";
    }

    //  Password
    // Si estamos editando y el campo está vacío, es válido y no se cambia
    const isEditingPassword = userToEdit && !values.password;

    if (!isEditingPassword) {
      const result = validatePassword(values.password);
      if (!result.isValid) {
        if (values.password || !userToEdit) {
          errors.password = result.error;
        }
      }

      // validar confirmar pass solo si se ingresó password
      if (values.password && values.confirmPassword !== values.password) {
        errors.confirmPassword = "Las contraseñas no coinciden";
      }
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    // validar en tiempo real si el campo ya fue tocado
    if (touched[name]) {
      setErrors(validate(newFormData));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors(validate(formData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length === 0) {
      try {
        if (userToEdit) {
          // MODO EDICIÓN
          await api.put(`/usuarios/${userToEdit.id}`, formData);
          alert("Usuario actualizado correctamente");
        } else {
          // MODO CREACIÓN
          await api.post("/usuarios", formData);
          alert("Usuario registrado correctamente");
        }

        // callback de éxito
        if (onSuccess) onSuccess();

        // reset form
        setFormData({
          nombre: "",
          email: "",
          password: "",
          confirmPassword: "",
          rol: "user",
        });
        setTouched({});
        setErrors({});
      } catch (error) {
        console.error("Error al guardar usuario:", error);
        const errorMsg =
          error.response?.data?.error || "Error al guardar el usuario";
        alert(errorMsg);
      }
    } else {
      setErrors(validationErrors);
      setTouched({
        nombre: true,
        email: true,
        password: true,
        confirmPassword: true,
        rol: true,
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100 font-argentum">
      <h2 className="text-2xl font-bold text-negro mb-6 flex items-center gap-2">
        <span className="w-2 h-8 bg-red rounded-full block"></span>
        {userToEdit ? "Editar Usuario" : "Registro de Nuevo Usuario"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold text-negro">
              Nombre Completo *
            </span>
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ej: Juan Pérez"
            className={`input input-bordered w-full ${errors.nombre && touched.nombre ? "input-error" : ""}`}
          />
          {errors.nombre && touched.nombre && (
            <label className="label">
              <span className="label-text-alt text-red">{errors.nombre}</span>
            </label>
          )}
        </div>

        {/* Email */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold text-negro">
              Correo Electrónico *
            </span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="usuario@dominio.com"
            className={`input input-bordered w-full ${errors.email && touched.email ? "input-error" : ""}`}
          />
          {errors.email && touched.email && (
            <label className="label">
              <span className="label-text-alt text-red">{errors.email}</span>
            </label>
          )}
        </div>

        {/* password y confirmar password en grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* password */}
          <div className="form-control w-full relative">
            <label className="label">
              <span className="label-text font-semibold text-negro">
                {userToEdit ? "Nueva Contraseña (Opcional)" : "Contraseña *"}
              </span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`input input-bordered w-full pr-10 ${errors.password && touched.password ? "input-error" : ""}`}
                placeholder={
                  userToEdit ? "Dejar en blanco para mantener" : "••••••••••••"
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {formData.password.length > 0 && (
              <div className="mt-2">
                <div className="flex gap-1 h-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`flex-1 rounded-full transition-colors duration-300 ${
                        level <= strength
                          ? strengthColors[strength]
                          : "bg-gray-100"
                      }`}
                    />
                  ))}
                </div>
                <p
                  className={`text-[9px] font-bold mt-1 text-right uppercase tracking-wider ${
                    strength <= 2
                      ? "text-red-500"
                      : strength <= 4
                        ? "text-orange-500"
                        : "text-green-500"
                  }`}
                >
                  {strengthLabels[strength]}
                </p>
              </div>
            )}

            {errors.password && touched.password ? (
              <label className="label">
                <span className="label-text-alt text-red">
                  {errors.password}
                </span>
              </label>
            ) : (
              <label className="label">
                <span className="label-text-alt text-xs text-muted leading-tight">
                  {PASSWORD_REQUIREMENTS_TEXT}
                </span>
              </label>
            )}
          </div>

          {/* confirmar password */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold text-negro">
                Repetir Contraseña
              </span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`input input-bordered w-full pr-10 ${errors.confirmPassword && touched.confirmPassword ? "input-error" : ""}`}
                placeholder="••••••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && touched.confirmPassword && (
              <label className="label">
                <span className="label-text-alt text-red">
                  {errors.confirmPassword}
                </span>
              </label>
            )}
          </div>
        </div>

        {/* Rol */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold text-negro">
              Rol de Usuario *
            </span>
          </label>
          <select
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        {/* acción */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="btn bg-blue text-white hover:bg-blue-dark flex-1 shadow-md hover:shadow-lg transition-all"
          >
            <Save size={20} />
            {userToEdit ? "Actualizar Usuario" : "Registrar Usuario"}
          </button>
          <button
            type="button"
            onClick={
              onCancel ||
              (() =>
                setFormData({
                  ...formData,
                  nombre: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                }))
            }
            className="btn btn-outline border-gray-300 text-gray-500 hover:bg-blue-50 hover:border-blue-400"
          >
            <X size={20} />
            {userToEdit ? "Cancelar" : "Limpiar"}
          </button>
        </div>
      </form>
    </div>
  );
}
