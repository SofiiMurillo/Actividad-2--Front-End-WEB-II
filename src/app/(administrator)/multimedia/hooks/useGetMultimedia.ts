import { useState, useEffect } from "react";
import { Multimedia } from "../types";

export const useGetMultimedia = (update: boolean) => {
  const [getMultimedia, setGetMultimedia] = useState<Multimedia[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchMultimedia = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/tipos_multimedia`
        );
        if (!response.ok) {
          throw new Error("Error al obtener los tipos de multimedia");
        }
        const data = await response.json();
        setGetMultimedia(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMultimedia();
  }, [update]);

  return { getMultimedia, loading, error };
};
