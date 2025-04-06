import { useState } from "react";

interface Producer {
  nombre: string;
  estado: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
  slogan: string;
  descripcion: string;
}
export const usePostProducer = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const postProducer = async (producer: Producer) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/productoras`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(producer),
        }
      );

      if (!response.ok) {
        throw new Error("Error al enviar el productora");
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
  return { postProducer, loading, error };
};
