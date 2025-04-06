import { CustomColumnDef } from '@/components/ui/data-table';
import { Pencil, Trash } from 'lucide-react';
import { ColumnsProps, Genre } from './types';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export const columns = ({ handleOpenForm, handleOpenDeleteConfirmation }: ColumnsProps): CustomColumnDef<Genre>[] => [
  {
    accessorKey: 'nombre',
    header: 'Nombre',
    enableSorting: true,
    canHide: false,
  },
  {
    accessorKey: 'descripcion',
    header: 'Descripción',
    enableSorting: true,
    canHide: false,
    cell: ({ row }) => (
      <div dangerouslySetInnerHTML={{ __html: row.original.descripcion }} className="prose max-w-xs truncate" />
    ),
  },
  {
    accessorKey: 'estado',
    header: 'Estado',
    enableSorting: true,
    canHide: false,
  },
  {
    accessorKey: 'fecha_creacion',
    header: 'Fecha de creación',
    enableSorting: true,
    canHide: true,
  },
  {
    accessorKey: 'fecha_actualizacion',
    header: 'Fecha de actualización',
    enableSorting: true,
    canHide: true,
  },
  {
    accessorKey: 'id',
    header: 'ACCIONES',
    cell: ({ row }) => (
      <div className="gap-4 flex">
        <Tooltip>
          <TooltipTrigger asChild>
            <span
              onClick={() => handleOpenForm(String(row.original.id))}
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
              onClick={() => handleOpenDeleteConfirmation(String(row.original.id))}
              className="cursor-pointer inline-flex items-center"
            >
              <Trash size={18} />
            </span>
          </TooltipTrigger>
          <TooltipContent>Eliminar</TooltipContent>
        </Tooltip>
      </div>
    ),
    canHide: false,
  },
];
