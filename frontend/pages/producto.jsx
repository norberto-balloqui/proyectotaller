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

  const productoEliminar = (id) => {
    Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro?',
      text: 'El Producto será eliminado permanentemente.',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        EliminarProducto(id).then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Producto eliminado',
            text: 'El cliente se eliminó con éxito.',
            showConfirmButton: false,
            timer: 1500, // Cambia el tiempo (en milisegundos) que se muestra el mensaje de éxito
          }).then(() => {
            window.location.reload(); // Recargar la página después de eliminar el cliente
          });
        }).catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al eliminar el producto',
            text: 'Ha ocurrido un error al eliminar el producto. Por favor, inténtalo nuevamente.',
            showConfirmButton: true,
          });
        });
      }
    });
  };

  const body = () => {
    return productos.map((producto => (
        <Tr key={producto._id}>        
          <Td>{producto.nombre}</Td>
          <Td>{producto.talla?.nombre}</Td>
          <Td>{producto.institucion?.nombre}</Td>
          <Td>
          <Button w={'full'} colorScheme="red" textColor={"white"} onClick={() => productoEliminar(producto._id)}>Eliminar</Button>
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
      Productos
    </Heading>
  <Stack spacing={'5'} mt='15'>
  <b/> <b/> 

  <HStack maxW={'full'} alignItems='center'>
 
  <Button maxWidth={"200"} colorScheme={"whatsapp"} textColor={"white"} onClick={()=>router.push("./productocrear")}>Agregar Producto</Button>
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
