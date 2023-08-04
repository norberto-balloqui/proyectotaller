import React, { useEffect as effect, useState as state} from 'react'
import { Button, Container, Heading, Stack, Table, Tbody, Td, Thead, Tr, HStack } from '@chakra-ui/react'
import router from 'next/router'
import { VerProducto, EliminarProducto } from '../tienda/producto'
import Swal from 'sweetalert2'

const producto = () => {
  const [productos, VerProductos] = state([{
    _id:'',
    nombre: '',
    talla: '',
    institucion: ''
  }])

  const productoEliminar = (id) =>{
    EliminarProducto(id)
    Swal.fire({
      icon: 'success',
      title: 'Producto eliminado',
      showConfirmButton: true,
      text: 'Producto se eliminó con éxito'
    }).then(()=>{
      window.location.reload()
    })
  }

  const body = () => {
    return productos.map((producto => (
        <Tr key={producto._id}>        
          <Td>{producto.nombre}</Td>
          <Td>{producto.talla}</Td>
          <Td>{producto.institucion.nombre}</Td>
          <Td>
            <Button w={'full'} colorScheme="red" textColor={"white"} onClick={()=>productoEliminar(producto._id)}>Eliminar</Button>
          </Td>
        </Tr>
      )
    ))
  }

  effect(() => {
    VerProducto().then(res =>{
      VerProductos(res.data)
    })
  }, [])

  return (
    <>
  <Container maxW='container.xl' my="40">
  <Heading as={'h1'} size='2xl' textColor={'black'} textAlign={'center'} mt='15'>Productos</Heading>
  <Stack spacing={'5'} mt='15'>
  <b/> <b/> 

  <HStack maxW={'full'} alignItems='center'>
 
  <Button maxWidth={"200"} colorScheme={"whatsapp"} textColor={"white"} onClick={()=>router.push("./productoCrear")}>Agregar Producto</Button>
  <b/> <b/> 
  <Button maxWidth={"200"} colorScheme={"yellow"} textColor={"black"} onClick={()=>router.push("/")}>Volver</Button>
  
  </HStack>

  <Table variant='striped' colorScheme={"cyan"} border={'8px'} borderStyle='ridge' >
        <Thead bgColor='green.200' borderBottom={'4px'} borderStyle='ridge'>
            <Tr fontSize={'25'}>

              <Td>NOMBRE</Td>
              <Td>TALLA</Td>
              <Td>INSTITUCIÓN</Td>
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
export default producto;
