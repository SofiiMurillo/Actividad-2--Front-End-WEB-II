import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UpdateAndCreateFormProps } from '../types';

export function UpdateAndCreateForm({ onClose, onSuccess, id }: UpdateAndCreateFormProps & { id: string | null }) {
  const [nombre, setNombre] = React.useState('');
  const [descripcion, setDescripcion] = React.useState('');
  const [fechaCreacion, setFechaCreacion] = React.useState('');
  const [fechaActualizacion, setFechaActualizacion] = React.useState('');
  const [errors, setErrors] = React.useState({
    nombre: '',
    descripcion: '',
    fechaCreacion: '',
    fechaActualizacion: '',
  });

  const validate = () => {
    const valid = true;
    const newErrors = {
      nombre: '',
      descripcion: '',
      fechaCreacion: '',
      fechaActualizacion: '',
    };

    if (!nombre) newErrors.nombre = 'El nombre es obligatorio';
    if (!descripcion) newErrors.descripcion = 'La descripción es obligatoria';
    if (!fechaCreacion) newErrors.fechaCreacion = 'Fecha obligatoria';
    if (!fechaActualizacion) newErrors.fechaActualizacion = 'Fecha obligatoria';
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        // await postMultimedia({
        //   nombre,
        //   descripcion,
        //   fecha_creacion: fechaCreacion,
        //   fecha_actualizacion: fechaActualizacion,
        // });
        onSuccess();
        onClose();
      } catch (error) {
        console.error('Error al enviar el formulario', error);
      }
    }
  };

  const button = id ? 'Actualizar' : 'Guardar';
  return (
    <div className="fixed inset-0 bg-background/70 bg-opacity-50 flex items-center justify-center">
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle>{id ? 'Actualizar tipo de multimedia' : 'Crear tipo de multimedia'}</CardTitle>
          <CardDescription>
            {id
              ? 'Diligenciar el formulario para actualizar los datos del tipo de multimedia'
              : 'Diligenciar el formulario para crear un tipo de multimedia'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5" aria-label="Nombre">
                <Label htmlFor="nombres">Nombre</Label>
                <Input
                  id="nombre"
                  placeholder="Nombre del tipo de multimedia"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                {errors.nombre && <span className="text-error text-sm">{errors.nombre}</span>}
              </div>
              <div className="flex flex-col space-y-1.5" aria-label="descripcion">
                <Label htmlFor="nombres">Descripción</Label>
                <Textarea
                  id="descripcion"
                  placeholder="Descripción de la productora"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
                {errors.descripcion && <span className="text-error text-sm">{errors.descripcion}</span>}
              </div>
              <div className="flex gap-4 w-full">
                <div className="flex flex-col w-full">
                  <Label className="pb-1.5" htmlFor="fecha_creacion">
                    Fecha de creación
                  </Label>
                  <Input
                    id="fecha_creacion"
                    type="date"
                    className="w-full"
                    value={fechaCreacion}
                    onChange={(e) => setFechaCreacion(e.target.value)}
                  />
                  {errors.fechaCreacion && <span className="text-error text-sm mt-1">{errors.fechaCreacion}</span>}
                </div>
                <div className="flex flex-col w-full">
                  <Label className="pb-1.5" htmlFor="fecha_actualizacion">
                    Fecha de actualización
                  </Label>
                  <Input
                    id="fecha_actualizacion"
                    type="date"
                    className="w-full"
                    value={fechaActualizacion}
                    onChange={(e) => setFechaActualizacion(e.target.value)}
                  />
                  {errors.fechaActualizacion && (
                    <span className="text-error text-sm mt-1">{errors.fechaActualizacion}</span>
                  )}
                </div>
              </div>
              {/* {error && <span className="text-error text-sm">Error al enviar el formulario</span>} */}
            </div>
            <CardFooter className="flex justify-end gap-2 pt-6 -mr-6">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" className="min-w-25" /* disabled={loading} */>
                {/* loading ? <Loader /> :  */ button}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
