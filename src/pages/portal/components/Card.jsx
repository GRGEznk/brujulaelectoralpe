import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";

const Card = ({ siglas, nombre, size = "medium" }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Tamaños predefinidos
  const sizeClasses = {
    small: {
      container: "w-[180px] p-4 rounded-2xl",
      text: "text-base",
      icon: "w-10 h-10"
    },
    medium: {
      container: "w-[220px] p-6 rounded-3xl",
      text: "text-lg",
      icon: "w-12 h-12"
    },
    large: {
      container: "w-[250px] p-8 rounded-[40px]",
      text: "text-xl",
      icon: "w-16 h-16"
    }
  };

  const { container, text, icon } = sizeClasses[size];

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  return (
    <Link
      to={`/portal/${siglas}`}
      className={`group bg-white shadow-lg ${container} flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.98] block`}
      role="button"
      tabIndex={0}
      aria-label={`Ver detalles de ${nombre}`}
      onKeyDown={(e) => e.key === 'Enter' && console.log('Card clicked')}
    >
      {/* Contenedor de imagen */}
      <div className="relative mb-4 w-full aspect-square flex items-center justify-center overflow-hidden rounded-xl bg-gray-50">
        {/* Placeholder de carga */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-3 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
          </div>
        )}

        {/* Imagen o fallback */}
        <div className={`relative w-full h-full transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}>
          {!imageError ? (
            <img
              src={`/logos/${siglas}.png`}
              alt={`Logo de ${nombre}`}
              className="w-full h-full object-contain"
              onError={handleImageError}
              onLoad={handleImageLoad}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-300">
              <svg
                className={icon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Efecto hover overlay */}
        <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
      </div>

      {/* Título con truncado mejorado */}
      <h3 className={`font-bold text-gray-800 leading-tight ${text} line-clamp-2 hover:text-[#be1717] transition-colors`}>
        {nombre}
      </h3>
    </Link>
  );
};

export default React.memo(Card);