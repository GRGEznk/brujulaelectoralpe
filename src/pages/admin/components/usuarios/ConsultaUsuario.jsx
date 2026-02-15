import { useState, useEffect } from "react";
import { Search, Edit2, Trash2, Filter } from "lucide-react";
import api from "../../../../api/api";

export default function ConsultaUsuario({ onEdit }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        nombre: "",
        rol: "todos",
        fechaInicio: "",
        fechaFin: ""
    });
    // paginacion
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // cargar usuarios
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get('/usuarios');
            setUsers(response.data);
        } catch (error) {
            console.error("Error al cargar usuarios:", error);
        } finally {
            setLoading(false);
        }
    };

    // eliminar
    const handleDelete = async (id) => {
        if (!confirm("¿Estás seguro de que quieres eliminar este usuario?")) return;

        try {
            await api.delete(`/usuarios/${id}`);
            alert("Usuario eliminado");
            fetchUsers(); // recargar
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            alert("Error al eliminar usuario");
        }
    };

    // filtros
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
        setCurrentPage(1); // resetear pagina
    };

    // aplicar filtros
    const filteredUsers = users.filter(user => {
        const nombreDisplay = user.nombre || user.email.split('@')[0];
        const matchNombre = nombreDisplay.toLowerCase().includes(filters.nombre.toLowerCase());
        const matchRol = filters.rol === "todos" || user.rol === filters.rol;
        // comparar fecha
        const fechaRegistro = user.fecha_registro ? new Date(user.fecha_registro).toISOString().split('T')[0] : "";

        const matchFechaInicio = !filters.fechaInicio || (fechaRegistro && fechaRegistro >= filters.fechaInicio);
        const matchFechaFin = !filters.fechaFin || (fechaRegistro && fechaRegistro <= filters.fechaFin);

        return matchNombre && matchRol && matchFechaInicio && matchFechaFin;
    });

    // logica paginacion
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return <div className="p-10 text-center"><span className="loading loading-spinner loading-lg text-blue"></span></div>;
    }

    return (
        <div className="space-y-6 font-argentum">

            {/* bloques filtros */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h2 className="text-xl font-bold text-negro mb-4 flex items-center gap-2">
                    <Filter size={20} className="text-blue" />
                    Filtros de Búsqueda
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* filtro nombre */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold text-negro">Buscar por Nombre</span>
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                name="nombre"
                                value={filters.nombre}
                                onChange={handleFilterChange}
                                placeholder="Ej: Juan"
                                className="input input-bordered w-full pl-10"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                    </div>

                    {/* filtro rol */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold text-negro">Filtrar por Rol</span>
                        </label>
                        <select
                            name="rol"
                            value={filters.rol}
                            onChange={handleFilterChange}
                            className="select select-bordered w-full"
                        >
                            <option value="todos">Todos los roles</option>
                            <option value="admin">Administrador</option>
                            <option value="user">Usuario</option>
                        </select>
                    </div>

                    {/* filtro fecha desde */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold text-negro">Fecha Desde</span>
                        </label>
                        <input
                            type="date"
                            name="fechaInicio"
                            value={filters.fechaInicio}
                            onChange={handleFilterChange}
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* filtro fecha hasta */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold text-negro">Fecha Hasta</span>
                        </label>
                        <input
                            type="date"
                            name="fechaFin"
                            value={filters.fechaFin}
                            onChange={handleFilterChange}
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>
            </div>

            {/* bloque tabla */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-negro">Usuarios Registrados ({filteredUsers.length})</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead className="bg-gray-50 text-negro">
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Rol</th>
                                <th>Correo</th>
                                <th>Fecha Registro</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.length > 0 ? (
                                currentUsers.map((user) => (
                                    <tr key={user.id} className="hover">
                                        <td className="font-mono text-sm text-muted">#{user.id}</td>
                                        <td className="font-semibold capitalize">
                                            {user.nombre || user.email.split('@')[0].replace('.', ' ')}
                                        </td>
                                        <td>
                                            <span className={`badge ${user.rol === 'admin' ? 'badge-primary text-white' : 'badge-ghost'}`}>
                                                {user.rol === 'admin' ? 'Administrador' : 'Usuario'}
                                            </span>
                                        </td>
                                        <td className="text-muted">{user.email}</td>
                                        <td className="text-sm text-muted whitespace-nowrap">
                                            {user.fecha_registro ? new Date(user.fecha_registro).toLocaleDateString() : "-"}
                                        </td>
                                        <td>
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() => onEdit && onEdit(user)}
                                                    className="btn btn-ghost btn-sm text-blue hover:bg-blue-50"
                                                    title="Editar"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user.id)}
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
                                    <td colSpan="6" className="text-center py-8 text-muted">
                                        No se encontraron usuarios con los filtros seleccionados.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* paginacion */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-6 gap-2">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => paginate(i + 1)}
                                className={`btn btn-sm ${currentPage === i + 1 ? 'text-white border-none' : 'btn-ghost'}`}
                                style={currentPage === i + 1 ? { backgroundColor: '#be1717' } : {}}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
