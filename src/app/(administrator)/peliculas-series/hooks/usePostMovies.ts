import { useState } from 'react';

interface Movie {
  titulo: string;
  sinopsis: string;
  url_pelicula: string;
  imagen_portada: string;
  ano_estreno: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
  genero_id: string;
  director_id: string;
  productora_id: string;
  tipo_id: string;
  estado: string;
  serial: string;
}

export const usePostMovies = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const postMovie = async (movie: Movie) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/media`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
      });

      if (!response.ok) {
        throw new Error('Error al enviar la pelicula');
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return { postMovie, loading, error };
};
