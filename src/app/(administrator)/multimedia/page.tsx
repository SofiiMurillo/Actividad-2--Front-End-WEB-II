'use client';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { useGetMultimedia } from './hooks/useGetMultimedia';
import { useDeleteMultimedia } from './hooks/useDeleteMultimedia';
import { Skull } from 'lucide-react';
import { Loader } from '@/components/ui/loader';
import { useEffect, useState } from 'react';
import { UpdateAndCreateForm } from './components/UpdateAndCreateForm';
import { toast } from 'sonner';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';

const MultimediaPage = () => {
  const [update, setUpdate] = useState(false);
  const { getMultimedia, loading, error } = useGetMultimedia(update);
  const { deleteMultimedia, loading: deleteLoading, error: deleteError } = useDeleteMultimedia();
  const [showForm, setShowForm] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [deleteAction, setDeleteAction] = useState(false);

  const handleSuccess = () => {
    setUpdate(!update);
    toast.success(selectedId ? 'Tipo de multimedia actualizado con éxito' : 'Tipo de multimedia agregado con éxito');
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

  const handleDeleteMultimedia = async () => {
    await deleteMultimedia(selectedId);
    setUpdate(!update);
    setDeleteAction(true);
    handleCloseDeleteConfirmation();
  };
  useEffect(() => {
    if (deleteError === null && deleteAction) {
      toast.success('Tipo de multimedia eliminado con éxito');
      setDeleteAction(false);
    }
    if (deleteError && deleteAction) {
      toast.error(deleteError), setDeleteAction(false);
    }
  }, [deleteError, update, deleteAction]);

  return (
    <div className="flex h-full w-full flex-col p-6 gap-8">
      <h1 className="text-3xl font-bold">Tipos de multimedia</h1>

      {error && (
        <h2 className="text-xl text-red-400 flex items-center gap-2 border border-red-400 p-4 rounded-xl">
          <Skull />¡ Error interno en el servidor, comunícate con el administrador !
        </h2>
      )}

      {loading && deleteLoading && (
        <div className="col-span-2 flex items-center justify-center fixed inset-0 bg-var--gris-base bg-background/80 z-50">
          <Loader />
        </div>
      )}

      {!error && (
        <>
          <Button
            className="w-60 bg-gray-800 hover:bg-gray-700 text-white cursor-pointer font-bold"
            variant={'default'}
            onClick={() => handleOpenForm()}
          >
            Agregar nuevo tipo de multimedia
          </Button>
          <DataTable
            data={getMultimedia}
            columns={columns({ handleOpenForm, handleOpenDeleteConfirmation })}
            isLoading={loading}
          />
        </>
      )}

      {showForm && <UpdateAndCreateForm onClose={handleCloseForm} onSuccess={handleSuccess} id={selectedId} />}

      {showDeleteConfirmation && (
        <ConfirmDialog
          title="Eliminar tipo de multimedia"
          description="¿Estás seguro de que deseas eliminar este tipo de multimedia?"
          onConfirm={handleDeleteMultimedia}
          onCancel={handleCloseDeleteConfirmation}
        />
      )}
    </div>
  );
};

export default MultimediaPage;
