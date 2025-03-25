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
    accessorKey: "descripcion",
    header: "Descripción",
    enableSorting: true,
    canHide: true,
  },
  {
    accessorKey: "estado",
    header: "Estado",
    enableSorting: true,
    canHide: false,
  },

  {
    accessorKey: "slogan",
    header: "Slogan",
    enableSorting: true,
    canHide: false,
  },

  {
    accessorKey: "fecha_creacion",
    header: "Fecha de creación",
    enableSorting: true,
    canHide: true,
  },
  {
    accessorKey: "fecha_actualizacion",
    header: "Fecha de actualización",
    enableSorting: true,
    canHide: true,
  },
];
