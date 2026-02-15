import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronFirst,
  ChevronLast,
  LayoutDashboard,
  Users,
  UsersRound,
  HelpCircle,
  Flag,
  Database,
  ChevronDown,
  ChevronRight,
  Circle,
  LogOut,
  Eye,
} from "lucide-react";

export const ADMIN_MENU_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    children: [],
  },
  {
    id: "usuarios",
    label: "Usuarios",
    icon: Users,
    children: [
      { id: "registro-usuarios", label: "Registro de Usuarios" },
      { id: "consulta-usuarios", label: "Consulta de usuarios" },
      { id: "consulta-usuarios-sesion", label: "Consulta de sesiones" },
    ],
  },
  {
    id: "preguntas",
    label: "Preguntas",
    icon: HelpCircle,
    children: [
      { id: "registro-preguntas", label: "Registro de Preguntas" },
      { id: "consulta-preguntas", label: "Consulta de Preguntas" },
    ],
  },
  {
    id: "partidos",
    label: "Partidos",
    icon: Flag,
    children: [
      { id: "registro-partidos", label: "Registro de Partidos" },
      { id: "registro-partido-preg", label: "Preguntas Partido" },
      { id: "consulta-partidos", label: "Gestión de Partidos" },
      { id: "consulta-posicion", label: "Matriz Electoral" },
    ],
  },
  {
    id: "candidatos",
    label: "Candidatos",
    icon: UsersRound,
    children: [
      { id: "registro-candidatos", label: "Registro de Candidatos" },
      { id: "consulta-candidatos", label: "Consulta de Candidatos" },
    ],
  },
];

// obtener titulo basado en id
export const getMenuLabel = (id) => {
  for (const item of ADMIN_MENU_ITEMS) {
    if (item.id === id) return item.label;
    if (item.children) {
      const child = item.children.find((c) => c.id === id);
      if (child) return child.label;
    }
  }
  return "";
};

export default function Sidebar({ currentView, setCurrentView }) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [user, setUser] = useState({ nombre: "", email: "" });
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing user data", e);
      }
    }
  }, []);

  const handleLogout = () => {
    if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
      localStorage.removeItem("user");
      navigate("/");
      window.location.reload();
    }
  };

  // expandir menu activo
  useEffect(() => {
    if (!collapsed) {
      for (const item of ADMIN_MENU_ITEMS) {
        if (
          item.children &&
          item.children.some((child) => child.id === currentView)
        ) {
          setExpandedMenus((prev) => ({ ...prev, [item.id]: true }));
        }
      }
    } else {
      setShowLogout(false);
    }
  }, [currentView, collapsed]);

  const toggleMenu = (menuId) => {
    if (collapsed) {
      setCollapsed(false);
      setExpandedMenus({ [menuId]: true });
    } else {
      setExpandedMenus((prev) => ({
        ...prev,
        [menuId]: !prev[menuId],
      }));
    }
  };

  return (
    <aside
      className={`
                ${collapsed ? "w-20" : "w-64"} 
                bg-red text-white shadow-lg 
                transition-all duration-300 
                flex flex-col border-r border-red-800
                z-20
            `}
    >
      <div className="p-4 border-b border-white/20 flex items-center justify-between h-20">
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-2xl font-bold truncate">Admin</h1>
            <p className="text-xs opacity-80 truncate">TuBrujulaElectoral.pe</p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`
                        p-1.5 hover:bg-white/20 rounded-lg transition-colors
                        ${collapsed ? "mx-auto" : "ml-auto"}
                    `}
          title={collapsed ? "Expandir" : "Colapsar"}
        >
          {collapsed ? <ChevronLast size={20} /> : <ChevronFirst size={20} />}
        </button>
      </div>

      <nav className="p-4 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20">
        <ul className="space-y-1">
          {ADMIN_MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = expandedMenus[item.id];
            // padre activo si vista coincide o hijo coincide
            const isActive =
              currentView === item.id ||
              (hasChildren && item.children.some((c) => c.id === currentView));

            return (
              <li key={item.id}>
                <button
                  onClick={() =>
                    hasChildren ? toggleMenu(item.id) : setCurrentView(item.id)
                  }
                  className={`
                                        w-full flex items-center gap-3 px-3 py-3 rounded-lg
                                        transition-colors duration-200 font-argentum
                                        ${isActive && !hasChildren
                      ? "bg-white text-red font-bold shadow-sm"
                      : "text-white hover:bg-white/10"
                    }
                                        ${collapsed ? "justify-center" : ""}
                                    `}
                  title={collapsed ? item.label : ""}
                >
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />

                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {hasChildren && (
                        <span className="opacity-70">
                          {isExpanded ? (
                            <ChevronDown size={16} />
                          ) : (
                            <ChevronRight size={16} />
                          )}
                        </span>
                      )}
                    </>
                  )}
                </button>

                {/* submenu */}
                {!collapsed && hasChildren && isExpanded && (
                  <div className="ml-4 mt-1 border-l-2 border-white/20 pl-2 space-y-1 overflow-hidden transition-all">
                    {item.children.map((child) => {
                      const isChildActive = currentView === child.id;
                      return (
                        <button
                          key={child.id}
                          onClick={() => setCurrentView(child.id)}
                          className={`
                                                        w-full flex items-center gap-2 px-3 py-2 rounded-md
                                                        text-sm transition-colors duration-200 font-argentum text-left
                                                        ${isChildActive
                              ? "bg-white/20 text-white font-semibold"
                              : "text-white/80 hover:bg-white/10 hover:text-white"
                            }
                                                    `}
                        >
                          {isChildActive && (
                            <Circle size={6} fill="currentColor" />
                          )}
                          <span>{child.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-white/20 relative">
        {/* menu logout */}
        {showLogout && (
          <div className="absolute bottom-full left-4 right-4 mb-2 bg-white rounded-lg shadow-xl py-2 z-50 animate-in fade-in slide-in-from-bottom-2">
            <button
              onClick={() => navigate("/")}
              className={`w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 font-bold ${collapsed ? "justify-center" : ""
                }`}
              title={collapsed ? "Ver como usuario" : ""}
            >
              <Eye size={16} />
              {!collapsed && "Ver como usuario"}
            </button>
            <button
              onClick={handleLogout}
              className={`w-full px-4 py-2 text-left text-sm text-red hover:bg-red-50 flex items-center gap-2 font-bold ${collapsed ? "justify-center" : ""
                }`}
              title={collapsed ? "Cerrar Sesión" : ""}
            >
              <LogOut size={16} />
              {!collapsed && "Cerrar Sesión"}
            </button>
          </div>
        )}

        <button
          onClick={() => setShowLogout(!showLogout)}
          className={`
                        w-full flex items-center gap-3 p-2 rounded-lg
                        hover:bg-white/10 transition-colors
                        ${collapsed ? "justify-center" : ""}
                    `}
          title="Click para opciones de sesión"
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold uppercase shrink-0">
            {user.nombre?.charAt(0) || "U"}
          </div>
          {!collapsed && (
            <div className="text-sm overflow-hidden text-left">
              <p className="font-bold truncate" title={user.nombre}>
                {user.nombre}
              </p>
              <p className="text-xs opacity-70 truncate" title={user.email}>
                {user.email}
              </p>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}
