import { useState, useEffect } from "react";
import { Search, Edit2, Trash2, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import api from "../../../../api/api";
import { CATEGORIAS } from "./data/categorias";

export default function ConsultaPreguntas({ onEdit, onDelete }) {
    const [preguntas, setPreguntas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        texto: "",
        eje: "todos",
        direccion: "todos",
        estado: "todos",
        categoria: "todos"
    });

    // Cargar preguntas desde la API
    useEffect(() => {
        const fetchPreguntas = async () => {
            try {
                const response = await api.get('/preguntas');
                setPreguntas(response.data);
            } catch (error) {
                console.error("Error al cargar preguntas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPreguntas();
    }, []);

    // Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
        setCurrentPage(1); // Reset a primera página al filtrar
    };

    // Lógica de filtrado
    const filteredPreguntas = preguntas.filter(p => {
        const matchTexto = p.texto.toLowerCase().includes(filters.texto.toLowerCase());
        const matchEje = filters.eje === "todos" || p.eje === filters.eje;
        const matchDireccion = filters.direccion === "todos" || p.direccion.toString() === filters.direccion;
        const matchEstado = filters.estado === "todos" || p.estado === filters.estado;
        const matchCategoria = filters.categoria === "todos" || p.categoria === filters.categoria;

        return matchTexto && matchEje && matchDireccion && matchEstado && matchCategoria;
    }).sort((a, b) => a.id - b.id);

    // Paginación
    const totalPages = Math.ceil(filteredPreguntas.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredPreguntas.slice(indexOfFirstItem, indexOfLastItem);

    if (loading) {
        return <div className="p-10 text-center"><span className="loading loading-spinner loading-lg text-blue"></span></div>;
    }

    const handleDelete = async (id, texto) => {
        if (window.confirm(`¿Estás seguro de eliminar la pregunta: "${texto}"?`)) {
            try {
                await api.delete(`/preguntas/${id}`);
                setPreguntas(prev => prev.filter(p => p.id !== id));
            } catch (error) {
                console.error("Error al eliminar pregunta:", error);
                alert("Error al eliminar la pregunta");
            }
        }
    };

    const handleStatusToggle = async (id, currentStatus) => {
        const questionToUpdate = preguntas.find(p => p.id === id);
        if (!questionToUpdate) return;

        const newStatus = currentStatus === 'activa' ? 'inactiva' : 'activa';
        const updatedQuestion = { ...questionToUpdate, estado: newStatus };

        // Optimistic update
        setPreguntas(prev => prev.map(p =>
            p.id === id ? updatedQuestion : p
        ));

        try {
            await api.put(`/preguntas/${id}`, updatedQuestion);
        } catch (error) {
            console.error("Error updating status:", error);
            // Revert on error
            setPreguntas(prev => prev.map(p =>
                p.id === id ? questionToUpdate : p
            ));
            alert("Error al actualizar el estado");
        }
    };

    return (
        <div className="space-y-6 font-argentum">
            {/* Bloque 1: Filtros Avanzados */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h2 className="text-xl font-bold text-negro mb-4 flex items-center gap-2">
                    <Filter size={20} className="text-blue" />
                    Filtros de Búsqueda
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Búsqueda por texto */}
                    <div className="form-control md:col-span-2 lg:col-span-1">
                        <label className="label">
                            <span className="label-text font-semibold text-negro">Texto de la Pregunta</span>
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                name="texto"
                                value={filters.texto}
                                onChange={handleFilterChange}
                                placeholder="Buscar en el enunciado..."
                                className="input input-bordered w-full pl-10"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                    </div>

                    {/* Filtro Eje */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold text-negro">Eje Político</span>
                        </label>
                        <select
                            name="eje"
                            value={filters.eje}
                            onChange={handleFilterChange}
                            className="select select-bordered w-full"
                        >
                            <option value="todos">Todos los ejes</option>
                            <option value="X">X (Económico)</option>
                            <option value="Y">Y (Social)</option>
                        </select>
                    </div>

                    {/* Filtro Dirección */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold text-negro">Dirección</span>
                        </label>
                        <select
                            name="direccion"
                            value={filters.direccion}
                            onChange={handleFilterChange}
                            className="select select-bordered w-full"
                        >
                            <option value="todos">Todas</option>
                            <option value="1"> Conservador / Derecha (+1)</option>
                            <option value="-1">Progresista / Izquierda (-1)</option>
                        </select>
                    </div>

                    {/* Filtro Estado */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold text-negro">Estado</span>
                        </label>
                        <select
                            name="estado"
                            value={filters.estado}
                            onChange={handleFilterChange}
                            className="select select-bordered w-full"
                        >
                            <option value="todos">Todos</option>
                            <option value="activa">Activa</option>
                            <option value="inactiva">Inactiva</option>
                        </select>
                    </div>

                    {/* Filtro Categoría */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold text-negro">Categoría</span>
                        </label>
                        <select
                            name="categoria"
                            value={filters.categoria}
                            onChange={handleFilterChange}
                            className="select select-bordered w-full"
                        >
                            <option value="todos">Todas las categorías</option>
                            {CATEGORIAS.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Bloque 2: Tabla de Resultados */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-negro">
                        Listado de Preguntas
                        <span className="ml-2 text-sm font-normal text-muted">({filteredPreguntas.length} total)</span>
                    </h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-gray-50 text-negro">
                            <tr>
                                <th className="w-16">ID</th>
                                <th>Texto de la Pregunta</th>
                                <th className="text-center">Eje</th>
                                <th className="text-center">Dir.</th>
                                <th>Categoría</th>
                                <th>Estado</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {currentItems.length > 0 ? (
                                currentItems.map((p) => (
                                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="text-sm font-mono text-muted">#{p.id}</td>
                                        <td className="max-w-md">
                                            <p className="font-medium text-negro line-clamp-2">{p.texto}</p>
                                        </td>
                                        <td className="text-center">
                                            <span className={`badge ${p.eje === 'X' ? 'bg-red/10 text-red border-red/20' : 'bg-blue/10 text-blue border-blue/20'} font-bold`}>
                                                {p.eje}
                                            </span>
                                        </td>
                                        <td className="text-center font-mono font-bold">
                                            {p.direccion > 0 ? '+1' : '-1'}
                                        </td>
                                        <td>
                                            <span className="capitalize text-sm bg-gray-100 px-2 py-1 rounded">
                                                {p.categoria || 'Sin categoría'}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    className={`toggle toggle-sm ${p.estado === 'activa' ? 'toggle-success' : 'toggle-error'}`}
                                                    checked={p.estado === 'activa'}
                                                    onChange={() => handleStatusToggle(p.id, p.estado)}
                                                />
                                                <span className={`text-sm font-semibold capitalize ${p.estado === 'activa' ? 'text-green-600' : 'text-gray-400'}`}>
                                                    {p.estado}
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex justify-center gap-1">
                                                <button
                                                    onClick={() => onEdit(p)}
                                                    className="btn btn-ghost btn-sm text-blue hover:bg-blue-50"
                                                    title="Editar"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(p.id, p.texto)}
                                                    className="btn btn-ghost btn-sm text-red hover:bg-red-50"
                                                    title="Eliminar"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center py-12 text-muted italic">
                                        No se encontraron preguntas con los filtros aplicados.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Paginación */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-6 gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                            className="btn btn-sm btn-outline text-blue border-blue hover:bg-blue hover:border-blue"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <div className="flex items-center px-4 font-semibold text-negro">
                            Página {currentPage} de {totalPages}
                        </div>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            className="btn btn-sm btn-outline text-blue border-blue hover:bg-blue hover:border-blue"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
