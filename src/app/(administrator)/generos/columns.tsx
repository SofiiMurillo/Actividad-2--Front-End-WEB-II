import { CustomColumnDef } from "@/components/ui/data-table";
import { RowData } from "@tanstack/react-table";
import { ColumnsProps } from "./types";

export const columns = ({}: ColumnsProps): CustomColumnDef<RowData>[] => [
  {
    accessorKey: "nombre",
    header: "Nombre",
    enableSorting: true,
    canHide: false,
  },

  {
    accessorKey: "estado",
    header: "Estado",
    enableSorting: true,
    canHide: true,
  },

  {
    accessorKey: "fecha_creacion",
    header: "Fecha de creación",
    enableSorting: true,
    canHide: true,
  },

  {
    accessorKey: "fecha_actualizacion",
    header: "Fecha de actualizacion",
    enableSorting: true,
    canHide: true,
  },

  {
    accessorKey: "descripcion",
    header: "Descripción",
    enableSorting: true,
    canHide: true,
  },
];
