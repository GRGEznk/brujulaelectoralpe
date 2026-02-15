# 🗺️ Roadmap: Decide.pe

Este documento describe las tareas pendientes, correcciones y mejoras planificadas para las próximas actualizaciones del proyecto frontend.

---

## 🚀 Próxima Actualización (Q1 2026)

### 🔔 Gestión de Alertas y Modales

- [ ] **Feedback Positivo**: Implementar Toast alerts o modales de éxito al completar el Quiz o guardar cambios en Admin.
- [ ] **Mensajes de Error**: Mejorar la visualización de errores de API (ej. credenciales incorrectas, fallo de red) mediante alertas de DaisyUI.
- [ ] **Confirmaciones**: Añadir modales de confirmación antes de eliminar registros en el panel de administración.

### 🎭 Animaciones y Transiciones

- [ ] **Transiciones de Preguntas**: Añadir un efecto de _cross-fade_ o _slide_ al cambiar entre preguntas en el Quiz para una experiencia más "premium".
- [ ] **Micro-interacciones**: Suavizar los efectos hover en botones y tarjetas de candidatos.
- [ ] **Skeleton Loaders**: Implementar estados de carga (skeletons) mientras se obtienen los datos de la API.

### 📱 Optimización Mobile (Mobile First)

- [ ] **Responsividad del Quiz**: Ajustar el tamaño de las tarjetas de preguntas para pantallas pequeñas.
- [ ] **Tablas Admin**: Implementar vistas de lista o tablas con scroll horizontal para el panel administrativo en móviles.
- [ ] **Menú Mobile**: Refinar el Drawer de DaisyUI en la Navbar para asegurar que todas las opciones sean accesibles.

---

## 🛠️ Deuda Técnica y Dependencias Futuras

- [ ] **Manejo de Errores Global**: Configurar un Interceptor de Axios para capturar errores 401/403 de forma centralizada.
- [ ] **Optimización de Assets**: Comprimir las imágenes de candidatos y logos de partidos para mejorar el tiempo de carga inicial.
- [ ] **Tests Unitarios**: Comenzar la implementación de pruebas básicas para los componentes `Pregunta.jsx` y `utils/`.
- [ ] **Accesibilidad (A11y)**: Revisar contrastes de color y etiquetas ARIA en componentes interactivos.

---

## ⚠️ Errores Conocidos

- [ ] Desalineación ocasional en el gráfico de Matriz Electoral en pantallas `sm`.
- [ ] Refresco manual necesario tras cierto tipo de actualizaciones en el panel Admin.
