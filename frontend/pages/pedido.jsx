import React, { useEffect as effect, useState as state } from 'react'
import { Button, Container, Heading, Stack, Table, Tbody, Td, Thead, Tr, HStack } from '@chakra-ui/react'
import router from 'next/router'
import { VerPedido, EliminarPedido } from '../tienda/pedido'
import Swal from 'sweetalert2'

const pedido = () => {
  const [pedidos, VerPedidos] = state([{

    _id:'',
    fecha_registro:'',
    fecha_despacho: '',
    comentario: '',
    precio_total: '',
    abono_total: '',
    cliente: '',
    estado: ''
  }])

  const pedidoEliminar = (id) => {
    EliminarPedido(id)
    Swal.fire({
      icon: 'success',
      title: 'Pedido eliminado',
      showConfirmButton: true,
      text: 'Pedido se eliminó con éxito'
    }).then(() => {
      window.location.reload()
    })
  }

  const body = () => {
    return pedidos.map((pedido => (
      <Tr key={pedido._id}>        
        <Td>{pedido.fecha_registro}</Td>
        <Td>{pedido.fecha_despacho}</Td>
        <Td>{pedido.comentario}</Td>
        <Td>{pedido.precio_total}</Td>
        <Td>{pedido.abono_total}</Td>
        <Td>{pedido.cliente.nombre}</Td>
        <Td>{pedido.estado.nombre}</Td>
        <Td>
          <Button w={'full'} colorScheme="red" textColor={"white"} onClick={()=>pedidoEliminar(pedido._id)}>Eliminar</Button>
        </Td>
      </Tr>
    )
    ))
  }

  effect(() => {
    VerPedido().then(res => {
      VerPedidos(res.data)
    })
  }, [])

  return (
    <>
      <Container maxW='container.xl' my="40">
        <Heading as={'h1'} size='2xl' textColor={'black'} textAlign={'center'} mt='15'>Pedidos</Heading>
        <Stack spacing={'5'} mt='15'>
          <b /> <b />

          <HStack maxW={'full'} alignItems='center'>

            <Button maxWidth={"200"} colorScheme={"whatsapp"} textColor={"white"} onClick={() => router.push("./pedidoCrear")}>Agregar Pedido</Button>
            <b /> <b />
            <Button maxWidth={"200"} colorScheme={"yellow"} textColor={"black"} onClick={() => router.push("/")}>Volver</Button>

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

export default pedido;
