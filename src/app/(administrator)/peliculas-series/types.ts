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
  directores: any;
  generos: any;
  productoras: any;
  tiposMultimedia: any;
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
