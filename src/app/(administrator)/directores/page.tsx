"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { useGetDirectors } from "./hooks/useGetDirectors";
import { Skull } from "lucide-react";

export default function Directores() {
  const {
    getDirectors,
    loading: loadingGetDirectos,
    error: errorGetDirectos,
  } = useGetDirectors();

  if (loadingGetDirectos) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex h-full w-full flex-col p-6 gap-8">
      <h1 className="text-3xl font-bold">Directores</h1>

      {errorGetDirectos && (
        <h2 className="text-xl text-red-400 flex items-center gap-2 border border-red-400 p-4 rounded-xl">
          <Skull />¡ Error interno en el servidor, comunicate con el
          administrador !
        </h2>
      )}

      {!errorGetDirectos && (
        <>
          <DataTable data={getDirectors} columns={columns({})} />
        </>
      )}
    </div>
  );
}
