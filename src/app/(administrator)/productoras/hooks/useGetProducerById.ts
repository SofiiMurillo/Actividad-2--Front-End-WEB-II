import { useState, useEffect } from "react";
import { Producer } from "../types";

export const useGetProducerById = (id: string | null) => {
  const [producer, setProducer] = useState<Producer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchProducer = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/productoras/${id}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener el género");
        }
        const data = await response.json();
        setProducer(data[0]);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducer();
  }, [id]);

  return { producer, loading, error };
};
