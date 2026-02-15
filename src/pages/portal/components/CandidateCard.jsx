import React, { useState } from "react";

const CandidateCard = ({
  foto,
  nombres,
  apellidos,
  cargo,
  hojavida,
  numero,
  region,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col items-center p-4 border border-gray-100 relative">
      {numero && (
        <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red text-white flex items-center justify-center font-bold text-sm shadow-sm z-10">
          {numero}
        </div>
      )}
      <div className="w-32 aspect-square mb-3 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
        <img
          src={!imgError && foto ? foto : "/placeholder-user.png"}
          alt={`${nombres} ${apellidos}`}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      </div>
      <div className="text-center">
        <h3 className="font-bold text-gray-800 text-lg leading-tight">
          {nombres} {apellidos}
        </h3>
        <p className="text-sm text-gray-500 mt-1 capitalize font-medium">
          {cargo} {region && region !== "No Aplica" && ` - ${region}`}
        </p>

        {hojavida && (
          <a
            href={hojavida}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block bg-[#be1717] text-white text-xs font-bold py-2 px-4 rounded-full hover:bg-red-700 transition-colors uppercase tracking-wider"
          >
            Ver hoja de vida
          </a>
        )}
      </div>
    </div>
  );
};

export default CandidateCard;
