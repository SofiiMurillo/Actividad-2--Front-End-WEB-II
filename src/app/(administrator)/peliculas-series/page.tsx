'use client';

import { Plus, Skull } from 'lucide-react';
import { useGetMovies } from './hooks/useGetMovies';
import { Loader } from '@/components/ui/loader';
import { useGetDirectors } from '../directores/hooks/useGetDirectors';
import { useGetGenres } from '../generos/hooks/useGetGenres';
import { useGetMultimedia } from '../multimedia/hooks/useGetMultimedia';
import { useGetProducer } from '../productoras/hooks/useGetProducer';
import CardPelicula from './components/card-pelicula';
import { useState } from 'react';
import { UpdateAndCreateForm } from './components/UpdateAndCreateForm';
import { toast } from 'sonner';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { useDeleteMovie } from './hooks/useDeleteMovie';

const PeliculasSeries = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [update, setUpdate] = useState(false);

  const { getMovies, loading: loadingMovies, error } = useGetMovies(update);
  const { getDirectors, loading: loadingDirectors, error: errorDirectors } = useGetDirectors(true);
  const { getGenres, loading: loadingGenres, error: errorGenres } = useGetGenres(true);
  const { getMultimedia, loading: loadingMultimedia, error: errorMultimedia } = useGetMultimedia(true);
  const { getProducer, loading: loadingProducer, error: errorproducer } = useGetProducer(true);
  const { deleteMovie, loading: deleteLoading, error: deleteError } = useDeleteMovie();

  const loading = loadingMovies || loadingDirectors || loadingGenres || loadingMultimedia || loadingProducer;

  const handleOpenDeleteConfirmation = (id: string) => {
    setSelectedId(id);
    setShowDeleteConfirmation(true);
  };

  const handleDeletePelicula = async () => {
    await deleteMovie(selectedId);
    if (!deleteError) {
      toast.success('Pelicula eliminada con éxito');
      setUpdate(!update);
    } else {
      toast.error('Error al eliminar la pelicula');
    }
    handleCloseDeleteConfirmation();
  };

  const handleCloseDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
    setSelectedId(null);
  };

  const handleOpenForm = (id?: string) => {
    setSelectedId(id || null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedId(null);
  };

  const handleSuccess = () => {
    setUpdate(!update);
    toast.success(selectedId ? 'Tipo de multimedia actualizado con éxito' : 'Tipo de multimedia agregado con éxito');
  };

  return (
    <div className="flex h-full w-full flex-col p-6 gap-8">
      <h1 className="text-3xl font-bold">Películas y Series</h1>

      {error && (
        <h2 className="text-xl text-red-400 flex items-center gap-2 border border-red-400 p-4 rounded-xl">
          <Skull />
          ¡Error interno en el servidor, comunicate con el administrador!
        </h2>
      )}

      {loading && (
        <div className="col-span-2 flex items-center justify-center fixed inset-0 bg-var--gris-base bg-background/80 z-50">
          <Loader />
        </div>
      )}

      {!error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(getMovies)
            .sort((a, b) => b.id - a.id)
            .map((movie) => {
              const director = getDirectors.find((director) => director.id === movie.director_id);
              const genero = getGenres.find((genero) => genero.id === movie.genero_id);
              const multimedia = getMultimedia.find((multimedia) => multimedia.id === movie.tipo_id);
              const productora = getProducer.find((productora) => productora.id === movie.productora_id);

              return (
                <CardPelicula
                  key={movie.id}
                  movie={movie}
                  director={director}
                  genero={genero}
                  multimedia={multimedia}
                  productora={productora}
                  handleOpenForm={handleOpenForm}
                  handleOpenDeleteConfirmation={handleOpenDeleteConfirmation}
                />
              );
            })}
        </div>
      )}

      {showForm && (
        <UpdateAndCreateForm
          onClose={handleCloseForm}
          onSuccess={handleSuccess}
          id={selectedId}
          directores={getDirectors}
          generos={getGenres}
          productoras={getProducer}
          tiposMultimedia={getMultimedia}
        />
      )}

      {showDeleteConfirmation && (
        <ConfirmDialog
          title="Eliminar Pelicula"
          description="¿Estás seguro de que deseas eliminar esta pelicula?"
          onConfirm={handleDeletePelicula}
          onCancel={handleCloseDeleteConfirmation}
        />
      )}
      <button
        className="fixed bottom-8 right-8 bg-purple-700 text-white p-3 rounded-full shadow-lg hover:bg-purple-800 focus:outline-none"
        aria-label="Agregar película"
        onClick={() => handleOpenForm()}
      >
        <Plus size={24} />
      </button>
    </div>
  );
};

export default PeliculasSeries;
