import React, { useEffect, useState } from 'react';
import { Button, Container, Heading, Stack, Select, FormControl, FormLabel, Input, Textarea, HStack } from '@chakra-ui/react';
import InputForm from '../components/InputForm';
import router from 'next/router';

import { VerNotificacion } from '../tienda/notificacion';

import { CrearCliente } from '../tienda/cliente';
import Swal from 'sweetalert2';

const ClienteCrear = () => { 

  const [notificacion, verNotificacion] = useState([]);
 

  useEffect(() => {
    VerNotificacion().then(res => {
      verNotificacion(res.data);
    });

  }, []);

  const [cliente, ClienteVer] = useState({ 
    _id: '',
    rut: '',
    nombre: '',
    direccion: '',
    telefono: '',
    notificacion: ''
  });

  const bodyNotificacion = () => {
    return notificacion.map(notificaciones => (
      <option value={notificaciones._id} key={notificaciones._id}>{notificaciones.whatsapp}</option>
    ));
  };


  const cambiocliente = (e) => {
    ClienteVer({
      ...cliente,
      [e.target.name]: e.target.value
    });
  };

  const clientecrear = async (e) => { 
    e.preventDefault();

    console.log(cliente);

    const response = await CrearCliente(cliente); 
    if (response.status === 200) { 
      Swal.fire({
        icon: 'success',
        title: 'Cliente guardado', 
        showConfirmButton: true,
        text: 'Cliente está correcto' 
      }).then(() => {
        router.push('./cliente');
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        showConfirmButton: true,
        text: 'Cliente erróneo' 
      });
    }
  };

  return (
    <>
      <Container maxW="container.lg" my="40">
        <Stack spacing={5} my={'30'}>
          <Heading as="h1" size={'2xl'} align="center" textColor={'Black'}>
            Registrar cliente
          </Heading> 
          <Container maxW='container.lg' marginTop={'40'}>
            <Stack spacing={8}>
              <b/>
              
              <FormControl id="rut">
                <FormLabel>Ingrese rut</FormLabel>
                <InputForm type="text" name="rut" placeholder="Ingrese rut" handleChange={cambiocliente} value={cliente.rut} />
              </FormControl>
            
              <FormControl id="nombre">
                <FormLabel>Ingrese nuevo cliente</FormLabel>
                <InputForm type="text" name="nombre" placeholder="Ingrese nombre" handleChange={cambiocliente} value={cliente.nombre} />
              </FormControl>

              <FormControl id="direccion">
                <FormLabel>Ingrese nuevo cliente</FormLabel>
                <InputForm type="text" name="direccion" placeholder="Ingrese direccion" handleChange={cambiocliente} value={cliente.direccion} />
              </FormControl>

              <FormControl id="telefono">
                <FormLabel>Ingrese nuevo cliente</FormLabel>
                <InputForm type="text" name="telefono" placeholder="Ingrese teléfono" handleChange={cambiocliente} value={cliente.telefono} />
              </FormControl>

              <FormControl id="notificacion">
                <FormLabel>Seleccione notificacion</FormLabel>
                <Select variant="filled" name="notificacion" onChange={cambiocliente} placeholder="">
                  {bodyNotificacion()}
                </Select>
              </FormControl>

             
                         
            </Stack>
            <HStack maxW={'full'} alignItems="center">
              <Button colorScheme="green" marginTop="10" marginBottom="10" minW={'100'} marginRight="15" onClick={clientecrear}>
                Guardar
              </Button>
              <Button colorScheme="yellow" marginTop="10" marginBottom="10" minW={'100'} onClick={() => router.push('./cliente')}>
                Volver
              </Button> 
            </HStack>
          </Container>
        </Stack>
      </Container>
    </>
  );
};

export default ClienteCrear;


