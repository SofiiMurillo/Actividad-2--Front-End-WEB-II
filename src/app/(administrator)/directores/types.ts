export interface Director {
  id: number;
  nombres: string;
  estado: number;
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
