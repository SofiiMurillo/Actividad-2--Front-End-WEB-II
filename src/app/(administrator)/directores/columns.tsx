import { CustomColumnDef } from "@/components/ui/data-table";
import { RowData } from "@tanstack/react-table";
import { ColumnsProps } from "./types";

export const columns = ({}: ColumnsProps): CustomColumnDef<RowData>[] => [
  {
    accessorKey: "nombres",
    header: "Nombre",
    enableSorting: true,
    canHide: false,
  },
  {
    accessorKey: "estado",
    header: "Estado",
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
