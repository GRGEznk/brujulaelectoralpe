import React, { useState } from "react";
import { X } from "lucide-react";
import Login from "./Login";
import Register from "./Register";

export default function AuthModal({ isOpen, onClose }) {
  const [view, setView] = useState("login"); // 'login' or 'register'
  const [registrationSuccess, setRegistrationSuccess] = useState("");

  const switchToRegister = () => {
    setRegistrationSuccess("");
    setView("register");
  };

  const switchToLogin = (message = "") => {
    if (typeof message === "string" && message) setRegistrationSuccess(message);
    setView("login");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal con tamaño ajustable */}
      <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden font-argentum w-full max-w-[900px] md:w-auto md:min-w-[500px] h-auto max-h-[90vh] md:h-[600px] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-20 bg-white/80 rounded-full p-2"
        >
          <X size={24} />
        </button>

        {/* Mostrar solo una vista con scroll si es necesario */}
        <div className="flex-1 overflow-y-auto">
          {view === "login" ? (
            <Login
              onSwitchToRegister={switchToRegister}
              onClose={onClose}
              registrationSuccess={registrationSuccess}
              setRegistrationSuccess={setRegistrationSuccess}
            />
          ) : (
            <Register onSwitchToLogin={switchToLogin} onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
}
