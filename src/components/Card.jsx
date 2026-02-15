import React from "react";

const Card = ({ ico, titulo, texto }) => {
  return (
    <div className="rounded-[40px] bg-fondos shadow-xl p-8 flex flex-col items-center text-center transition-transform duration-300 ease-in-out hover:translate-y-[-5px] max-w-[300px] w-full">
      <div className="mb-5">{ico}</div>
      <h3 className="text-2xl font-bold text-negro mb-4">{titulo}</h3>
      <p className="text-base text-muted">{texto}</p>
    </div>
  );
};

export default Card;
