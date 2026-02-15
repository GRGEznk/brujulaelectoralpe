export default function Error404() {
  return (
    <div className="min-h-screen bg-fondos flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="text-center space-y-8">
          <div className="relative">
            <h1 className="text-[180px] md:text-[240px] font-bold text-red/10 leading-none select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-blanco rounded-3xl shadow-2xl px-12 py-8 border-4 border-red">
                <p className="text-6xl md:text-7xl font-bold text-red">
                  ¡Oops!
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4 pt-8">
            <h2 className="text-3xl md:text-4xl font-bold text-negro">
              Página no encontrada
            </h2>
            <p className="text-lg text-muted max-w-md mx-auto leading-relaxed">
              Lo sentimos, la página que buscas parece haber desaparecido en el
              ciberespacio. <br /> Puede que haya sido movida o ya no exista
            </p>
          </div>
          <div className="flex justify-center gap-2 py-6">
            <div
              className="w-3 h-3 bg-red rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="w-3 h-3 bg-blue rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-3 h-3 bg-red rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="/"
              className="bg-red hover:bg-red/90 text-blanco font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Volver al inicio
            </a>
            <button
              onClick={() => window.history.back()}
              className="bg-blanco hover:bg-cards text-negro font-semibold px-8 py-4 rounded-xl transition-all duration-300 border-2 border-cards hover:border-blue shadow-md hover:shadow-lg"
            >
              Página anterior
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
