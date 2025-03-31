import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePostDirectors } from "../hooks/usePostDirectors";
import { usePutDirectors } from "../hooks/usePutDirectors";
import { useGetDirectorById } from "../hooks/useGetDirectorById";
import { UpdateAndCreateFormProps } from "../types";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader } from "lucide-react";

export function UpdateAndCreateForm({
  onClose,
  onSuccess,
  id,
}: UpdateAndCreateFormProps & { id: string | null }) {
  const [nombre, setNombre] = React.useState("");
  const [estado, setEstado] = React.useState("");
  const [fechaCreacion, setFechaCreacion] = React.useState("");
  const [fechaActualizacion, setFechaActualizacion] = React.useState("");
  const [errors, setErrors] = React.useState({
    nombre: "",
    estado: "",
    fechaCreacion: "",
    fechaActualizacion: "",
  });

  const {
    director,
    loading: getLoading,
    error: getError,
  } = useGetDirectorById(id);
  const {
    postDirector,
    loading: postLoading,
    error: postError,
  } = usePostDirectors();
  const {
    putDirector,
    loading: putLoading,
    error: putError,
  } = usePutDirectors();

  const loading = postLoading || putLoading || getLoading;
  const error = postError || putError || getError;

  React.useEffect(() => {
    if (director) {
      setNombre(director.nombres || "");
      setEstado(String(director.estado) || "");
      setFechaCreacion(
        director.fecha_creacion
          ? new Date(director.fecha_creacion).toISOString().split("T")[0]
          : ""
      );
      setFechaActualizacion(
        director.fecha_actualizacion
          ? new Date(director.fecha_actualizacion).toISOString().split("T")[0]
          : ""
      );
    }
  }, [director]);

  const validate = () => {
    let valid = true;
    const newErrors = {
      nombre: "",
      estado: "",
      fechaCreacion: "",
      fechaActualizacion: "",
    };

    if (!nombre) {
      newErrors.nombre = "El nombre es obligatorio";
      valid = false;
    }
    if (!estado) {
      newErrors.estado = "El estado es obligatorio";
      valid = false;
    }
    if (!fechaCreacion) {
      newErrors.fechaCreacion = "Fecha obligatoria";
      valid = false;
    }
    if (!fechaActualizacion) {
      newErrors.fechaActualizacion = "Fecha obligatoria";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        if (id) {
          await putDirector(id, {
            nombres: nombre,
            estado,
            fecha_creacion: fechaCreacion,
            fecha_actualizacion: fechaActualizacion,
          });
        } else {
          await postDirector({
            nombres: nombre,
            estado,
            fecha_creacion: fechaCreacion,
            fecha_actualizacion: fechaActualizacion,
          });
        }
        onSuccess();
        onClose();
      } catch (error) {
        console.error("Error al enviar el formulario", error);
      }
    }
  };

  const button = id ? "Actualizar" : "Guardar";

  return (
    <div className="fixed inset-0 bg-background/70 bg-opacity-50 flex items-center justify-center">
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle>{id ? "Actualizar director" : "Crear director"}</CardTitle>
          <CardDescription>
            {id
              ? "Diligenciar el formulario para actualizar los datos del director"
              : "Diligenciar el formulario para crear un director"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="nombres">Nombre</Label>
                {getLoading ? (
                  <Skeleton className="h-9 w-full" />
                ) : (
                  <>
                    <Input
                      id="nombres"
                      placeholder="Nombre del director"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                    {errors.nombre && (
                      <span className="text-error text-sm">{errors.nombre}</span>
                    )}
                  </>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="estado">Estado</Label>
                {getLoading ? (
                  <Skeleton className="h-9 w-24 mb-1.5" />
                ) : (
                  <>
                    <Select value={director?.estado} onValueChange={setEstado}>
                      <SelectTrigger id="estado">
                        <SelectValue placeholder="Seleccione un estado" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="Activo">Activo</SelectItem>
                        <SelectItem value="Inactivo">Inactivo</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.estado && (
                      <span className="text-error text-sm">{errors.estado}</span>
                    )}
                  </>
                )}
              </div>
              <div className="flex gap-4 w-full">
                <div className="flex flex-col w-full">
                  <Label className="pb-1.5" htmlFor="fecha_creacion">
                    Fecha de creación
                  </Label>
                  {getLoading ? (
                    <Skeleton className="h-9 w-full" />
                  ) : (
                    <>
                      <Input
                        id="fecha_creacion"
                        type="date"
                        className="w-full"
                        value={fechaCreacion}
                        onChange={(e) => setFechaCreacion(e.target.value)}
                      />
                      {errors.fechaCreacion && (
                        <span className="text-error text-sm mt-1">
                          {errors.fechaCreacion}
                        </span>
                      )}
                    </>
                  )}
                </div>
                <div className="flex flex-col w-full">
                  <Label className="pb-1.5" htmlFor="fecha_actualizacion">
                    Fecha de actualización
                  </Label>
                  {getLoading ? (
                    <Skeleton className="h-9 w-full" />
                  ) : (
                    <>
                      <Input
                        id="fecha_actualizacion"
                        type="date"
                        className="w-full"
                        value={fechaActualizacion}
                        onChange={(e) => setFechaActualizacion(e.target.value)}
                      />
                      {errors.fechaActualizacion && (
                        <span className="text-error text-sm mt-1">
                          {errors.fechaActualizacion}
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>
              {error && (
                <span className="text-error text-sm">
                  Error al enviar el formulario
                </span>
              )}
            </div>
            <CardFooter className="flex justify-end gap-2 pt-6 -mr-6">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" className="min-w-25" disabled={loading}>
                {loading ? <Loader /> : button}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
