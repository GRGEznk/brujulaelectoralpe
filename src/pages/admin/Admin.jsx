import { useState, useEffect, Suspense, lazy } from "react";
import api from "../../api/api";

// componentes layout admin
import Sidebar, { getMenuLabel } from "./components/Sidebar";
import Header from "./components/header";

// Carga perezosa de componentes de sub-vistas
const RegistroPreguntas = lazy(
  () => import("./components/preguntas/RegistroPreguntas"),
);
const ConsultaPreguntas = lazy(
  () => import("./components/preguntas/ConsultaPreguntas"),
);
const RegistroUsuarios = lazy(
  () => import("./components/usuarios/RegistroUsuarios"),
);
const ConsultaUsuario = lazy(
  () => import("./components/usuarios/ConsultaUsuario"),
);
const ConsultaSesion = lazy(
  () => import("./components/usuarios/ConsultaSesion"),
);
const RegistroPartidos = lazy(
  () => import("./components/partidos/RegistroPartidos"),
);
const ConsultaPartidos = lazy(
  () => import("./components/partidos/ConsultaPartidos"),
);
const RegistroPartidoPreg = lazy(
  () => import("./components/partidos/RegistroPartidoPreg"),
);
const ConsultaPartidoPos = lazy(
  () => import("./components/partidos/ConsultaPartidoPos"),
);
const RegistroCandidato = lazy(
  () => import("./components/partidos/RegistroCandidato"),
);
const ConsultaCandidato = lazy(
  () => import("./components/partidos/ConsultaCandidato"),
);
const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));

import preguntasIniciales from "./components/preguntas/data/preguntas";
import { ADMIN_MENU_ITEMS } from "./components/Sidebar";

const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-12">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red"></div>
  </div>
);

// vistas temporales

const UsuariosView = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-negro">Gestión de Usuarios</h1>
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-negro mb-4">Nuevo Usuario</h2>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Nombre"
          className="input input-bordered w-full"
        />
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
        />
        <button
          type="submit"
          className="btn bg-blue text-white hover:bg-blue-dark"
        >
          Crear Usuario
        </button>
      </form>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-negro mb-4">
        Usuarios Registrados
      </h2>
      <p className="text-muted">No hay usuarios registrados</p>
    </div>
  </div>
);

const PartidosView = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-negro">Gestión de Partidos</h1>
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-negro mb-4">Nuevo Partido</h2>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Nombre del Partido"
          className="input input-bordered w-full"
        />
        <button
          type="submit"
          className="btn bg-blue text-white hover:bg-blue-dark"
        >
          Crear Partido
        </button>
      </form>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-negro mb-4">
        Partidos Registrados
      </h2>
      <p className="text-muted">No hay partidos registrados</p>
    </div>
  </div>
);

export default function Admin() {
  const [currentView, setCurrentView] = useState("dashboard");

  // --- estado preguntas ---
  const [preguntas, setPreguntas] = useState(preguntasIniciales);
  const [editingPregunta, setEditingPregunta] = useState(null);

  // --- estado usuarios ---
  const [editingUser, setEditingUser] = useState(null);

  // --- estado partidos ---
  const [editingPartido, setEditingPartido] = useState(null);

  // --- estado candidatos ---
  const [editingCandidato, setEditingCandidato] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const isAdmin =
      user && (user.rol === "admin" || user.rol === "administrador");
    if (!isAdmin) {
      window.location.href = "/";
    }
  }, []);

  // handlers preguntas
  const handleAddPregunta = async (formData) => {
    try {
      await api.post("/preguntas", formData);
      setCurrentView("consulta-preguntas");
    } catch (error) {
      console.error("Error al crear pregunta:", error);
      alert("Error al guardar la pregunta");
    }
  };

  const handleEditPregunta = async (formData) => {
    try {
      await api.put(`/preguntas/${formData.id}`, formData);
      setEditingPregunta(null);
      setCurrentView("consulta-preguntas");
    } catch (error) {
      console.error("Error al actualizar pregunta:", error);
      alert("Error al actualizar la pregunta");
    }
  };

  const handleDeletePregunta = (id) => {
    setPreguntas((prev) => prev.filter((p) => p.id !== id));
  };

  const handleEditCallback = (pregunta) => {
    setEditingPregunta(pregunta);
    setCurrentView("registro-preguntas");
  };

  const handleCancelEdit = () => {
    setEditingPregunta(null);
    setCurrentView("consulta-preguntas");
  };

  // handlers usuarios
  const handleEditUser = (user) => {
    setEditingUser(user);
    setCurrentView("registro-usuarios");
  };

  const handleUserSaved = () => {
    setEditingUser(null);
    setCurrentView("consulta-usuarios");
  };

  const handleCancelUserEdit = () => {
    setEditingUser(null);
    setCurrentView("consulta-usuarios");
  };

  // handlers partidos
  const handleEditPartido = (partido) => {
    setEditingPartido(partido);
    setCurrentView("registro-partidos");
  };

  const handlePartidoSaved = () => {
    setEditingPartido(null);
    setCurrentView("consulta-partidos");
  };

  const handleCancelPartidoEdit = () => {
    setEditingPartido(null);
    setCurrentView("consulta-partidos");
  };

  // handlers candidatos
  const handleEditCandidato = (candidato) => {
    setEditingCandidato(candidato);
    setCurrentView("registro-candidatos");
  };

  const handleCandidatoSaved = () => {
    setEditingCandidato(null);
    setCurrentView("consulta-candidatos");
  };

  const handleCancelCandidatoEdit = () => {
    setEditingCandidato(null);
    setCurrentView("consulta-candidatos");
  };

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard />;
      case "usuarios":
      case "consulta-usuarios":
        return <ConsultaUsuario onEdit={handleEditUser} />;
      case "registro-usuarios":
        return (
          <RegistroUsuarios
            userToEdit={editingUser}
            onSuccess={handleUserSaved}
            onCancel={handleCancelUserEdit}
          />
        );
      case "consulta-usuarios-sesion":
        return <ConsultaSesion />;

      // vistas preguntas
      case "preguntas": // fallback clic padre
      case "registro-preguntas":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-negro">
              {editingPregunta ? "Editar Pregunta" : "Registro de Preguntas"}
            </h1>
            <RegistroPreguntas
              onSubmit={
                editingPregunta ? handleEditPregunta : handleAddPregunta
              }
              editData={editingPregunta}
              onCancelEdit={handleCancelEdit}
            />
          </div>
        );
      case "consulta-preguntas":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-negro">
              Consulta de Preguntas
            </h1>
            <ConsultaPreguntas
              preguntas={preguntas}
              onEdit={handleEditCallback}
              onDelete={handleDeletePregunta}
            />
          </div>
        );

      case "partidos": // manejar clic padre
      case "registro-partidos":
        return (
          <RegistroPartidos
            partidoToEdit={editingPartido}
            onSuccess={handlePartidoSaved}
            onCancel={handleCancelPartidoEdit}
          />
        );
      case "consulta-partidos":
        return <ConsultaPartidos onEdit={handleEditPartido} />;
      case "registro-partido-preg":
        return (
          <RegistroPartidoPreg onCancel={() => setCurrentView("dashboard")} />
        );
      case "consulta-posicion":
        return <ConsultaPartidoPos />;

      // vistas candidatos
      case "candidatos":
      case "registro-candidatos":
        return (
          <RegistroCandidato
            candidatoToEdit={editingCandidato}
            onSuccess={handleCandidatoSaved}
            onCancel={handleCancelCandidatoEdit}
          />
        );
      case "consulta-candidatos":
        return <ConsultaCandidato onEdit={handleEditCandidato} />;

      default:
        return (
          <div className="p-10 text-center">
            <h2 className="text-2xl text-negro">
              Vista: {getMenuLabel(currentView)}
            </h2>
            <p className="text-muted">En construcción...</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-fondos font-argentum">
      {/* Sidebar */}
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <Header title={getMenuLabel(currentView) || "Dashboard"} />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <Suspense fallback={<LoadingSpinner />}>{renderView()}</Suspense>
        </main>
      </div>
    </div>
  );
}
