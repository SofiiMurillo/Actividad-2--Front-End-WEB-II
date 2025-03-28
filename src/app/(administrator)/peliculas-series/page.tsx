'use client';

import { CirclePlay, Pencil, Plus, Skull, Trash } from 'lucide-react';
import { useGetMovies } from './hooks/useGetPelicula';
import { Loader } from '@/components/ui/loader';
import { Tooltip } from '@radix-ui/react-tooltip';
import { TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useGetDirectors } from '../directores/hooks/useGetDirectors';
import { useGetGenres } from '../generos/hooks/useGetGenres';
import { useGetMultimedia } from '../multimedia/hooks/useGetMultimedia';
import { useGetProducer } from '../productoras/hooks/useGetProducer';

const PeliculasSeries = () => {
  const { getMovies, loading, error } = useGetMovies();
  const { getDirectors, loading: loadingDirectors, error: errorDirectors } = useGetDirectors(true);

  const { getGenres, loading: loadingGenres, error: errorGenres } = useGetGenres(true);

  const { getMultimedia, loading: loadingMultimedia, error: errorMultimedia } = useGetMultimedia(true);

  const { getProducer, loading: loadingProducer, error: errorproducer } = useGetProducer(true);

  return (
    <div className="flex h-full w-full flex-col p-6 gap-8">
      <h1 className="text-3xl font-bold">Películas y Series</h1>

      {error &&
        (console.log('error', error),
        (
          <h2 className="text-xl text-red-400 flex items-center gap-2 border border-red-400 p-4 rounded-xl">
            <Skull />
            ¡Error interno en el servidor, comunicate con el administrador!
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
            const director = getDirectors.find((director) => director.id === movie.director_id);
            const genero = getGenres.find((genero) => genero.id === movie.genero_id);
            const multimedia = getMultimedia.find((multimedia) => multimedia.id === movie.tipo_id);
            const productora = getProducer.find((productora) => productora.id === movie.productora_id);
            console.log('productora', productora);
            return (
              <div
                key={movie.id}
                className="bg-sidebar shadow-purple-700 rounded-lg overflow-hidden border border-purple-900 h-auto flex flex-col min-h-[400px]"
              >
                {/* Contenido principal */}
                <div className="flex-grow">
                  <img src={movie.imagen_portada} alt={movie.titulo} className="w-full h-48 object-cover" />
                  <div className="p-4 bg-sidebar flex flex-col gap-2 border-t border-purple-900">
                    <h3 className="text-xl font-bold">{movie.titulo}</h3>
                    <p className="text-white text-xs">{movie.sinopsis}</p>

                    <div className="grid grid-cols-2 gap-4 text-white text-xs text-left">
                      <div className="flex flex-col">
                        <p className="text-white text-xs font-bold">Director:</p>
                        <p className="text-white text-xs">{director?.nombres}</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-white text-xs font-bold">Género:</p>
                        <p className="text-white text-xs">{genero?.nombre}</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-white text-xs font-bold">Multimedia:</p>
                        <p className="text-white text-xs">{multimedia?.nombre}</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-white text-xs font-bold">Productora:</p>
                        <p className="text-white text-xs">{productora?.nombre}</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="font-bold">Fecha de creación:</p>
                        <p>
                          {new Date(movie.fecha_creacion).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <p className="font-bold">Fecha actualización:</p>
                        <p>
                          {new Date(movie.fecha_actualizacion).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>

                    <hr className="my-4" />

                    <div className="grid grid-cols-3 gap-4 text-white text-xs text-left mb-4">
                      <div className="flex flex-col items-start">
                        <p className="font-semibold">Año de estreno:</p>
                        <p>{movie.ano_estreno}</p>
                      </div>
                      <div className="flex flex-col items-start">
                        <p className="font-semibold">Estado:</p>
                        <p>{movie.estado ? 'Activo' : 'Inactivo'}</p>
                      </div>
                      <div className="flex flex-col items-start">
                        <p className="font-semibold">Serial:</p>
                        <p>{movie.serial}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer fijo en la parte inferior */}
                <div className="py-2 px-4 border-t border-purple-900">
                  <div className="flex justify-between items-center text-white text-xs">
                    <a
                      target="_blank"
                      href={movie.url_pelicula}
                      className="text-purple-800 flex items-center gap-2 text-xs font-bold py-2 px-4 rounded-lg border border-purple-900"
                    >
                      <CirclePlay />
                      Ver película
                    </a>
                    <div className="gap-4 flex">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span onClick={() => alert('Actualizar')} className="cursor-pointer inline-flex items-center">
                            <Pencil size={18} className="text-purple-900" />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>Actualizar</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span onClick={() => alert('Eliminar')} className="cursor-pointer inline-flex items-center">
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
        onClick={() => alert('Agregar película')}
      >
        <Plus size={24} />
      </button>
    </div>
  );
};

export default PeliculasSeries;
