"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { useGetMultimedia } from "./hooks/useGetMultimedia";
import { Skull } from "lucide-react";

export default function Producer() {
  const {
    getMultimedia,
    loading: loadingGetMultimedia,
    error: errorGetMultimedia,
  } = useGetMultimedia();

  if (loadingGetMultimedia) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex h-full w-full flex-col p-6 gap-8">
      <h1 className="text-3xl font-bold">Tipos de multimedia</h1>

      {errorGetMultimedia && (
        <h2 className="text-xl text-red-400 flex items-center gap-2 border border-red-400 p-4 rounded-xl">
          <Skull />¡ Error interno en el servidor, comunicate con el
          administrador !
        </h2>
      )}

      {!errorGetMultimedia && (
        <>
          <DataTable data={getMultimedia} columns={columns({})} />
        </>
      )}
    </div>
  );
}
