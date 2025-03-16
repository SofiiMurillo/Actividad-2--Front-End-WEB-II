import { useState } from "react";

interface Director {
  nombres: string;
  estado: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

export const usePutDirectors = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const putDirector = async (id: string, director: Director) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/directores/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(director),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar el director");
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { putDirector, loading, error };
};
