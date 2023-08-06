import React, { useEffect, useState } from 'react';
import { Button, Container, Heading, Stack, Table, Tbody, Td, Thead, Tr, HStack } from '@chakra-ui/react';
import router from 'next/router';
import { VerCliente, EliminarCliente } from '../tienda/cliente';
import Swal from 'sweetalert2';

const Cliente = () => { 

  const [clientes, VerClientes] = useState([]); 

  const clienteEliminar = (id) => {
    Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro?',
      text: 'El cliente será eliminado permanentemente.',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        EliminarCliente(id).then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Cliente eliminado',
            text: 'El cliente se eliminó con éxito.',
            showConfirmButton: false,
            timer: 1500, // Cambia el tiempo (en milisegundos) que se muestra el mensaje de éxito
          }).then(() => {
            window.location.reload(); // Recargar la página después de eliminar el cliente
          });
        }).catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al eliminar el cliente',
            text: 'Ha ocurrido un error al eliminar el cliente. Por favor, inténtalo nuevamente.',
            showConfirmButton: true,
          });
        });
      }
    });
  };

  const body = () => {
    return clientes.map((cliente) => (
      <Tr key={cliente._id}>        
        <Td>{cliente.rut}</Td>
        <Td>{cliente.nombre}</Td>
        <Td>{cliente.direccion}</Td>
        <Td>{cliente.telefono}</Td>
        <Td>{cliente.notificacion.whatsapp}</Td>
        <Td>
          <Button w={'full'} colorScheme="red" textColor={"white"} onClick={()=>clienteEliminar(cliente._id)}>Eliminar</Button>
        </Td>
      </Tr>
    ));
  };

  useEffect(() => { 
    VerCliente().then(res =>{
      VerClientes(res.data);
    });
  }, []);

  return (
    <>
      <Container maxW="container.xl" my="50">
        <Heading
          as="h1"
          size="2xl"
          color="teal.500"
          textAlign="center"
          mt="15"
          fontFamily="New Romance"
          textShadow="1px 1px 3px rgba(0, 0, 0, 0.3)"
        >
          Clientes
        </Heading>
        <Stack spacing={'5'} mt="15">
          <b /> <b />

          <HStack maxW={'full'} alignItems="center">
            <Button maxWidth={"200"} colorScheme={"whatsapp"} textColor={"white"} onClick={() => router.push('./clientecrear')}>
              Agregar Cliente
            </Button>
            <b /> <b />
            <Button maxWidth={"200"} colorScheme={"yellow"} textColor={"black"} onClick={() => router.push("/")}>
              Volver
            </Button>
          </HStack>

          <Table variant="striped" colorScheme={"cyan"} border={'8px'} borderStyle="ridge">
            <Thead bgColor="green.200" borderBottom={'4px'} borderStyle="ridge">
              <Tr fontSize={'25'}>
                <Td>RUT</Td>
                <Td>NOMBRE</Td>
                <Td>DIRECCIÓN</Td>
                <Td>TELÉFONO</Td>
                <Td>NOTIFICACIÓN WHATSAPP</Td>
                <Td>OPCIONES</Td>
              </Tr>
            </Thead>
            <Tbody>
              {clientes.map((cliente) => (
                <Tr key={cliente._id}>
                  <Td>{cliente.rut}</Td>
                  <Td>{cliente.nombre}</Td>
                  <Td>{cliente.direccion}</Td>
                  <Td>{cliente.telefono}</Td>
                  <Td>{cliente.notificacion.whatsapp}</Td>
                  <Td>

                
                  <Button w={'full'} colorScheme="red" textColor={"white"} onClick={() => clienteEliminar(cliente._id)}>Eliminar</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Stack>
      </Container>
    </>
  );
};

export default Cliente;