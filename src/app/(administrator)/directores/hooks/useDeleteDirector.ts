import { useState } from "react";

export const useDeleteDirector = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const deleteDirector = async (id: string | null) => {
    if (!id) return;

    setLoading(true);
    setError(false);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/directores/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar el director");
      }
    } catch (error: any) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { deleteDirector, loading, error };
};