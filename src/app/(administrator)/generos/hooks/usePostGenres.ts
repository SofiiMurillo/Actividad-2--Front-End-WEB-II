import { useState } from "react";

interface Genre {
  nombre: string;
  descripcion: string;
  estado: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
}

export const usePostGenres = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const postGenre = async (genre: Genre) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/generos`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(genre),
        }
      );

      if (!response.ok) {
        throw new Error("Error al enviar el genéro");
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
  return { postGenre, loading, error };
};
