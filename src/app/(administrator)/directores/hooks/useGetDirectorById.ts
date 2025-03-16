import { useState, useEffect } from "react";
import { Director } from "../types";

export const useGetDirectorById = (id: string | null) => {
  const [director, setDirector] = useState<Director | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchDirector = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/directores/${id}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener el director");
        }
        const data = await response.json();
        setDirector(data[0]);
      } catch (error: any) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDirector();
  }, [id]);

  return { director, loading, error };
};
