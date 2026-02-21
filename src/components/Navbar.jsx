import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import BrujulaLogo from "../assets/brujulalogo.png";
import { Menu, X, CircleUserRound, LogOut, User } from "lucide-react";
import AuthModal from "./AuthModal";

const ALL_LINKS = [
  { to: "/quiz", label: "Quiz electoral", type: "public" },
  { to: "/comparador", label: "Comparador electoral", type: "public" },
  { to: "/portal", label: "Portal de transparencia", type: "public" },
  { to: "/admin", label: "Admin Panel", type: "admin" },
];

const NavItems = ({ onLinkClick }) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isAdmin =
    user && (user.rol === "admin" || user.rol === "administrador");
  const location = useLocation();

  const linksToShow = ALL_LINKS.filter(
    (link) => link.type === "public" || (link.type === "admin" && isAdmin),
  );

  return (
    <>
      {linksToShow.map((link) => {
        const isActive = location.pathname === link.to;
        return (
          <li key={link.to}>
            <Link
              to={link.to}
              onClick={onLinkClick}
              className={`font-argentum transition-all duration-300 relative group
                ${
                  isActive
                    ? "text-red font-semibold"
                    : "text-negro hover:text-red"
                }`}
            >
              {link.label}
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-red transition-all duration-300
                ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
              ></span>
            </Link>
          </li>
        );
      })}
    </>
  );
};

export default function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const navigate = useNavigate();

  const handleLogout = () => {
    if (
      window.confirm(`¿Deseas cerrar sesión, ${user.nombre || user.email}?`)
    ) {
      localStorage.removeItem("user");
      setShowUserMenu(false);
      setIsMobileMenuOpen(false);
      navigate("/");
      // En lugar de reload, dejamos que React Router maneje la navegación
      // y los componentes reaccionen al cambio en localStorage si es necesario
      // o simplemente forzamos un re-render si el estado de usuario está en el componente
    }
  };

  const handleUserClick = () => {
    if (user) {
      setShowUserMenu(!showUserMenu);
    } else {
      setIsLoginOpen(true);
    }
  };

  return (
    <>
      <nav className="relative z-50 font-argentum">
        <div className="fixed top-0 left-0 w-full z-40">
          <div className="flex items-center justify-between bg-white shadow-lg border-t-8 border-red py-4 px-4 sm:px-8 lg:px-16 transition-all duration-300">
            <div className="flex-1">
              <Link
                to="/"
                className="inline-block transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={BrujulaLogo}
                  alt="Decide.pe Logo"
                  className="w-auto h-13"
                />
              </Link>
            </div>

            {/* desktop */}
            <div className="hidden lg:flex items-center gap-8">
              <ul className="flex items-center gap-6 list-none p-0 m-0">
                <NavItems onLinkClick={() => {}} />
              </ul>

              {/* user menu  */}
              <div className="relative">
                <button
                  className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 
                    ${
                      user
                        ? "bg-red hover:bg-red/90 text-white shadow-lg"
                        : "text-negro hover:bg-fondos"
                    }`}
                  onClick={handleUserClick}
                  title={user ? user.nombre || user.email : "Iniciar Sesión"}
                >
                  <CircleUserRound size={24} />
                </button>

                {/* dropdown */}
                {user && showUserMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowUserMenu(false)}
                    ></div>
                    <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-cards overflow-hidden z-50 animate-in fade-in zoom-in duration-200">
                      <div className="bg-gradient-to-r from-red to-red/80 text-white p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-white/20 p-2 rounded-full">
                            <User size={20} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold truncate">
                              {user.nombre || "Usuario"}
                            </p>
                            <p className="text-sm opacity-90 truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-fondos transition-colors duration-200 text-negro text-left"
                        >
                          <LogOut size={18} className="text-red" />
                          <span className="font-medium">Cerrar Sesión</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* mobile */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-full hover:bg-fondos transition-colors"
                aria-label="Open menu"
              >
                <Menu size={24} className="text-negro" />
              </button>
            </div>
          </div>
        </div>

        <div className="h-20"></div>

        <div
          className={`fixed inset-0 z-[60] lg:hidden transition-all duration-300 ${
            isMobileMenuOpen ? "visible" : "invisible"
          }`}
        >
          <div
            className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
              isMobileMenuOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          <div
            className={`absolute top-0 right-0 h-full w-80 bg-white shadow-2xl transition-transform duration-300 ease-out ${
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="bg-gradient-to-r from-red to-red/80 text-white p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Menú</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {user && (
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-full">
                      <User size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">
                        {user.nombre || "Usuario"}
                      </p>
                      <p className="text-sm opacity-90 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4">
              <ul className="flex flex-col gap-2 list-none p-0 m-0 text-lg">
                <NavItems onLinkClick={() => setIsMobileMenuOpen(false)} />
              </ul>

              <div className="h-px bg-gray-200 my-4"></div>

              <div>
                <button
                  className={`w-full py-3 px-4 rounded-xl font-semibold
                    transition-all duration-300 shadow-lg hover:shadow-xl
                    ${
                      user
                        ? "bg-red hover:bg-red/90 text-white"
                        : "bg-blue hover:bg-blue-dark text-white"
                    }`}
                  onClick={() => {
                    if (user) {
                      handleLogout();
                    } else {
                      setIsMobileMenuOpen(false);
                      setIsLoginOpen(true);
                    }
                  }}
                >
                  {user ? (
                    <span className="flex items-center justify-center gap-2">
                      <LogOut size={18} />
                      Cerrar Sesión
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <CircleUserRound size={18} />
                      Iniciar Sesión
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <AuthModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
