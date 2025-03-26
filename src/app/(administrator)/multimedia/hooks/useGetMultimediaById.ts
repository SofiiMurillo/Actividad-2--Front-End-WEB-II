import { useState, useEffect } from "react";
import { Multimedia } from "../types";

export const useGetMultimediaById = (id: string | null) => {
  const [multimedia, setMultimedia] = useState<Multimedia | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchMultimedia = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/tipos_multimedia/${id}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener la multimedia");
        }
        const data = await response.json();
        setMultimedia(data[0]);
      } catch (error: any) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMultimedia();
  }, [id]);

  return { multimedia, loading, error };
};
