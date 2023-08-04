import React, { useEffect as effect, useState as state } from 'react'
import { Button, Container, Heading, Stack, Select, Table, Tbody, Td, Thead, Tr, FormControl, FormLabel, Input, Textarea, HStack} from '@chakra-ui/react'

import router from 'next/router'

import { VerNotificacion } from '../tienda/notificacion'
import { CrearCliente } from '../tienda/cliente'

import Swal from 'sweetalert2'


const ClienteCrear = () => {

  const [notificacion, verNotificacion] = state([])
 

  effect(() => {
    VerNotificacion().then(res => {
        verNotificacion(res.data)
    })


  }, [])

  const [cliente, ClienteVer] = state({
    _id:'',
    rut: '',
    nombre: '',
    direccion: '',
    telefono: '',
    notificacion: ''
    
  })

  const bodynotificacion = ()=>{
    return notificacion.map((notificacion=>(
      <option value={notificacion._id} key={notificacion._id}>{notificacion.nombre}</option>
    )))
  }
  
  


  const handlechange = (e) =>{
    ClienteVer({
      ...cliente,
      [e.target.name]: e.target.value
    })
  }

  const clienteCrear = async (e) =>{
    e.preventDefault()

    console.log(cliente)

    const response = await CrearCliente(cliente)
      if(response.status === 200){
        Swal.fire({
          icon: 'success',
          title: 'Cliente guardado',
          showConfirmButton: true,
          text: 'Cliente se guardó correctamente'
        }).then(() =>{
          router.push('./cliente')
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          showConfirmButton: true,
          text: 'Hubo un error al guardar el cliente'
        })
      }
  }


  return (
    <>
    <Container maxW="container.lg" my='40'>
      <Stack spacing={5} my={'30'}>
        <Heading as='h1' size={'2xl'} align='center' textColor={'Black'}>Registrar cliente</Heading>
        <Container maxW='container.lg' marginTop={'40'}>
          <Stack spacing={8}>
          <b/> 
            
       

            <FormControl id="rut">
              <FormLabel>Ingrese un cuidado</FormLabel>
              <InputForm  type="text" name="rut" placeholder="ejemplo 1111111-k" handlechange={cambioacliente} value={cliente.rut}/>
            </FormControl>

            <FormControl id="nombre">
              <FormLabel>Ingrese un cuidado</FormLabel>
              <InputForm  type="text" name="nombre" placeholder="Ingrese nombre" handlechange={cambioacliente} value={cliente.nombre} />
            </FormControl>
                         
            <FormControl id="direccion">
              <FormLabel>Ingrese un cuidado</FormLabel>
              <InputForm  type="text" name="direccion" placeholder="Ingrese dirección" handlechange={cambioacliente} value={cliente.direccion} />
            </FormControl>

            <FormControl id="telefono">
              <FormLabel>Ingrese un cuidado</FormLabel>
              <InputForm  type="text" name="telefono" placeholder="Ingrese teléfono" handlechange={cambioacliente} value={cliente.telefono} />
            </FormControl>

            <FormControl id="notificacion">
              <FormLabel>Notificación Whatsapp</FormLabel>
              <Select variant='filled'name='notificacion' onChange={handlechange} placeholder='Notificación'>
                {bodynotificacion()}
              </Select>
            </FormControl>

          </Stack>
          <HStack maxW={'full'} alignItems='center'>
            <Button colorScheme='green' marginTop='10' marginBottom='10' minW={'100'} marginRight='15' onClick={clienteCrear}>Guardar</Button>
            <Button colorScheme='yellow' marginTop='10' marginBottom='10' minW={'100'} onClick={()=>router.push('./cliente')}>Volver</Button>
          </HStack>
        </Container>
      </Stack>
    </Container>
    </>
  )
}
export default ClienteCrear;
