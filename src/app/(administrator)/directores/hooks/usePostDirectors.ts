import { useState } from "react";

interface Director {
  nombres: string;
  estado: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

export const usePostDirectors = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const postDirector = async (director: Director) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/directores`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(director),
        }
      );

      if (!response.ok) {
        throw new Error("Error al enviar el director");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      setError((error as Error).message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { postDirector, loading, error };
};