import React, { useEffect, useState } from 'react';
import { Button, Container, Heading, Stack, Table, Tbody, Td, Thead, Tr, HStack } from '@chakra-ui/react';
import router from 'next/router';
import { VerDesp, EliminarPedido } from '../tienda/pedido';
import Swal from 'sweetalert2';

const Pedido = () => { 

  const [despachados, Verpedidos] = useState([]);

  const pedidoEliminar = (id) => {
    EliminarPedido(id);
    Swal.fire({
      icon: 'success',
      title: 'Pedido eliminado',
      showConfirmButton: true,
      text: 'Pedido se eliminó con éxito'
    }).then(() => {
      window.location.reload();
    });
  };

  const body = () => {
    return despachados.map((pedido) => (
      <Tr key={pedido._id}>        
        <Td>{pedido.fecha_registro}</Td>
        <Td>{pedido.fecha_despacho}</Td>
        <Td>{pedido.comentario}</Td>
        <Td>{pedido.precio_total}</Td>
        <Td>{pedido.abono_total}</Td>
        <Td>{pedido.cliente ? `(${pedido.cliente.rut}) ${pedido.cliente.nombre}` : ''}</Td> {/*rut y nombre del cliente */}
        <Td>{pedido.estado?.nombre}</Td>
        <Td>
          
        </Td>
      </Tr>
    ));
  };
  

  useEffect(() => {
    VerDesp().then(res => {
      console.log(res.data); // Agregar console.log para verificar los datos recibidos
      Verpedidos(res.data);
    })
    .catch(error => {
      console.log(error); // Agregar console.log para mostrar cualquier error en la consulta
    });
  }, []);

  return (
    <>
      <Container maxW='container.xl' my="50">
      <Heading
      as="h1"
      size="2xl"
      color="teal.500" // Cambia el color del texto a un tono de verde azulado
      textAlign="center"
      mt="15"
      fontFamily="New Romance" // Si ya has definido la fuente "New Romance" en globals.css, puedes usarla aquí
      textShadow="1px 1px 3px rgba(0, 0, 0, 0.3)" // Agrega un sombreado al texto
    >
      Pedidos Despachados
    </Heading>
        <Stack spacing={'5'} mt='15'>
          <b /> <b />

          <HStack maxW={'full'} alignItems='center'>
            <Button maxWidth={"200"} colorScheme={"yellow"} textColor={"black"} onClick={() => router.push("/pedido")}>Volver</Button>
          </HStack>

          <Table variant='striped' colorScheme={"cyan"} border={'8px'} borderStyle='ridge' >
            <Thead bgColor='green.200' borderBottom={'4px'} borderStyle='ridge'>
              <Tr fontSize={'25'}>
                <Td>FECHA DE REGISTRO</Td>
                <Td>FECHA DE DESPACHO</Td>
                <Td>DETALLES</Td>
                <Td>PRECIO TOTAL</Td>
                <Td>ABONO TOTAL</Td>
                <Td>CLIENTE</Td>
                <Td>ESTADO</Td>
                <Td>OPCIONES</Td>
              </Tr>
            </Thead>
            <Tbody>
              {body()}
            </Tbody>
          </Table>
        </Stack>
      </Container>
    </>
  )
}

export default Pedido;