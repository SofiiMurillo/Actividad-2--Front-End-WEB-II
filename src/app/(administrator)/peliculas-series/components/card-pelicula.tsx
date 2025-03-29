import { CirclePlay, Pencil, Plus, Trash } from 'lucide-react';
import { Tooltip } from '@radix-ui/react-tooltip';
import { TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface CardPeliculaProps {
  movie: {
    imagen_portada: string;
    titulo: string;
    sinopsis: string;
    fecha_creacion: string;
    fecha_actualizacion: string;
    ano_estreno: number;
    estado: boolean;
    serial: string;
    url_pelicula: string;
  };
  director?: { nombres: string };
  genero?: { nombre: string };
  multimedia?: { nombre: string };
  productora?: { nombre: string };
}

const CardPelicula: React.FC<CardPeliculaProps> = ({ movie, director, genero, multimedia, productora }) => {
  return (
    <div
      aria-label='card-pelicula'
      className="bg-sidebar shadow-purple-700 rounded-lg overflow-hidden border border-purple-900 h-auto flex flex-col min-h-[400px]"
    >
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
};

export default CardPelicula;