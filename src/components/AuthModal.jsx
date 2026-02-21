import React, { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Login from "./Login";
import Register from "./Register";

export default function AuthModal({ isOpen, onClose }) {
  const [[view, direction], setView] = useState(["login", 1]); // [view, direction]
  const [registrationSuccess, setRegistrationSuccess] = useState("");

  const switchToRegister = () => {
    setRegistrationSuccess("");
    setView(["register", 1]);
  };

  const switchToLogin = (message = "") => {
    if (typeof message === "string" && message) setRegistrationSuccess(message);
    setView(["login", -1]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-white rounded-2xl shadow-xl overflow-hidden font-argentum w-full max-w-[900px] md:w-auto md:min-w-[500px] h-auto max-h-[90vh] md:h-[600px] flex flex-col"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-50 bg-white/80 rounded-full p-2 shadow-sm transition-transform hover:scale-110 active:scale-95"
        >
          <X size={24} />
        </button>

        <div className="flex-1 overflow-hidden relative bg-white">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={view}
              initial={{ x: direction > 0 ? "100%" : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: direction > 0 ? "100%" : "-100%" }}
              transition={{
                x: { duration: 1.6, ease: [0.4, 0, 0.2, 1] },
              }}
              className="w-full h-full overflow-y-auto bg-white"
            >
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
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
