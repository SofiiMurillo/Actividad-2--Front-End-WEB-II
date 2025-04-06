import { Director } from './../directores/types'
import { Genre } from './../generos/types';
import { Producer } from './../productoras/types';
import { Multimedia } from './../multimedia/types';

export interface Peliculas {
  id: number;
  titulo: string;
  sinopsis: string;
  url_pelicula: string;
  imagen_portada: string;
  ano_estreno: number;
  fecha_creacion: string;
  fecha_actualizacion: string;
  genero_id: number;
  director_id: number;
  productora_id: number;
  tipo_id: number;
  estado: string;
  serial: string;
}

export interface UpdateAndCreateFormProps {
  onClose: () => void;
  onSuccess: () => void;
  directores: Director[];
  generos: Genre[];
  productoras: Producer[];
  tiposMultimedia: Multimedia[];
}

export interface CardPeliculaProps {
  movie: Peliculas;
  director?: { nombres: string };
  genero?: { nombre: string };
  multimedia?: { nombre: string };
  productora?: { nombre: string };
  handleOpenForm: (id: string) => void;
  handleOpenDeleteConfirmation: (id: string) => void;
}
