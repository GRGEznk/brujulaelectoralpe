import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import api from "../api/api";
import {
  validatePassword,
  PASSWORD_REQUIREMENTS_TEXT,
  getPasswordStrength,
} from "../utils/passwordValidator";
import registerpic from "../assets/register.png";

export default function Register({ onSwitchToLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validar en tiempo real si el campo ya fue tocado
    if (touched[name] || name === "password" || name === "confirmPassword") {
      // Limpiar error específico si es válido (simplificado: limpiamos error general)
      if (error) setError("");
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const validateRegister = () => {
    if (!formData.nombre.trim()) {
      setError("El nombre es requerido.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Por favor, ingresa una dirección de correo válida.");
      return false;
    }
    const result = validatePassword(formData.password);
    if (!result.isValid) {
      setError(result.error);
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateRegister()) return;
    setLoading(true);

    try {
      await api.post("/register", {
        nombre: formData.nombre,
        email: formData.email,
        password: formData.password,
      });
      onSwitchToLogin("¡Registro exitoso! Ya puedes iniciar sesión.");
    } catch (err) {
      setError(err.response?.data?.error || "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  // Helper para mostrar error de password en tiempo real si está tocado
  const passwordValidation = touched.password
    ? validatePassword(formData.password)
    : { isValid: true, error: null };
  const showPasswordError =
    touched.password &&
    !passwordValidation.isValid &&
    formData.password.length > 0;

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

  return (
    <div className="h-full flex animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-negro mb-2">Crea tu cuenta</h2>
          <p className="text-muted">Completa tus datos para empezar</p>
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red text-sm rounded-lg border border-red/20 animate-pulse">
              {error}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-negro">
                Nombre Completo
              </span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="nombre"
                placeholder="Juan Pérez"
                className="input input-bordered w-full pl-10"
                value={formData.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={loading}
                autoComplete="name"
                required
              />
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-negro">
                Correo Electrónico
              </span>
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="ejemplo@correo.com"
                className="input input-bordered w-full pl-10"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={loading}
                autoComplete="email"
                required
              />
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-negro">
                Contraseña
              </span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                className={`input input-bordered w-full pl-10 pr-10 ${showPasswordError ? "input-error" : ""}`}
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={loading}
                autoComplete="new-password"
                required
              />
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                disabled={loading}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-negro">
                Repetir Contraseña
              </span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="••••••••"
                className="input input-bordered w-full pl-10 pr-10"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={loading}
                autoComplete="new-password"
                required
              />
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                disabled={loading}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Help text or Error for password */}
          {showPasswordError ? (
            <p className="text-xs text-red px-1 mt-1">
              {passwordValidation.error}
            </p>
          ) : (
            <p className="text-[10px] text-muted leading-tight px-1 mt-1">
              {PASSWORD_REQUIREMENTS_TEXT}
            </p>
          )}

          <button
            type="submit"
            className="btn btn-primary w-full text-white font-bold bg-blue hover:bg-blue-dark border-none flex items-center justify-center gap-2 mt-4"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Registrando...
              </>
            ) : (
              "Registrarse"
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <button
            onClick={() => onSwitchToLogin()}
            className="text-red font-bold hover:underline"
          >
            Inicia sesión aquí
          </button>
        </div>
      </div>

      <div className="hidden md:block w-[387px] h-full bg-gray-50 overflow-hidden">
        <img
          src={registerpic}
          alt="Register Illustration"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
