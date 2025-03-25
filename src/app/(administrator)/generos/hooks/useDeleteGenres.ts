import { useState } from "react";

export const useDeleteGenre = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const deleteGenre = async (id: string | null) => {
    if (!id) return;

    setLoading(true);
    setError(false);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/generos/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar el género");
      }
    } catch (error: any) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { deleteGenre, loading, error };
};
