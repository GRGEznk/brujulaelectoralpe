import { Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import Home from "./pages/home/Home";
import Nosotros from "./pages/nosotros/Nosotros";
import Comparador from "./pages/comparador/Comparador";
import Quiz from "./pages/quiz/Quiz";
import Resultado from "./pages/quiz/components/Resultado";
import Portal from "./pages/portal/Portal";
import VistaPartido from "./pages/portal/components/VistaPartido";
import Admin from "./pages/admin/Admin";
import Error404 from "./pages/Error404";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
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
  );
}
export default App;
