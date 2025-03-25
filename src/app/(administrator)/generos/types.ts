export interface Genre {
  id: number;
  nombre: string;
  descripcion: string;
  estado: string;
  fecha_creacion: number;
  fecha_actualizacion: number;
}

export interface UpdateAndCreateForm {
  onClose: () => void;
  onSuccess: () => void;
}

export interface ColumnsProps {
  handleOpenForm: (id: string) => void;
  handleOpenDeleteConfirmation: (id: string) => void;
}
