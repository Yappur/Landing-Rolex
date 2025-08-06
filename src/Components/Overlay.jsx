import React from "react";

const Overlay = ({ currentWatch, totalWatches, currentWatchData, watches }) => {
  const { colors, accent } = currentWatchData;

  return (
    <>
      {/* Indicadores de navegación */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 space-y-4">
        {watches.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-8 rounded-full transition-all duration-300 ${
              index === currentWatch ? "opacity-100" : "bg-white/30 opacity-50"
            }`}
            style={{
              backgroundColor:
                index === currentWatch ? colors.primary : undefined,
            }}
          />
        ))}
      </div>

      {/* Contador */}
      <div className="absolute bottom-8 left-8 text-white">
        <span className={`text-2xl font-bold ${accent}`}>
          {String(currentWatch + 1).padStart(2, "0")}
        </span>
        <span className="text-white/60 text-lg">
          /{String(totalWatches).padStart(2, "0")}
        </span>
      </div>

      {/* Marca de agua */}
      <a
        href="https://www.linkedin.com/in/mateoyapur/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group cursor-pointer"
      >
        <div className="relative">
          {/* Efecto de brillo de fondo */}
          <div
            className="absolute inset-0 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle, ${colors.primary}20, transparent 70%)`,
            }}
          />

          {/* Container principal */}
          <div className="relative bg-black/20 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 transition-all duration-300 hover:bg-black/30 hover:border-white/30 hover:scale-105">
            <div className="flex items-center space-x-3">
              {/* Ícono animado */}
              <div className="relative">
                <div
                  className="text-lg font-mono animate-pulse"
                  style={{ color: colors.primary }}
                >
                  &lt;&gt;
                </div>
                {/* Punto de brillo */}
                <div
                  className="absolute -top-1 -right-1 w-2 h-2 rounded-full animate-ping opacity-75"
                  style={{ backgroundColor: colors.primary }}
                />
              </div>

              {/* Texto del nombre */}
              <div className="text-white font-medium text-sm tracking-wide">
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(to right, white, ${colors.light})`,
                  }}
                >
                  Mateo Yapur
                </span>
              </div>
            </div>
          </div>

          {/* Efecto de onda al hover */}
          <div
            className="absolute inset-0 rounded-full border-2 opacity-0 group-hover:opacity-100 group-hover:animate-ping"
            style={{
              borderColor: `${colors.primary}80`,
            }}
          />
        </div>
      </a>

      {/* Logo */}
      <div className="absolute top-8 left-8 text-white">
        <h2 className="text-2xl font-bold tracking-wider">CHRONOS</h2>
        <p className="text-xs text-white/60 tracking-widest">
          LUXURY TIMEPIECES
        </p>
      </div>
    </>
  );
};

export default Overlay;
