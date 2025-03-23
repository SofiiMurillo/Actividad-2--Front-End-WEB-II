"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { useGetDirectors } from "./hooks/useGetDirectors";
import { useDeleteDirector } from "./hooks/useDeleteDirector";
import { Skull } from "lucide-react";
import { Loader } from "@/components/ui/loader";
import { useState } from "react";
import { UpdateAndCreateForm } from "./components/UpdateAndCreateForm";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

const DirectorsPage = () => {
  const [update, setUpdate] = useState(false);
  const { getDirectors, loading, error } = useGetDirectors(update);
  const { deleteDirector, loading: deleteLoading, error: deleteError } = useDeleteDirector();
  const [showForm, setShowForm] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSuccess = () => {
    setUpdate(!update);
    toast.success(selectedId ? "Director actualizado con éxito" : "Director agregado con éxito");
  };

  const handleOpenForm = (id?: string) => {
    setSelectedId(id || null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedId(null);
  };

  const handleOpenDeleteConfirmation = (id: string) => {
    setSelectedId(id);
    setShowDeleteConfirmation(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
    setSelectedId(null);
  };

  const handleDeleteDirector = async () => {
    await deleteDirector(selectedId);
    if (!deleteError) {
      toast.success("Director eliminado con éxito");
      setUpdate(!update);
    } else {
      toast.error("Error al eliminar el director");
    }
    handleCloseDeleteConfirmation();
  };

  return (
    <div className="flex h-full w-full flex-col p-6 gap-8">
      <h1 className="text-3xl font-bold">Directores</h1>

      {error && (
        <h2 className="text-xl text-red-400 flex items-center gap-2 border border-red-400 p-4 rounded-xl">
          <Skull />¡ Error interno en el servidor, comunicate con el
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
            Agregar nuevo director
          </Button>
          <DataTable
            data={getDirectors}
            columns={columns({ handleOpenForm, handleOpenDeleteConfirmation })}
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

      {showDeleteConfirmation && (
        <ConfirmDialog
          title="Eliminar Director"
          description="¿Estás seguro de que deseas eliminar este director?"
          onConfirm={handleDeleteDirector}
          onCancel={handleCloseDeleteConfirmation}
        />
      )}
    </div>
  );
};

export default DirectorsPage;
