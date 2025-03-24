import { ColumnsProps } from "./types";
import { CustomColumnDef } from "../../../components/ui/data-table/index";
import { RowData } from "@tanstack/react-table";

export const columns = ({}: ColumnsProps): CustomColumnDef<RowData>[] => [
  {
    accessorKey: "nombre",
    header: "Nombre",
    enableSorting: true,
    canHide: false,
  },
  {
    accessorKey: "descripcion",
    header: "Descripcion",
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
    accessorKey: "fecha_creacion",
    header: "Fecha creación",
    enableSorting: true,
    canHide: true,
  },
  {
    accessorKey: "fecha_actualizacion",
    header: "Fecha actualización",
    enableSorting: true,
    canHide: true,
  },
];
