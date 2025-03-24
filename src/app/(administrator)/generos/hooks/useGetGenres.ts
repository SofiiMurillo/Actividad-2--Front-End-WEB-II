import { useEffect, useState } from "react";
import { Genre } from "../types";

export const useGetGenres = () => {
  const [getGenres, setGetGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/generos`
        );
        if (!response.ok) {
          throw new Error("Error al obtener los géneros");
        }
        const data = await response.json();
        setGetGenres(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return { getGenres, loading, error };
};
