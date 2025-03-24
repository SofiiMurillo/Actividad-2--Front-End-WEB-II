"use client";

import { CirclePlay, Pencil, Plus, Skull, Trash } from "lucide-react";
import { useGetMovies } from "./hooks/useGetPelicula";
import { Loader } from "@/components/ui/loader";
import { Tooltip } from "@radix-ui/react-tooltip";
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const PeliculasSeries = () => {
  const { getMovies, loading, error } = useGetMovies();
  console.log("getMovies", typeof getMovies);

  return (
    <div className="flex h-full w-full flex-col p-6 gap-8">
      <h1 className="text-3xl font-bold">Películas y Series</h1>

      {error &&
        (console.log("error", error),
        (
          <h2 className="text-xl text-red-400 flex items-center gap-2 border border-red-400 p-4 rounded-xl">
            <Skull />¡ Error interno en el servidor, comunicate con el
            administrador !
          </h2>
        ))}

      {loading && (
        <div className="col-span-2 flex items-center justify-center fixed inset-0 bg-var--gris-base bg-background/80 z-50">
          <Loader />
        </div>
      )}

      {!error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(getMovies).map((movie) => {
            console.log("movie", movie);
            return (
              <div
                key={movie.id}
                className="bg-sidebar shadow-purple-700 rounded-lg overflow-hidden  border border-purple-900"
              >
                <img
                  src={movie.imagen_portada}
                  alt={movie.titulo}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 bg-sidebar flex flex-col gap-2 border-t border-purple-900">
                  <h3 className="text-xl font-bold">{movie.titulo}</h3>
                  <p className="text-white text-xs">{movie.sinopsis}</p>
                  <div className="flex items-center text-white text-xs">
                    <p>Año de estreno: </p>
                    <p>{movie.ano_estreno}</p>
                  </div>
                  <div className="flex justify-between items-center text-white text-xs">
                    <a
                      target="_blank"
                      href={movie.url_pelicula}
                      className="text-purple-800 flex items-center gap-2 text-xs font-bold py-2 px-4 rounded-lg border border-purple-900"
                    >
                      <CirclePlay />
                      Ver pelicula
                    </a>
                    <div className="gap-4 flex">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span
                            onClick={() => alert("Actualizar")}
                            className="cursor-pointer inline-flex items-center"
                          >
                            <Pencil size={18} className="text-purple-900" />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>Actualizar</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span
                            onClick={() => alert("Eliminar")}
                            className="cursor-pointer inline-flex items-center"
                          >
                            <Trash size={18} className="text-purple-900" />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>Eliminar</TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <button
        className="fixed bottom-8 right-8 bg-purple-700 text-white p-3 rounded-full shadow-lg hover:bg-purple-800 focus:outline-none"
        aria-label="Agregar película"
        onClick={() => alert("Agregar película")}
      >
        <Plus size={24} />
      </button>
    </div>
  );
};

export default PeliculasSeries;
