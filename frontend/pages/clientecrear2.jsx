import React, { useEffect, useState } from 'react';
import { Button, Container, Heading, Stack, Select, FormControl, FormLabel, Input, Textarea, HStack,Box } from '@chakra-ui/react';
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
  
    try {
      const response = await CrearCliente(cliente);
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Cliente guardado',
          showConfirmButton: true,
          text: 'Cliente está correcto',
        }).then(() => {
          router.push('./cliente');
        });
      } else {
        throw new Error('Error al crear cliente');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        showConfirmButton: true,
        text: 'Cliente erróneo',
      });
    }
  };
  


  return (
    <>
      <Container maxW="container.lg" my="50">
      <Box p="6" borderWidth="1px" borderRadius="lg" margin="auto">
        <Stack spacing={5} my={'30'}>
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
      Cliente
    </Heading>


          
          <Container maxW='container.lg' marginTop={'40'}>
            <Stack spacing={8}>
              <b/>
              
              <FormControl id="rut">
                <FormLabel>Ingrese Rut</FormLabel>
                <InputForm type="text" name="rut" placeholder="EJ: 18199774-k" handlechange={cambiocliente} value={cliente.rut} />
              </FormControl>
            
              <FormControl id="nombre">
                <FormLabel>Ingrese Nombre y Apellido</FormLabel>
                <InputForm type="text" name="nombre" placeholder="EJ: Roberto Perez" handlechange={cambiocliente} value={cliente.nombre} />
              </FormControl>

              <FormControl id="direccion">
                <FormLabel>Ingrese Dirección</FormLabel>
                <InputForm type="text" name="direccion" placeholder="EJ: Manuel rodrigues 418" handlechange={cambiocliente} value={cliente.direccion} />
              </FormControl>

              <FormControl id="telefono">
                <FormLabel>Ingrese Teléfono</FormLabel>
                <InputForm type="text" name="telefono" placeholder="EJ: 568678654" handlechange={cambiocliente} value={cliente.telefono} />
              </FormControl>

              <FormControl id="notificacion">
                <FormLabel>Notificación de Whatsapp</FormLabel>
                <Select variant="filled" name="notificacion" onChange={cambiocliente} placeholder="..">
                  {bodyNotificacion()}
                </Select>
              </FormControl>

             
                         
            </Stack>
            <HStack maxW={'full'} alignItems="center">
              <Button colorScheme="green" marginTop="10" marginBottom="10" minW={'100'} marginRight="15" onClick={clientecrear}>
                Guardar cliente
              </Button>
              <Button colorScheme="yellow" marginTop="10" marginBottom="10" minW={'100'} onClick={() => router.push('./pedidocrear')}>
                Volver
              </Button> 
            </HStack>
          </Container>
          
        </Stack>
        </Box>
      </Container>
    </>
  );
};

export default ClienteCrear;