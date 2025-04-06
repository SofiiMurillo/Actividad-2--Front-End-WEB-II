import { useState } from "react";

interface Producer {
  nombre: string;
  estado: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
  slogan: string;
  descripcion: string;
}

export const usePutProducer = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const putProducer = async (id: string, producer: Producer) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/productoras/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(producer),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar el género");
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

  return { putProducer, loading, error };
};
