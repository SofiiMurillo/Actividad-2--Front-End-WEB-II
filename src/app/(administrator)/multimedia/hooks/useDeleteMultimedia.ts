import { useState } from "react";

export const useDeleteMultimedia = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const deleteMultimedia = async (id: string | null) => {
    if (!id) return;

    setLoading(true);
    setError(false);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/tipos_multimedia/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar la productora");
      }
    } catch (error: any) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { deleteMultimedia, loading, error };
};
