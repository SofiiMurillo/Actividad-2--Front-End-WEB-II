export interface Producer {
  id: number;
  nombre: string;
  estado: string;
  fecha_creacion: number;
  fecha_actualizacion: number;
  slogan: string;
  descripcion: string;
}

export interface UpdateAndCreateFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export interface ColumnsProps {
  handleOpenForm: (id: string) => void;
}
