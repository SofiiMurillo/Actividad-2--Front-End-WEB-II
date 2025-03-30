import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { UpdateAndCreateFormProps } from '../types';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePostMovies } from '../hooks/usePostMovies';
import { Loader } from '@/components/ui/loader';
import { usePutMovies } from '../hooks/usePutMovies';
import { useGetMoviesById } from '../hooks/useGetMoviesById';

export function UpdateAndCreateForm({
  onClose,
  onSuccess,
  id,
  directores,
  generos,
  productoras,
  tiposMultimedia,
}: UpdateAndCreateFormProps & { id: string | null }) {
  const [titulo, setTitulo] = React.useState('');
  const [estado, setEstado] = React.useState('');
  const [sinopsis, setSinopsis] = React.useState('');
  const [url_pelicula, setUrl_pelicula] = React.useState('');
  const [imagen_portada, setImagen_portada] = React.useState('');
  const [ano_estreno, setAno_estreno] = React.useState('');
  const [genero_id, setGenero_id] = React.useState('');
  const [director_id, setDirector_id] = React.useState('');
  const [productora_id, setProductora_id] = React.useState('');
  const [tipo_id, setTipo_id] = React.useState('');
  const [serial, setSerial] = React.useState('');
  const [fecha_creacion, setFecha_creacion] = React.useState('');
  const [fecha_actualizacion, setFecha_actualizacion] = React.useState('');

  const { postMovie, loading: postLoading, error: postError } = usePostMovies();
  const { putMovie, loading: putLoading, error: putError } = usePutMovies();
  const { pelicula, loading: getLoading, error: getError } = useGetMoviesById(id);

  const loading = postLoading || putLoading || getLoading;
  const error = postError || putError || getError;
  const [errors, setErrors] = React.useState({
    titulo: '',
    sinopsis: '',
    url_pelicula: '',
    imagen_portada: '',
    ano_estreno: '',
    fecha_creacion: '',
    fecha_actualizacion: '',
    genero_id: '',
    director_id: '',
    productora_id: '',
    tipo_id: '',
    estado: '',
    serial: '',
  });

  React.useEffect(() => {
    if (pelicula) {
      setTitulo(pelicula.titulo || '');
      setEstado(String(pelicula.estado) || '');
      setSinopsis(String(pelicula.sinopsis) || '');
      setUrl_pelicula(String(pelicula.url_pelicula) || '');
      setImagen_portada(String(pelicula.imagen_portada) || '');
      setAno_estreno(String(pelicula.ano_estreno) || '');
      setGenero_id(String(pelicula.genero_id) || '');
      setDirector_id(String(pelicula.director_id) || '');
      setProductora_id(String(pelicula.productora_id) || '');
      setTipo_id(String(pelicula.tipo_id) || '');
      setSerial(String(pelicula.serial) || '');
      setFecha_creacion(pelicula.fecha_creacion ? new Date(pelicula.fecha_creacion).toISOString().split('T')[0] : '');
      setFecha_actualizacion(
        pelicula.fecha_actualizacion ? new Date(pelicula.fecha_actualizacion).toISOString().split('T')[0] : ''
      );
    }
  }, [pelicula]);

  const validate = () => {
    let valid = true;
    const newErrors = {
      titulo: '',
      sinopsis: '',
      url_pelicula: '',
      imagen_portada: '',
      ano_estreno: '',
      fecha_creacion: '',
      fecha_actualizacion: '',
      genero_id: '',
      director_id: '',
      productora_id: '',
      tipo_id: '',
      estado: '',
      serial: '',
    };
    if (!titulo) {
      newErrors.titulo = 'Este campo es obligatorio';
      valid = false;
    }
    if (!sinopsis) {
      newErrors.sinopsis = 'Este campo es obligatorio';
      valid = false;
    }
    if (!url_pelicula) {
      newErrors.url_pelicula = 'Este campo es obligatorio';
      valid = false;
    }
    if (!imagen_portada) {
      newErrors.imagen_portada = 'Este campo es obligatorio';
      valid = false;
    }
    if (!ano_estreno) {
      newErrors.ano_estreno = 'Este campo es obligatorio';
      valid = false;
    }
    if (!fecha_creacion) {
      newErrors.fecha_creacion = 'Este campo es obligatorio';
      valid = false;
    }
    if (!fecha_actualizacion) {
      newErrors.fecha_actualizacion = 'Este campo es obligatorio';
      valid = false;
    }
    if (!genero_id) {
      newErrors.genero_id = 'Este campo es obligatorio';
      valid = false;
    }
    if (!director_id) {
      newErrors.director_id = 'Este campo es obligatorio';
      valid = false;
    }
    if (!productora_id) {
      newErrors.productora_id = 'Este campo es obligatorio';
      valid = false;
    }
    if (!tipo_id) {
      newErrors.tipo_id = 'Este campo es obligatorio';
      valid = false;
    }
    if (!estado) {
      newErrors.estado = 'Este campo es obligatorio';
      valid = false;
    }
    if (!serial) {
      newErrors.serial = 'Este campo es obligatorio';
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
          await putMovie(id, {
            titulo,
            sinopsis,
            url_pelicula,
            imagen_portada,
            ano_estreno,
            fecha_creacion,
            fecha_actualizacion,
            genero_id,
            director_id,
            productora_id,
            tipo_id,
            estado,
            serial,
          });
        } else {
          await postMovie({
            titulo,
            sinopsis,
            url_pelicula,
            imagen_portada,
            ano_estreno,
            fecha_creacion,
            fecha_actualizacion,
            genero_id,
            director_id,
            productora_id,
            tipo_id,
            estado,
            serial,
          });
        }
        onSuccess();
        onClose();
      } catch (error) {
        console.error('Error al enviar el formulario', error);
      }
    }
  };

  const button = id ? 'Actualizar' : 'Guardar';
  return (
    <div className="w-full mx-auto fixed z-10 inset-0 bg-background/80 flex items-center justify-center">
      <Card className="w-[80%] h-[90%]">
        <CardHeader>
          <CardTitle>{id ? 'Actualizar tipo de multimedia' : 'Crear tipo de multimedia'}</CardTitle>
          <CardDescription>
            {id
              ? 'Diligenciar el formulario para actualizar los datos del tipo de multimedia'
              : 'Diligenciar el formulario para crear un tipo de multimedia'}
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-y-auto">
          <form onSubmit={handleSubmit}>
            <div className="w-full items-center">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col space-y-1.5" aria-label="titulo">
                  <Label htmlFor="titulo">Título</Label>
                  <Input
                    id="titulo"
                    placeholder="Agregar el título"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                  />
                  {errors.titulo && <span className="text-error text-sm">{errors.titulo}</span>}
                </div>
                <div className="flex flex-col space-y-1.5 min-w-full" aria-label="estado">
                  <Label htmlFor="estado">Estado</Label>
                  <Select value={estado} onValueChange={setEstado}>
                    <SelectTrigger id="estado" className="w-full">
                      <SelectValue placeholder="Seleccione un estado" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="Activo">Activo</SelectItem>
                      <SelectItem value="Inactivo">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.estado && <span className="text-error text-sm">{errors.estado}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 mb-4">
                <div className="flex flex-col space-y-1.5" aria-label="sinopsis">
                  <Label htmlFor="sinopsis">Sinopsis</Label>
                  <Textarea
                    id="sinopsis"
                    placeholder="Agregar la sinopsis"
                    value={sinopsis}
                    onChange={(e) => setSinopsis(e.target.value)}
                  />
                  {errors.sinopsis && <span className="text-error text-sm">{errors.sinopsis}</span>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5" aria-label="url_pelicula">
                  <Label htmlFor="url_pelicula">Url de la película</Label>
                  <Input
                    id="url_pelicula"
                    placeholder="Agregar la url de película"
                    value={url_pelicula}
                    onChange={(e) => setUrl_pelicula(e.target.value)}
                  />
                  {errors.url_pelicula && <span className="text-error text-sm">{errors.url_pelicula}</span>}
                </div>
                <div className="flex flex-col space-y-1.5" aria-label="imagen_portada">
                  <Label htmlFor="imagen_portada">Url de la imagen de portada</Label>
                  <Input
                    id="imagen_portada"
                    placeholder="Agregar la url de la imagen de portada"
                    value={imagen_portada}
                    onChange={(e) => setImagen_portada(e.target.value)}
                  />
                  {errors.imagen_portada && <span className="text-error text-sm">{errors.imagen_portada}</span>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1.5" aria-label="ano_estreno">
                    <Label htmlFor="ano_estreno">Año de estreno</Label>
                    <Input
                      id="ano_estreno"
                      placeholder="Agregar el año de estreno"
                      type="number"
                      value={ano_estreno}
                      onChange={(e) => setAno_estreno(e.target.value)}
                    />
                    {errors.ano_estreno && <span className="text-error text-sm">{errors.ano_estreno}</span>}
                  </div>
                  <div className="flex flex-col space-y-1.5" aria-label="serial">
                    <Label htmlFor="serial">Serial</Label>
                    <Input
                      id="serial"
                      placeholder="Agregar el serial"
                      value={serial}
                      onChange={(e) => setSerial(e.target.value)}
                    />
                    {errors.serial && <span className="text-error text-sm">{errors.serial}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1.5" aria-label="fecha_creacion">
                    <Label htmlFor="fecha_creacion">Fecha creación</Label>
                    <Input
                      id="fecha_creacion"
                      placeholder="Agregar fecha de creación"
                      type="date"
                      value={fecha_creacion}
                      onChange={(e) => setFecha_creacion(e.target.value)}
                    />
                    {errors.fecha_creacion && <span className="text-error text-sm">{errors.fecha_creacion}</span>}
                  </div>
                  <div className="flex flex-col space-y-1.5" aria-label="fecha_actualizacion">
                    <Label htmlFor="fecha_actualizacion">Fecha actualización</Label>
                    <Input
                      id="fecha_actualizacion"
                      placeholder="Agregar fecha de actualización"
                      type="date"
                      value={fecha_actualizacion}
                      onChange={(e) => setFecha_actualizacion(e.target.value)}
                    />
                    {errors.fecha_actualizacion && (
                      <span className="text-error text-sm">{errors.fecha_actualizacion}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1.5 min-w-full" aria-label="director_id">
                    <Label htmlFor="director_id">Director</Label>
                    <Select value={director_id} onValueChange={setDirector_id}>
                      <SelectTrigger id="director_id" className="w-full">
                        <SelectValue placeholder="Seleccionar el director" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {directores.map((director: any) => (
                          <SelectItem key={director.id} value={String(director.id)}>
                            {director.nombres}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.director_id && <span className="text-error text-sm">{errors.director_id}</span>}
                  </div>

                  <div className="flex flex-col space-y-1.5 min-w-full" aria-label="genero_id">
                    <Label htmlFor="genero_id">Genero</Label>
                    <Select value={genero_id} onValueChange={setGenero_id}>
                      <SelectTrigger id="genero_id" className="w-full">
                        <SelectValue placeholder="Seleccionar el director" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {generos.map((genero: any) => (
                          <SelectItem key={genero.id} value={String(genero.id)}>
                            {genero.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.genero_id && <span className="text-error text-sm">{errors.genero_id}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1.5 min-w-full" aria-label="productora_id">
                    <Label htmlFor="productora_id">Productora</Label>
                    <Select value={productora_id} onValueChange={setProductora_id}>
                      <SelectTrigger id="productora_id" className="w-full">
                        <SelectValue placeholder="Seleccione una productora" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {productoras.map((productora: any) => (
                          <SelectItem key={productora.id} value={String(productora.id)}>
                            {productora.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.productora_id && <span className="text-error text-sm">{errors.productora_id}</span>}
                  </div>

                  <div className="flex flex-col space-y-1.5 min-w-full" aria-label="tipo_id">
                    <Label htmlFor="tipo_id">Tipo de multimedia</Label>
                    <Select value={tipo_id} onValueChange={setTipo_id}>
                      <SelectTrigger id="tipo_id" className="w-full">
                        <SelectValue placeholder="Seleccionar el tipo de multimedia" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {tiposMultimedia.map((multimedia: any) => (
                          <SelectItem key={multimedia.id} value={String(multimedia.id)}>
                            {multimedia.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.tipo_id && <span className="text-error text-sm">{errors.tipo_id}</span>}
                  </div>
                </div>
              </div>

              {error && <span className="text-error text-sm">Error al enviar el formulario</span>}
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
