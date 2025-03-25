"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { useGetProducer } from "./hooks/useGetProducer";
import { Skull } from "lucide-react";

export default function Producer() {
  const {
    getProducer,
    loading: loadingGetProducer,
    error: errorGetProducer,
  } = useGetProducer();

  if (loadingGetProducer) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex h-full w-full flex-col p-6 gap-8">
      <h1 className="text-3xl font-bold">Productoras</h1>

      {errorGetProducer && (
        <h2 className="text-xl text-red-400 flex items-center gap-2 border border-red-400 p-4 rounded-xl">
          <Skull />¡ Error interno en el servidor, comunicate con el
          administrador !
        </h2>
      )}

      {!errorGetProducer && (
        <>
          <DataTable data={getProducer} columns={columns({})} />
        </>
      )}
    </div>
  );
}
