import { CustomColumnDef } from "@/components/ui/data-table";
import { RowData } from "@tanstack/react-table";
import { ColumnsProps, Multimedia } from "./types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Pencil, Trash } from "lucide-react";

export const columns = ({
  handleOpenForm,
}: ColumnsProps): CustomColumnDef<RowData>[] => [
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
    cell: ({ row }) => (
      <div
        dangerouslySetInnerHTML={{ __html: row.original.descripcion }}
        className="prose max-w-xs truncate"
      />
    ),
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
      const multimedia = row.original as Multimedia;
      return (
        <div className="gap-4 flex">
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                onClick={() => handleOpenForm(String(multimedia.id))}
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
