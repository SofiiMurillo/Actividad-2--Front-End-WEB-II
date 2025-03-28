import { useEffect, useState } from "react";
import { Peliculas } from "../types";

export const useGetMovies = () => {
  const [getMovies, setGetMovies] = useState<Peliculas[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/media`
        );
        const data = await response.json();
        setGetMovies(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return { getMovies, loading, error };
};
