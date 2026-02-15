import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import api from "../api/api";
import loginpic from "../assets/login.png";

export default function Login({
  onSwitchToRegister,
  onClose,
  registrationSuccess,
  setRegistrationSuccess,
}) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (registrationSuccess) {
      const timer = setTimeout(() => {
        setRegistrationSuccess("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [registrationSuccess, setRegistrationSuccess]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
    if (setRegistrationSuccess) setRegistrationSuccess("");
  };

  const validateLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Por favor, ingresa una dirección de correo válida.");
      return false;
    }
    if (formData.password.length < 1) {
      setError("Ingresa tu contraseña.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (setRegistrationSuccess) setRegistrationSuccess("");

    if (!validateLogin()) return;
    setLoading(true);

    try {
      const response = await api.post("/login", {
        email: formData.email,
        password: formData.password,
      });
      const user = response.data;
      localStorage.setItem("user", JSON.stringify(user));

      if (onClose) onClose();

      if (user.rol === "admin" || user.rol === "administrador") {
        navigate("/admin");
      } else {
        navigate("/");
        window.location.reload();
      }
    } catch (err) {
      setError(err.response?.data?.error || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex animate-in fade-in slide-in-from-left-4 duration-300">
      <div className="hidden md:block w-[387px] h-full bg-gray-50 overflow-hidden">
        <img
          src={loginpic}
          alt="Login Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-negro mb-2">Bienvenido</h2>
          <p className="text-muted">Ingresa a tu cuenta para continuar</p>
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red text-sm rounded-lg border border-red/20 animate-pulse">
              {error}
            </div>
          )}
          {registrationSuccess && (
            <div className="mt-4 p-3 bg-green-50 text-green-600 text-sm rounded-lg border border-green-200 animate-in fade-in duration-500">
              {registrationSuccess}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
                autoComplete="username"
                disabled={loading}
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
                className="input input-bordered w-full pl-10 pr-10"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                disabled={loading}
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
            <div className="text-right mt-1">
              <a href="#" className="text-xs text-blue hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full text-white font-bold bg-red hover:bg-red-600 border-none flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Ingresando...
              </>
            ) : (
              "Ingresar"
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          ¿No tienes una cuenta?{" "}
          <button
            onClick={onSwitchToRegister}
            className="text-blue font-bold hover:underline"
          >
            Regístrate aquí
          </button>
        </div>
      </div>
    </div>
  );
}
