import { CustomColumnDef } from "@/components/ui/data-table";
import { RowData } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";
import { ColumnsProps, Director } from "./types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const columns = ({
  handleOpenForm,
}: ColumnsProps): CustomColumnDef<RowData>[] => [
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
  {
    accessorKey: "id",
    header: "ACCIONES",
    cell: ({ row }) => {
      const director = row.original as Director;
      return (
        <div className="gap-4 flex">
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                onClick={() => handleOpenForm(String(director.id))}
                className="cursor-pointer inline-flex items-center"
              >
                <Pencil size={18} />
              </span>
            </TooltipTrigger>
            <TooltipContent>Actualizar</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <span
                onClick={() => {}}
                className="cursor-pointer inline-flex items-center"
              >
                <Trash size={18} />
              </span>
            </TooltipTrigger>
            <TooltipContent>Eliminar</TooltipContent>
          </Tooltip>
        </div>
      );
    },
    canHide: false,
  },
];
