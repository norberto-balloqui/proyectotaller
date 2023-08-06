import React, { useEffect, useState } from 'react';
import { Button, Container, Heading, Stack, Select, FormControl, FormLabel, Input, HStack, Box } from '@chakra-ui/react';
import InputForm from '../components/InputForm';
import { VerClientePorId, ModificarCliente } from '../tienda/cliente';
import { VerNotificacion } from '../tienda/notificacion';
import Swal from 'sweetalert2';
import router from 'next/router';

const ModificarCliente = ({ clienteId }) => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [cliente, setCliente] = useState({
    _id: '',
    rut: '',
    nombre: '',
    direccion: '',
    telefono: '',
    notificacion: '',
  });

  const obtenerNotificaciones = async () => {
    try {
      const response = await VerNotificacion();
      setNotificaciones(response.data);
      console.log('Notificaciones obtenidas:', response.data);
    } catch (error) {
      console.error('Error al obtener notificaciones', error);
    }
  };

  const obtenerCliente = async () => {
    try {
      const response = await VerClientePorId(clienteId);
      setCliente(response.data);
      console.log('Cliente obtenido:', response.data);
    } catch (error) {
      console.error('Error al obtener cliente', error);
    }
  };

  useEffect(() => {
    obtenerNotificaciones();
    obtenerCliente();
  }, [clienteId]);

  const handleChange = (e) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
    console.log('Cliente modificado:', e.target.name, e.target.value);
  };

  const handleModificarCliente = async (e) => {
    e.preventDefault();

    try {
      const response = await ModificarCliente(clienteId, cliente);
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Cliente modificado',
          showConfirmButton: true,
          text: 'El cliente se ha modificado correctamente.',
        }).then(() => {
          router.push('/cliente');
        });
      } else {
        throw new Error('Error al modificar el cliente');
      }
    } catch (error) {
      console.error('Error al modificar el cliente', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        showConfirmButton: true,
        text: 'Ha ocurrido un error al modificar el cliente.',
      });
    }
  };

  const bodyNotificacion = () => {
    return notificaciones.map((notificacion) => (
      <option value={notificacion._id} key={notificacion._id}>
        {notificacion.whatsapp}
      </option>
    ));
  };

  return (
    <>
      <Container maxW="container.lg" my="50">
        <Box p="6" borderWidth="1px" borderRadius="lg" margin="auto">
          <Stack spacing={5} my={'30'}>
            <Heading
              as="h1"
              size="2xl"
              color="teal.500"
              textAlign="center"
              mt="15"
              fontFamily="New Romance"
              textShadow="1px 1px 3px rgba(0, 0, 0, 0.3)"
            >
              Modificar Cliente
            </Heading>

            <Container maxW="container.lg" marginTop={'40'}>
              <Stack spacing={8}>
                <b />

                <FormControl id="rut">
                  <FormLabel>Ingrese Rut</FormLabel>
                  <InputForm type="text" name="rut" placeholder="EJ: 18199774-k" handleChange={handleChange} value={cliente.rut} />
                </FormControl>

                <FormControl id="nombre">
                  <FormLabel>Ingrese Nombre y Apellido</FormLabel>
                  <InputForm type="text" name="nombre" placeholder="EJ: Roberto Perez" handleChange={handleChange} value={cliente.nombre} />
                </FormControl>

                <FormControl id="direccion">
                  <FormLabel>Ingrese Dirección</FormLabel>
                  <InputForm type="text" name="direccion" placeholder="EJ: Manuel rodrigues 418" handleChange={handleChange} value={cliente.direccion} />
                </FormControl>

                <FormControl id="telefono">
                  <FormLabel>Ingrese Teléfono</FormLabel>
                  <InputForm type="text" name="telefono" placeholder="EJ: 568678654" handleChange={handleChange} value={cliente.telefono} />
                </FormControl>

                <FormControl id="notificacion">
                  <FormLabel>Notificación de Whatsapp</FormLabel>
                  <Select variant="filled" name="notificacion" onChange={handleChange} value={cliente.notificacion}>
                    {bodyNotificacion()}
                  </Select>
                </FormControl>
              </Stack>
              <HStack maxW={'full'} alignItems="center">
                <Button colorScheme="green" marginTop="10" marginBottom="10" minW={'100'} marginRight="15" onClick={handleModificarCliente}>
                  Guardar cambios
                </Button>
                <Button colorScheme="yellow" marginTop="10" marginBottom="10" minW={'100'} onClick={() => router.push('/cliente')}>
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

export default ModificarCliente;
