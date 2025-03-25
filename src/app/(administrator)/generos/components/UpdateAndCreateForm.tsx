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
import { usePostGenres } from "../hooks/usePostGenres";
import { usePutGenres } from "../hooks/usePutGenre";
import { useGetGenreById } from "../hooks/useGetGenresById";
import { UpdateAndCreateFormProps } from "../types";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export function UpdateAndCreateForm({
  onClose,
  onSuccess,
  id,
}: UpdateAndCreateFormProps & { id: string | null }) {
  const [nombre, setNombre] = React.useState("");
  const [descripcion, setDescripcion] = React.useState("");
  const [estado, setEstado] = React.useState("");
  const [fechaCreacion, setFechaCreacion] = React.useState("");
  const [fechaActualizacion, setFechaActualizacion] = React.useState("");
  const [errors, setErrors] = React.useState({
    nombre: "",
    descripcion: "",
    estado: "",
    fechaCreacion: "",
    fechaActualizacion: "",
  });

  const { genre, loading: getLoading, error: getError } = useGetGenreById(id);
  const { postGenre, loading: postLoading, error: postError } = usePostGenres();
  const { putGenre, loading: putLoading, error: putError } = usePutGenres();

  const loading = postLoading || putLoading || getLoading;
  const error = postError || putError || getError;

  React.useEffect(() => {
    if (genre) {
      setNombre(genre.nombre || "");
      setDescripcion(genre.descripcion || "");
      setEstado(String(genre.estado) || "");
      setFechaCreacion(
        genre.fecha_creacion
          ? new Date(genre.fecha_creacion).toISOString().split("T")[0]
          : ""
      );
      setFechaActualizacion(
        genre.fecha_actualizacion
          ? new Date(genre.fecha_actualizacion).toISOString().split("T")[0]
          : ""
      );
    }
  }, [genre]);

  const validate = () => {
    let valid = true;
    const newErrors = {
      nombre: "",
      descripcion: "",
      estado: "",
      fechaCreacion: "",
      fechaActualizacion: "",
    };

    if (!nombre) newErrors.nombre = "El nombre es obligatorio";
    if (!descripcion) newErrors.descripcion = "La descripción es obligatoria";
    if (!estado) newErrors.estado = "El estado es obligatorio";
    if (!fechaCreacion) newErrors.fechaCreacion = "Fecha obligatoria";
    if (!fechaActualizacion) newErrors.fechaActualizacion = "Fecha obligatoria";

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        if (id) {
          await putGenre(id, {
            nombre,
            descripcion,
            estado,
            fecha_creacion: fechaCreacion,
            fecha_actualizacion: fechaActualizacion,
          });
        } else {
          await postGenre({
            nombre,
            descripcion,
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
          <CardTitle>{id ? "Actualizar género" : "Crear género"}</CardTitle>
          <CardDescription>
            {id
              ? "Diligenciar el formulario para actualizar los datos del género"
              : "Diligenciar el formulario para crear un género"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5" aria-label="Nombre">
                <Label htmlFor="nombres">Nombre</Label>
                {getLoading ? (
                  <Skeleton className="h-9 w-full" />
                ) : (
                  <>
                    <Input
                      id="nombre"
                      placeholder="Nombre del género"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                    {errors.nombre && (
                      <span className="text-error text-sm">
                        {errors.nombre}
                      </span>
                    )}
                  </>
                )}
              </div>

              <div
                className="flex flex-col space-y-1.5"
                aria-label="descripcion"
              >
                <Label htmlFor="nombres">Descripción</Label>
                {getLoading ? (
                  <Skeleton className="h-9 w-full" />
                ) : (
                  <>
                    <Textarea
                      id="descripcion"
                      placeholder="Descripción del género"
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                    />
                    {errors.descripcion && (
                      <span className="text-error text-sm">
                        {errors.descripcion}
                      </span>
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
                    <Select value={genre?.estado} onValueChange={setEstado}>
                      <SelectTrigger id="estado">
                        <SelectValue placeholder="Seleccione un estado" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="Activo">Activo</SelectItem>
                        <SelectItem value="Inactivo">Inactivo</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.estado && (
                      <span className="text-error text-sm">
                        {errors.estado}
                      </span>
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
