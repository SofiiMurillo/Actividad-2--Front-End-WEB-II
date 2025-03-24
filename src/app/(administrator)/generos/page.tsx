"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { useGetGenres } from "./hooks/useGetGenres";
import { Skull } from "lucide-react";
import { Loader } from "@/components/ui/loader";

export default function Generos() {
  const {
    getGenres,
    loading: loadingGetGenres,
    error: errorGetGenres,
  } = useGetGenres();

  return (
    <div className="flex h-full w-full flex-col p-6 gap-8">
      <h1 className="text-3xl font-bold">Géneros</h1>

      {errorGetGenres && (
        <h2 className="text-xl text-red-400 flex items-center gap-2 border border-red-400 p-4 rounded-xl">
          <Skull /> ¡ Error interno en el servidor, comunícate con el
          administrador !
        </h2>
      )}

      {loadingGetGenres && (
        <div className="col-span-2 flex items-center justify-center fixed inset-0 bg-var--gris-base bg-background/80 z-50">
          <Loader />
        </div>
      )}

      {!errorGetGenres && (
        <>
          <DataTable
            data={getGenres}
            columns={columns({})}
            isLoading={loadingGetGenres}
          />
        </>
      )}
    </div>
  );
}
