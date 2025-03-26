export interface Multimedia {
  id: number;
  nombre: string;
  descripcion: string;
  fecha_creacion: number;
  fecha_actualizacion: number;
}

export interface UpdateAndCreateFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export interface ColumnsProps {
  handleOpenForm: (id: string) => void;
}
