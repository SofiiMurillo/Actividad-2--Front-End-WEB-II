"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { useGetGenres } from "./hooks/useGetGenres";
import { Skull } from "lucide-react";

export default function Generos() {
  const {
    getGenres,
    loading: loadingGetGenres,
    error: errorGetGenres,
  } = useGetGenres();

  if (loadingGetGenres) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex h-full w-full flex-col p-6 gap-8">
      <h1 className="text-3xl fon">Generos</h1>

      {errorGetGenres && (
        <h2 className="text-xl text-red 400 flex items-center gap-2 border border-red-400 p-4 rounded-xl">
          <Skull /> ¡Error interno en el servidor, comunicate con el
          administrador!
        </h2>
      )}

      {!errorGetGenres && (
        <>
          <DataTable data={getGenres} columns={columns({})} />
        </>
      )}
    </div>
  );
}
