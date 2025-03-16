import { useState, useEffect } from "react";
import { Director } from "../types";

export const useGetDirectors = (update: boolean) => {
  const [getDirectors, setGetDirectors] = useState<Director[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchDirectores = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/directores`
        );
        if (!response.ok) {
          throw new Error("Error al obtener los directores");
        }
        const data = await response.json();
        setGetDirectors(data);
      } catch (error: any) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDirectores();
  }, [update]);

  return { getDirectors, loading, error };
};
