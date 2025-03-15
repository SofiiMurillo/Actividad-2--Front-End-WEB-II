"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { useGetDirectors } from "./hooks/useGetDirectors";
import { Skull } from "lucide-react";
import { Loader } from "@/components/ui/loader";

export default function Directores() {
  const {
    getDirectors,
    loading: loadingGetDirectos,
    error: errorGetDirectos,
  } = useGetDirectors();

  return (
    <div className="flex h-full w-full flex-col p-6 gap-8">
      <h1 className="text-3xl font-bold">Directores</h1>

      {errorGetDirectos && (
        <h2 className="text-xl text-red-400 flex items-center gap-2 border border-red-400 p-4 rounded-xl">
          <Skull />¡ Error interno en el servidor, comunicate con el
          administrador !
        </h2>
      )}

      {loadingGetDirectos && (
        <div className="col-span-2 flex items-center justify-center fixed inset-0 bg-var--gris-base bg-background/80 z-50">
          <Loader />
        </div>
      )}

      {!errorGetDirectos && (
        <>
          <DataTable
            data={getDirectors}
            columns={columns({})}
            isLoading={loadingGetDirectos}
          />
        </>
      )}
    </div>
  );
}
