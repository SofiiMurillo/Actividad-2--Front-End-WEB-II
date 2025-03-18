import { useState, useEffect } from "react";
import { Genero } from "../types";

export const useGetGenres = () => {
  const [getGenres, setGetGenres] = useState<Genero[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchGeneros = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/generos`
        );
        if (!response.ok) {
          throw new Error("Error al obtener los generos");
        }
        const data = await response.json();
        setGetGenres(data);
      } catch (error: any) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGeneros();
  }, []);

  return { getGenres, loading, error };
};
