import React, { useEffect, useState } from 'react';
import { Button, Container, Heading, Stack, Select, FormControl, FormLabel, Input, HStack,Box } from '@chakra-ui/react';
import InputForm from '../components/InputForm';
import router from 'next/router';

import { VerTalla } from '../tienda/talla';
import { VerInstitucion } from '../tienda/institucion';
import { CrearProducto } from '../tienda/producto';
import Swal from 'sweetalert2';

const ProductoCrear = () => {
  const [talla, setTalla] = useState([]);
  const [institucion, setInstitucion] = useState([]);
  const [filtroInstitucion, setFiltroInstitucion] = useState('');

  useEffect(() => {
    VerTalla().then((res) => {
      setTalla(res.data);
    });
    VerInstitucion().then((res) => {
      setInstitucion(res.data);
    });
  }, []);

  const [producto, setProducto] = useState({
    _id: '',
    nombre: '',
    talla: '',
    institucion: '',
  });

  const bodytalla = () => {
    return talla.map((tallas) => (
      <option value={tallas._id} key={tallas._id}>
        {tallas.nombre}
      </option>
    ));
  };

  const bodyinstitucion = () => {
    const institucionesFiltradas = filtroInstitucion
      ? institucion.filter((inst) => inst.nombre.toLowerCase().includes(filtroInstitucion.toLowerCase()))
      : institucion;

    return institucionesFiltradas.map((inst) => (
      <option value={inst._id} key={inst._id}>
        {inst.nombre}
      </option>
    ));
  };

  const cambioaproducto = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const productocrear = async (e) => {
    e.preventDefault();
  
    console.log(producto);
  
    try {
      const response = await CrearProducto(producto);
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Producto guardado',
          showConfirmButton: true,
          text: 'Producto está correcto',
        }).then(() => {
          router.push('./producto');
        });
      } else {
        throw new Error('Error al crear el producto');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        showConfirmButton: true,
        text: 'Producto erróneo',
      });
    }
  };
  

  // Función para filtrar las opciones de la barra desplegable
  const filterOptions = (option, inputValue) => {
    return option.props.children.toLowerCase().includes(inputValue.toLowerCase());
  };

  return (
    <Container maxW="container.lg" my="50">
      <Box p="6" borderWidth="1px" borderRadius="lg" margin="auto">
      <Stack spacing={5} my="30">
        <Heading
      as="h1"
      size="2xl"
      color="teal.500" // Cambia el color del texto a un tono de verde azulado
      textAlign="center"
      mt="15"
      fontFamily="New Romance" // Si ya has definido la fuente "New Romance" en globals.css, puedes usarla aquí
      textShadow="1px 1px 3px rgba(0, 0, 0, 0.3)" // Agrega un sombreado al texto
    >
      
      Registrar 
      Producto
    </Heading>
      </Stack>

      <Container maxW="container.lg" marginTop="40">
        <Stack spacing={8}>
          <b />
          <FormControl id="nombre">
            <FormLabel>Ingresar nombre del producto</FormLabel>
            <InputForm
              type="text"
              name="nombre"
              placeholder="EJ: Buzo cafe"
              handlechange={cambioaproducto}
              value={producto.nombre}
            />
          </FormControl>

          <FormControl id="talla">
            <FormLabel>Talla</FormLabel>
            <Select variant="filled" name="talla" onChange={cambioaproducto} placeholder="Seleccionar Talla">
              {bodytalla()}
            </Select>
          </FormControl>

          <FormControl id="institucion">
            <FormLabel>Ingresar nombre de institución a buscar</FormLabel>
            <Input
              type="text"
              name="institucion"
              placeholder="EJ: escuela"
              onChange={(e) => setFiltroInstitucion(e.target.value)}
              value={filtroInstitucion}
              marginBottom="4" // Agregamos margen inferior al Input
            />
            <Select
              variant="filled"
              name="institucion"
              onChange={cambioaproducto}
              placeholder="Seleccionar Institución buscada"
            >
              {bodyinstitucion()}
            </Select>
          </FormControl>
        </Stack>
        <HStack maxW="full" alignItems="center">
          <Button
            colorScheme="green"
            marginTop="10"
            marginBottom="10"
            minW="100"
            marginRight="15"
            onClick={productocrear}
          >
            Guardar producto
          </Button>
          <Button colorScheme="yellow" marginTop="10" marginBottom="10" minW="100" onClick={() => router.push('./producto')}>
            Volver
          </Button>
          <Button colorScheme="yellow" marginTop="10" marginBottom="10" minW="100" onClick={() => router.push('./institucioncrear')}>
            Crear Institución nueva
          </Button>
        </HStack>
      </Container>
      </Box>
    </Container>
  );
};

export default ProductoCrear;
