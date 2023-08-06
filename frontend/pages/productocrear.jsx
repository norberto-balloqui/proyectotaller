import React, { useEffect as effect, useState as state } from 'react';
import { Button, Container, Heading, Stack, Select, FormControl, FormLabel, Input, Textarea, HStack } from '@chakra-ui/react';
import InputForm from '../components/InputForm';
import router from 'next/router';

import { VerTalla } from '../tienda/talla';
import { VerInstitucion } from '../tienda/institucion';
import { CrearProducto } from '../tienda/producto';
import Swal from 'sweetalert2';

const ProductoCrear = () => { 

  const [talla, verTalla] = state([]);
  const [institucion, verInstitucion] = state([]);

  effect(() => {
    VerTalla().then(res => {
      verTalla(res.data);
    });
    VerInstitucion().then(res => {
      verInstitucion(res.data);
    });
  }, []);

  const [producto, ProductoVer] = state({ 
    _id: '',
    nombre: '',
    talla: '',
    institucion: ''
  });

  const bodytalla = () => {
    return talla.map(tallas => (
      <option value={tallas._id} key={tallas._id}>{tallas.nombre}</option>
    ));
  };

  const bodyinstitucion = () => {
    return institucion.map(instituciones => (
      <option value={instituciones._id} key={instituciones._id}>{instituciones.nombre}</option>
    ));
  };

  const cambioaproducto = (e) => {
    ProductoVer({
      ...producto,
      [e.target.name]: e.target.value
    });
  };

  const productocrear = async (e) => { 
    e.preventDefault();

    console.log(producto);

    const response = await CrearProducto(producto); 
    if (response.status === 200) { 
      Swal.fire({
        icon: 'success',
        title: 'Producto médico guardado', 
        showConfirmButton: true,
        text: 'Producto está correcto' 
      }).then(() => {
        router.push('./producto');
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        showConfirmButton: true,
        text: 'Producto erróneo' 
      });
    }
  };

  return (
    <>
      <Container maxW="container.lg" my="40">
        <Stack spacing={5} my={'30'}>
          <Heading as="h1" size={'2xl'} align="center" textColor={'Black'}>
            Registrar producto
          </Heading> 
          <Container maxW='container.lg' marginTop={'40'}>
            <Stack spacing={8}>
              <b/> 
            
              <FormControl id="nombre">
                <FormLabel>Ingrese nuevo producto</FormLabel>
                <InputForm type="text" name="nombre" placeholder="Ingrese nombre" handlechange={cambioaproducto} value={producto.nombre} />
              </FormControl>

              <FormControl id="talla">
                <FormLabel>Seleccione talla</FormLabel>
                <Select variant="filled" name="talla" onChange={cambioaproducto} placeholder="">
                  {bodytalla()}
                </Select>
              </FormControl>

              <FormControl id="institucion">
                <FormLabel>Seleccione institución</FormLabel>
                <Select variant="filled" name="institucion" onChange={cambioaproducto} placeholder="">
                  {bodyinstitucion()}
                </Select>
              </FormControl>
                         
            </Stack>
            <HStack maxW={'full'} alignItems="center">
              <Button colorScheme="green" marginTop="10" marginBottom="10" minW={'100'} marginRight="15" onClick={productocrear}>
                Guardar
              </Button>
              <Button colorScheme="yellow" marginTop="10" marginBottom="10" minW={'100'} onClick={() => router.push('./producto')}>
                Volver
              </Button> 
            </HStack>
          </Container>
        </Stack>
      </Container>
    </>
  );
};

export default ProductoCrear;


