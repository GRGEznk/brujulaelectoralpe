import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";

// Lazy loading de páginas
const Home = lazy(() => import("./pages/home/Home"));
const Nosotros = lazy(() => import("./pages/nosotros/Nosotros"));
const Comparador = lazy(() => import("./pages/comparador/Comparador"));
const Quiz = lazy(() => import("./pages/quiz/Quiz"));
const Resultado = lazy(() => import("./pages/quiz/components/Resultado"));
const Portal = lazy(() => import("./pages/portal/Portal"));
const VistaPartido = lazy(
  () => import("./pages/portal/components/VistaPartido"),
);
const Admin = lazy(() => import("./pages/admin/Admin"));
const Error404 = lazy(() => import("./pages/Error404"));

import AdminRoute from "./components/AdminRoute";

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-fondos">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red"></div>
  </div>
);

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/comparador" element={<Comparador />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/resultado" element={<Resultado />} />
          <Route path="/resultado/:slug" element={<Resultado />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="/portal/:sigla" element={<VistaPartido />} />
          <Route path="*" element={<Error404 />} />
        </Route>
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}
export default App;
