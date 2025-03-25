"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { useGetGenres } from "./hooks/useGetGenres";
import { Skull } from "lucide-react";
import { Loader } from "@/components/ui/loader";
import { useState } from "react";
import { UpdateAndCreateForm } from "./components/UpdateAndCreateForm";
import { toast } from "sonner";

const GenresPage = () => {
  const [update, setUpdate] = useState(false);
  const { getGenres, loading, error } = useGetGenres(update);
  const [showForm, setShowForm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSuccess = () => {
    setUpdate(!update);
    toast.success(
      selectedId ? "Género actualizado con éxito" : "Género agregado con éxito"
    );
  };

  const handleOpenForm = (id?: string) => {
    setSelectedId(id || null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedId(null);
  };

  return (
    <div className="flex h-full w-full flex-col p-6 gap-8">
      <h1 className="text-3xl font-bold">Géneros</h1>

      {error && (
        <h2 className="text-xl text-red-400 flex items-center gap-2 border border-red-400 p-4 rounded-xl">
          <Skull />¡ Error interno en el servidor, comunícate con el
          administrador !
        </h2>
      )}

      {loading && (
        <div className="col-span-2 flex items-center justify-center fixed inset-0 bg-var--gris-base bg-background/80 z-50">
          <Loader />
        </div>
      )}

      {!error && (
        <>
          <Button
            className="w-50 bg-gray-800 hover:bg-gray-700 text-white cursor-pointer font-bold"
            variant={"default"}
            onClick={() => handleOpenForm()}
          >
            Agregar nuevo género
          </Button>
          <DataTable
            data={getGenres}
            columns={columns({ handleOpenForm })}
            isLoading={loading}
          />
        </>
      )}

      {showForm && (
        <UpdateAndCreateForm
          onClose={handleCloseForm}
          onSuccess={handleSuccess}
          id={selectedId}
        />
      )}
    </div>
  );
};

export default GenresPage;
