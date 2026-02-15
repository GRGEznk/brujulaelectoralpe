# 📄 Documentación Técnica: Decide.pe

Esta documentación detalla la arquitectura, estructura y componentes clave del frontend de **Decide.pe**.

---

## 🏗️ Arquitectura del Proyecto

El proyecto sigue una estructura modular basada en componentes de React, utilizando **Vite** como empaquetador y **Bun** como gestor de dependencias.

### Directorio `src/`

- **`assets/`**: Recursos estáticos (Logos de partidos, imágenes de candidatos).
- **`components/`**: Componentes UI altamente reutilizables.
- **`layouts/`**: Estructuras base de las páginas (Header/Footer compartido).
- **`pages/`**: Vistas principales de la aplicación, organizadas por módulos (Quiz, Portal, Admin).
- **`utils/`**: Funciones de utilidad y constantes.
- **`api/`**: Configuraciones de Axios y servicios para conectar con el backend.

---

## 🧭 Páginas y Rutas

La aplicación gestiona las siguientes vistas principales:

| Ruta          | Componente         | Descripción                                                            |
| ------------- | ------------------ | ---------------------------------------------------------------------- |
| `/`           | `Home`             | Página de aterrizaje con introducción y "Cómo funciona".               |
| `/quiz`       | `Quiz`             | Cuestionario político interactivo de 17 preguntas.                     |
| `/portal`     | `Portal`           | Listado de partidos políticos registrados.                             |
| `/auth`       | `Login`/`Register` | Gestión de acceso de usuarios y administradores.                       |
| `/admin`      | `Admin`            | Panel de administración para gestionar preguntas, partidos y usuarios. |
| `/comparador` | `Comparador`       | Herramienta para comparar posiciones de candidatos.                    |

---

## 🧩 Componentes Clave

### `Pregunta.jsx`

Componente central del Quiz. Es un componente puramente visual que recibe la pregunta, las opciones y los manejadores de eventos como props. Permite una navegación fluida entre las 17 preguntas del cuestionario.

### `Navbar.jsx`

Componente dinámico que ajusta sus opciones según el estado de autenticación del usuario (Invitado, Usuario registrado, Admin).

### `AuthModal.jsx` / `Modal.jsx`

Sistema de modales reutilizables para autenticación y confirmación de acciones, integrando formularios de Login y Registro.

---

## 🎨 Sistema de Estilos

- **Tailwind CSS 4**: Utilizado para el diseño utility-first.
- **DaisyUI**: Framework de componentes UI que proporciona la base para botones, modales y tablas.
- **`Global.css`**: Contiene las variables de marca (colores oficiales):
  - `--color-primary` / `--color-red`: `#be1717` (Rojo principal).
  - Fuentes personalizadas y resets globales.

---

## ⚙️ Lógica de Negocio

### Gestión del Quiz

La lógica reside principalmente en `Quiz.jsx`, que gestiona el estado de las respuestas y la navegación. Los resultados se calculan en el backend basándose en la proximidad de las respuestas del usuario con las posiciones de los partidos.

### Seguridad

Las rutas administrativas están protegidas por el componente `AdminRoute.jsx`, que verifica el rol del usuario en el localStorage/token antes de permitir el acceso.
