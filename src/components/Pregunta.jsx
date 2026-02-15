import React from "react";
import { MessageSquare } from "lucide-react";

const Pregunta = ({
    id,
    texto,
    categoria,
    value,
    onChange,
    fuente,
    onFuenteChange,
    showFuente = false,
}) => {

    const options = [
        {
            val: -2,
            label: "Totalmente en Desacuerdo",
            size: "w-12 h-12 md:w-14 md:h-14",
            activeClasses: "border-red-500 bg-red-500 text-white shadow-red-200 shadow-xl",
            idleClasses: "border-red-200 text-transparent hover:border-red-400"
        },
        {
            val: -1,
            label: "En Desacuerdo",
            size: "w-10 h-10 md:w-11 md:h-11",
            activeClasses: "border-red-400 bg-red-400 text-white shadow-red-100 shadow-lg",
            idleClasses: "border-red-200 text-transparent hover:border-red-300"
        },
        {
            val: 0,
            label: "Ni de Acuerdo ni en Desacuerdo",
            size: "w-8 h-8 md:w-9 md:h-9",
            activeClasses: "border-gray-400 bg-gray-400 text-white shadow-gray-200 shadow-md",
            idleClasses: "border-gray-200 text-transparent hover:border-gray-300"
        },
        {
            val: 1,
            label: "De Acuerdo",
            size: "w-10 h-10 md:w-11 md:h-11",
            activeClasses: "border-green-400 bg-green-400 text-white shadow-green-100 shadow-lg",
            idleClasses: "border-green-200 text-transparent hover:border-green-300"
        },
        {
            val: 2,
            label: "Totalmente de Acuerdo",
            size: "w-12 h-12 md:w-14 md:h-14",
            activeClasses: "border-green-500 bg-green-500 text-white shadow-green-200 shadow-xl",
            idleClasses: "border-green-200 text-transparent hover:border-green-400"
        },
    ];

    return (
        <div
            className="w-full bg-white rounded-[35px] p-6 md:p-10 mb-8 flex flex-col justify-between transition-all duration-300"
            style={{
                boxShadow: "10px 10px 30px rgba(0,0,0,0.05), -10px -10px 30px rgba(255,255,255,0.8)",
            }}
        >
            {/* Encabezado */}
            <div className="mb-8 md:mb-12 text-center">
                {categoria && (
                    <span className="inline-block px-4 py-1.5 rounded-full bg-blue/5 text-blue text-[10px] md:text-xs font-black uppercase tracking-widest mb-4">
                        {categoria}
                    </span>
                )}
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 leading-snug">
                    {texto}
                </h3>
            </div>

            {/* Escala Interactiva */}
            <div className="relative px-2 md:px-8 mb-4">

                {/* Línea conectora de fondo */}
                <div className="absolute top-1/2 left-8 right-8 h-1 bg-gray-100 -translate-y-1/2 -z-0 rounded-full" />

                <div className="relative z-10 flex justify-between items-center">
                    {options.map((opt) => {
                        // Verificar selección (manejo seguro de 0)
                        const isSelected = value !== null && value !== undefined && Number(value) === opt.val;

                        return (
                            <label
                                key={opt.val}
                                className="group relative cursor-pointer"
                                title={opt.label}
                            >
                                <input
                                    type="radio"
                                    name={`pregunta-${id}`}
                                    value={opt.val}
                                    checked={isSelected}
                                    onChange={() => onChange(id, opt.val)}
                                    className="peer sr-only"
                                />

                                <div
                                    className={`
                    rounded-full border-[3px] flex items-center justify-center transition-all duration-300 ease-out
                    ${opt.size}
                    ${isSelected ? `scale-110 ${opt.activeClasses}` : `bg-white ${opt.idleClasses}`}
                    group-hover:scale-105
                  `}
                                >

                                </div>


                                {!isSelected && (
                                    <div className={`
                        absolute inset-0 rounded-full opacity-0 group-hover:opacity-10 transition-opacity
                        ${opt.val < 0 ? 'bg-red-500' : opt.val > 0 ? 'bg-green-500' : 'bg-gray-500'}
                    `} />
                                )}
                            </label>
                        );
                    })}
                </div>
            </div>

            {/* Leyendas Extremas */}
            <div className="flex justify-between px-2 text-xs md:text-sm font-bold tracking-wider text-gray-400">
                <span className="text-red-400/80">En Desacuerdo</span>
                <span className="text-green-500/80">De Acuerdo</span>
            </div>

            {/* Input de Fuente (Solo Admin) */}
            {showFuente && onFuenteChange && (
                <div className="pt-8 mt-8 border-t border-gray-100 animate-in fade-in slide-in-from-top-2 text-left">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                        <MessageSquare size={16} /> Fuente / Justificación
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Pegar URL o escribir la referencia..."
                            className="w-full pl-4 pr-10 py-3 rounded-xl bg-gray-50 border-none text-sm focus:ring-2 focus:ring-blue/20 transition-all placeholder:text-gray-400 text-gray-700 font-medium"
                            value={fuente || ""}
                            onChange={(e) => onFuenteChange(id, e.target.value)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Pregunta;
