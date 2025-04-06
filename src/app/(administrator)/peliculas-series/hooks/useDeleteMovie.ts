import { useState } from "react";

export const useDeleteMovie = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const deleteMovie = async (id: string | null) => {
    if (!id) return;

    setLoading(true);
    setError(false);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/media/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar la película");
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { deleteMovie, loading, error };
};