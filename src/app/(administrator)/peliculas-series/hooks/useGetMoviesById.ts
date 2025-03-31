import { useState, useEffect } from 'react';
import { Peliculas } from '../types';

export const useGetMoviesById = (id: string | null) => {
  const [pelicula, setPelicula] = useState<Peliculas | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchPelicula = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/media/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener la pelicula');
        }
        const data = await response.json();
        setPelicula(data[0]);
      } catch (error: any) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPelicula();
  }, [id]);

  return { pelicula, loading, error };
};
