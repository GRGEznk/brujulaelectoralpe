import React from "react";

const Hero = ({ title, description, style }) => {
  return (
    <header
      className="w-full min-h-[400px] bg-red text-blanco flex items-center justify-center py-16 px-4 transition-colors duration-500"
      style={style}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
          {title}
        </h1>

        <p className="text-lg md:text-xl lg:text-2xl leading-relaxed opacity-95 max-w-3xl mx-auto">
          {description}
        </p>
      </div>
    </header>
  );
};

export default Hero;
