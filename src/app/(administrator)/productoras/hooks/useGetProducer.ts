import { useState, useEffect } from "react";
import { Producer } from "../types";

export const useGetProducer = (update: boolean) => {
  const [getProducer, setGetProducer] = useState<Producer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducer = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/productoras`
        );
        if (!response.ok) {
          throw new Error("Error al obtener las productoras");
        }
        const data = await response.json();
        setGetProducer(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducer();
  }, [update]);

  return { getProducer, loading, error };
};
