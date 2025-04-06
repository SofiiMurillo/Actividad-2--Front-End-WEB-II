import { useState, useEffect } from "react";
import { Genre } from "../types";

export const useGetGenreById = (id: string | null) => {
  const [genre, setGenre] = useState<Genre | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchGenre = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/generos/${id}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener el género");
        }
        const data = await response.json();
        setGenre(data[0]);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGenre();
  }, [id]);

  return { genre, loading, error };
};
