import { useState } from "react";

interface Multimedia {
  nombre: string;
  descripcion: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
}
export const usePostMultimedia = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const postMultimedia = async (multimedia: Multimedia) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/tipos_multimedia`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(multimedia),
        }
      );

      if (!response.ok) {
        throw new Error("Error al enviar el tipo de multimedia");
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
  return { postMultimedia, loading, error };
};
