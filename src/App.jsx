import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { watches } from "./data/watches";
import Overlay from "./Components/Overlay";

// Registrar el plugin de ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function App() {
  const [currentWatch, setCurrentWatch] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentGalleryImage, setCurrentGalleryImage] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const containerRef = useRef(null);
  const watchRefs = useRef([]);
  const backgroundRef = useRef(null);
  let direction = 0;
  const autoPlayRef = useRef(null);

  useEffect(() => {
    // Animación de entrada
    const tl = gsap.timeline();

    tl.set(".watch-container", { opacity: 0, scale: 0.8 })
      .set(".watch-info", { opacity: 0, y: 50 })
      .set(".watch-image", { opacity: 0, scale: 0.5, rotation: -180 })
      .to(".watch-container", {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
      })
      .to(
        ".watch-image",
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
        },
        "-=0.5"
      )
      .to(
        ".watch-info",
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.8"
      )
      .to(".scroll-indicator", { opacity: 1, duration: 0.5 });

    setIsLoaded(true);
    setCurrentGalleryImage(0);

    // Configurar scroll controlado
    let isScrolling = false;

    // JSX: Sin tipado del evento
    const handleWheel = (e) => {
      e.preventDefault();

      if (isScrolling) return;
      isScrolling = true;

      direction = e.deltaY > 0 ? 1 : -1;
      const nextWatch = Math.max(
        0,
        Math.min(watches.length - 1, currentWatch + direction)
      );

      if (nextWatch !== currentWatch) {
        changeWatch(nextWatch);
      }

      setTimeout(() => {
        isScrolling = false;
      }, 800);
    };

    const changeWatch = (index) => {
      setCurrentWatch(index);

      // Animación de salida del reloj actual
      gsap.to(".watch-image", {
        scale: 0.5,
        rotation: direction > 0 ? 180 : -180,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          // Animación de entrada del nuevo reloj
          gsap.to(".watch-image", {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
          });
        },
      });

      // Animación de la información
      gsap.to(".watch-info", {
        y: -30,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          gsap.to(".watch-info", {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          });
        },
      });

      // Cambio de fondo
      gsap.to(backgroundRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          gsap.to(backgroundRef.current, {
            opacity: 1,
            duration: 0.5,
          });
        },
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [currentWatch]);

  // Auto-play para el slider de galería
  useEffect(() => {
    if (isAutoPlay) {
      autoPlayRef.current = setInterval(() => {
        setCurrentGalleryImage((prev) =>
          prev === currentWatchData.gallery.length - 1 ? 0 : prev + 1
        );
      }, 2000); // Cambia cada 2 segundos
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlay, currentWatch]);

  const handleRangeChange = (e) => {
    const value = parseInt(e.target.value);
    setCurrentGalleryImage(value);
    setIsAutoPlay(false); // Pausa el auto-play cuando el usuario interactúa

    // Reactiva el auto-play después de 5 segundos de inactividad
    setTimeout(() => {
      setIsAutoPlay(true);
    }, 5000);
  };

  const currentWatchData = watches[currentWatch];

  return (
    <div className="h-screen w-full overflow-hidden relative">
      {/* Fondo dinámico */}
      <div
        ref={backgroundRef}
        className={`absolute inset-0 bg-gradient-to-br ${currentWatchData.background} transition-all duration-500`}
      />

      {/* Overlay de textura */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Contenido principal */}
      <div
        ref={containerRef}
        className="relative z-10 h-full flex items-center justify-center"
      >
        <div className="watch-container max-w-6xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Información del reloj */}
          <div className="watch-info text-white space-y-6">
            <div className="space-y-2">
              <p
                className={`text-sm font-light tracking-widest ${currentWatchData.accent} uppercase`}
              >
                Rolex Collection
              </p>

              <p className="text-xl text-gray-300 font-light">
                Model: {currentWatchData.model}
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-gray-300 text-lg leading-relaxed">
                {currentWatchData.description}
              </p>

              <div className="flex items-center space-x-6">
                <span
                  className={`text-4xl font-bold ${currentWatchData.accent}`}
                >
                  {currentWatchData.price}
                </span>
                <a href={currentWatchData.link} target="_blank">
                  <button
                    className={`px-8 py-3 bg-gradient-to-r ${
                      currentWatchData.accent.includes("purple")
                        ? "from-purple-600 to-purple-800"
                        : currentWatchData.accent.includes("yellow")
                        ? "from-yellow-600 to-yellow-800"
                        : currentWatchData.accent.includes("cyan")
                        ? "from-cyan-600 to-cyan-800"
                        : currentWatchData.accent.includes("red")
                        ? "from-red-600 to-red-800"
                        : "from-pink-600 to-pink-800"
                    } text-white font-semibold rounded-full hover:scale-105 transition-transform duration-300`}
                  >
                    DISCOVER MORE
                  </button>
                </a>
              </div>
              <div className="border border-white opacity-40"></div>
              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white">360° View</h3>
                  <button
                    onClick={() => setIsAutoPlay(!isAutoPlay)}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                      isAutoPlay
                        ? `${currentWatchData.accent.replace(
                            "text-",
                            "bg-"
                          )}/20 ${
                            currentWatchData.accent
                          } border ${currentWatchData.accent.replace(
                            "text-",
                            "border-"
                          )}`
                        : "bg-gray-700 text-gray-300 border border-gray-600"
                    }`}
                  >
                    {isAutoPlay ? "⏸ Pause" : "▶ Play"}
                  </button>
                </div>
                {/* Imagen de la galería con efecto 3D */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-y-1 group-hover:skew-y-1 transition-transform duration-500"></div>
                  <img
                    src={currentWatchData.gallery[currentGalleryImage]}
                    alt={`${currentWatchData.name} view ${
                      currentGalleryImage + 1
                    }`}
                    className="w-full h-32 lg:h-40 object-contain rounded-lg transform transition-all duration-500 hover:scale-105 shadow-2xl"
                    style={{
                      filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.5))",
                      transform: `perspective(1000px) rotateY(${
                        currentGalleryImage * 2 - 3
                      }deg)`,
                    }}
                  />
                </div>
                {/* Range Slider personalizado */}
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max={currentWatchData.gallery.length - 1}
                    value={currentGalleryImage}
                    onChange={handleRangeChange}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-slider"
                    style={{
                      background: `linear-gradient(to right, ${currentWatchData.accent.replace(
                        "text-",
                        ""
                      )} 0%, ${currentWatchData.accent.replace("text-", "")} ${
                        (currentGalleryImage /
                          (currentWatchData.gallery.length - 1)) *
                        100
                      }%, #374151 ${
                        (currentGalleryImage /
                          (currentWatchData.gallery.length - 1)) *
                        100
                      }%, #374151 100%)`,
                    }}
                  />

                  {/* Indicadores de posición */}
                  <div className="flex justify-between mt-2 text-xs text-gray-400">
                    {currentWatchData.gallery.map((_, index) => (
                      <span
                        key={index}
                        className={`transition-all duration-300 ${
                          index === currentGalleryImage
                            ? currentWatchData.accent
                            : "text-gray-500"
                        }`}
                      >
                        {index + 1}
                      </span>
                    ))}
                  </div>
                </div>{" "}
              </div>
            </div>
          </div>

          {/* Imagen del reloj */}
          <div className="flex justify-center lg:justify-end">
            <div className="watch-image relative w-full max-w-md lg:max-w-lg h-96 lg:h-[500px]">
              <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center ">
                <h1 className="text-5xl  font-bold tracking-tight">
                  {currentWatchData.name}
                </h1>
              </div>
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <img
                  src={currentWatchData.image || "/placeholder.svg"}
                  alt={currentWatchData.name}
                  className="w-64 h-64 lg:w-180 lg:h-180  object-contain drop-shadow-2xl transform transition-all duration-500 hover:scale-110 hover:opacity-30"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Overlay
        currentWatch={currentWatch}
        totalWatches={watches.length}
        currentWatchData={currentWatchData}
        watches={watches}
      />
    </div>
  );
}

export default App;
