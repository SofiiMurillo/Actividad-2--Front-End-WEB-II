import { Button } from "./button";

interface ConfirmDialogProps {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  title,
  description,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 bg-background/70 bg-opacity-50 flex items-center justify-center">
      <div className="bg-sidebar p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="mt-4">{description}</p>
        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  );
};