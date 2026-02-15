import { useState, useEffect } from "react";
import api from "../../../../api/api";
import {
    Users,
    CheckCircle,
    Flag,
    HelpCircle,
    Activity,
    BarChart2,
    Map,
    TrendingUp
} from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ScatterChart,
    Scatter,
    ZAxis,
    BarChart,
    Bar,
    Cell
} from "recharts";
import StatCard from "./StatCard";

// formatear fecha
const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-PE", { day: "numeric", month: "short" });
};

// cuadrantes politicos
const PolticalBackground = () => (
    <g>
        <rect x="-100" y="0" width="100" height="100" fill="#fee2e2" opacity="0.3" /> {/* izquierda autoritaria */}
        <rect x="0" y="0" width="100" height="100" fill="#e0f2fe" opacity="0.3" />   {/* derecha autoritaria */}
        <rect x="-100" y="-100" width="100" height="100" fill="#dcfce7" opacity="0.3" /> {/* izquierda libertaria */}
        <rect x="0" y="-100" width="100" height="100" fill="#fef9c3" opacity="0.3" />   {/* derecha libertaria */}
        <line x1="-100" y1="0" x2="100" y2="0" stroke="#666" strokeWidth={1} />
        <line x1="0" y1="-100" x2="0" y2="100" stroke="#666" strokeWidth={1} />
    </g>
);

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        kpi: {
            usuarios: 0,
            preguntas_activas: 0,
            partidos: 0,
            tests_completados: 0,
            tests_iniciados: 0,
            promedio_eje_x: 0,
            promedio_eje_y: 0
        },
        charts: {
            activity: [],
            scatter: [],
            top_questions: []
        }
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get("/stats");
                if (response.data) {
                    setData(response.data);
                }
            } catch (error) {
                console.error("Error al cargar estadísticas:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red"></div>
            </div>
        );
    }

    // tasa de conversion
    const conversionRate = data.kpi.tests_iniciados > 0
        ? ((data.kpi.tests_completados / data.kpi.tests_iniciados) * 100).toFixed(1)
        : 0;

    // datos del grafico
    const activityData = data.charts.activity
        .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
        .map(item => ({
            ...item,
            fechaStr: formatDate(item.fecha)
        }));

    return (
        <div className="space-y-6 pb-10">

            {/* 1. kpis */}
            <h2 className="text-xl font-bold text-negro flex items-center gap-2">
                <Activity size={20} className="text-red" />
                Métricas Clave
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Tests Completados"
                    value={data.kpi.tests_completados}
                    icon={CheckCircle}
                    color="green"
                    subtitle={`Tasa de conversión: ${conversionRate}%`}
                    trend={conversionRate > 20 ? "up" : "neutral"}
                />
                <StatCard
                    title="Usuarios Registrados"
                    value={data.kpi.usuarios}
                    icon={Users}
                    color="blue"
                    subtitle="Total histórico"
                />
                <StatCard
                    title="Partidos Activos"
                    value={data.kpi.partidos}
                    icon={Flag}
                    color="red"
                />
                <StatCard
                    title="Preguntas Activas"
                    value={data.kpi.preguntas_activas}
                    icon={HelpCircle}
                    color="purple"
                />
            </div>

            {/* 2. gráficos linea 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Activity Chart */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                    <h3 className="text-lg font-bold text-negro mb-1 flex items-center gap-2">
                        <TrendingUp size={18} />
                        Actividad Diaria
                    </h3>
                    <p className="text-sm text-muted mb-4">Inicios vs Completados (Últimos 30 días)</p>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={activityData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="fechaStr" />
                                <YAxis />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="total_sesiones"
                                    name="Iniciados"
                                    stroke="#94a3b8"
                                    strokeWidth={2}
                                    dot={{ r: 3 }}
                                    activeDot={{ r: 5 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="completadas"
                                    name="Completados"
                                    stroke="#ef4444"
                                    strokeWidth={3}
                                    dot={{ r: 4 }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Compass Scatter Plot */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                    <h3 className="text-lg font-bold text-negro mb-1 flex items-center gap-2">
                        <Map size={18} />
                        Brújula de Usuarios
                    </h3>
                    <p className="text-sm text-muted mb-4">Posición política de tests completados</p>
                    <div className="h-80 w-full flex justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                <CartesianGrid />
                                <XAxis
                                    type="number"
                                    dataKey="x"
                                    name="Económico"
                                    domain={[-100, 100]}
                                    label={{ value: 'Izquierda - Derecha', position: 'bottom', offset: 0 }}
                                />
                                <YAxis
                                    type="number"
                                    dataKey="y"
                                    name="Social"
                                    domain={[-100, 100]}
                                    label={{ value: 'Liberal - Conservador', angle: -90, position: 'left' }}
                                />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                {/* Background Quadrants Reference - Custom Content */}
                                <Scatter name="Usuarios" data={data.charts.scatter} fill="#8884d8">
                                    {data.charts.scatter.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.x > 0 ? "#3b82f6" : "#ef4444"} fillOpacity={0.6} />
                                    ))}
                                </Scatter>
                            </ScatterChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* 3. gráficos linea 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Top Questions */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                    <h3 className="text-lg font-bold text-negro mb-1 flex items-center gap-2">
                        <BarChart2 size={18} />
                        Preguntas con Mayor Interacción
                    </h3>
                    <p className="text-sm text-muted mb-4">Top 5 preguntas más respondidas</p>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data.charts.top_questions} layout="vertical" margin={{ left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                                <XAxis type="number" hide />
                                <YAxis
                                    type="category"
                                    dataKey="texto"
                                    width={220}
                                    tick={{ fontSize: 10 }}
                                    tickFormatter={(value) => value.length > 40 ? `${value.substring(0, 40)}...` : value}
                                />
                                <Tooltip
                                    cursor={{ fill: '#f3f4f6' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="total_respuestas" name="Respuestas" fill="#c0262a" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top Matches (Parties) */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                    <h3 className="text-lg font-bold text-negro mb-1 flex items-center gap-2">
                        <Flag size={18} />
                        Partidos con Mayor Coincidencia
                    </h3>
                    <p className="text-sm text-muted mb-4">Calculado según afinidad (distancia euclidiana)</p>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data.charts.top_parties || []} layout="vertical" margin={{ left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                                <XAxis type="number" hide />
                                <YAxis
                                    type="category"
                                    dataKey="name"
                                    width={150}
                                    tick={{ fontSize: 11, fontWeight: 500 }}
                                />
                                <Tooltip
                                    cursor={{ fill: '#f3f4f6' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="count" name="Coincidencias" fill="#2563eb" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
