import React, { useState as state} from 'react'
import { Button, Container, Heading, Stack, FormControl, FormLabel, Input, HStack} from '@chakra-ui/react'
import router from 'next/router'

import {CrearApoderado} from '../antmedico/apoderado'
import InputForm from '../components/form2'
import Swal from 'sweetalert2'  


const ApoderadoCrear = () => {




  const [apoderado, ApoderadoVer] = state({
    rut: '',
    nombre: '',
    fecha_de_nac: '',
    direccion: '',
    telefono1: '',
    telefono2: '',
    correo: ''

    
  })
  const cambioapoderado = (e) =>{
    ApoderadoVer({
      ...apoderado,
      [e.target.name]: e.target.value
    })
  }

  const apoderadocrear = async (e) =>{
    e.preventDefault()

    console.log(apoderado)

    const response = await CrearApoderado(apoderado)
      if(response.status == 200){
        Swal.fire(
          {
            icon: 'success',
            title: 'Apoderado guardado',
            showConfirmButton: true,
            text: 'Apoderado fue guardado con éxito'
          }).then(() =>{
            router.push('./apoderado')
          })
      }else{
        Swal.fire(
          {
            icon: 'error',
            title: 'Error',
            showConfirmButton: true,
            text: 'Apoderado erroneo'
          }
        )
      }
  }


  return (
    <>
    <Container maxW="container.sm" my='40'>
      <Stack spacing={5} my={'30'}>
        <Heading as='h1' size={'2xl'} align='center' textColor={'Black'}>Registrar apoderado</Heading>
          <b/> 
            
         
                         
            <FormControl id="rut">
              <FormLabel>Ingrese rut</FormLabel>
              <InputForm  type="text" name="rut" placeholder="minimo 7 números ejempo 1111111-k" handlechange={cambioapoderado} value={apoderado.rut}/>
            </FormControl>

            <FormControl id="nombre">
              <FormLabel>Ingrese nombre apoderado</FormLabel>
              <InputForm  type="text" name="nombre" placeholder="Ingrese nombre" handlechange={cambioapoderado} value={apoderado.nombre} />
            </FormControl>

            <FormControl id="fecha_de_nac">
              <FormLabel>Seleccione fecha de nacimiento</FormLabel>
              <Input type="date" name={"fecha_de_nac"} onChange={cambioapoderado} />
            </FormControl>

            <FormControl id="direccion">
              <FormLabel>Ingrese dirección</FormLabel>
              <InputForm  type="text" name="direccion" placeholder="Ingresar solo números y letras" handlechange={cambioapoderado} value={apoderado.direccion} />
            </FormControl>

            <FormControl id="telefono1">
              <FormLabel>Ingrese teléfono</FormLabel>
              <InputForm  type="number" name="telefono1" placeholder="Ingrese primer teléfono" handlechange={cambioapoderado} value={apoderado.telefono1} />
            </FormControl>

            <FormControl id="telefono2">
              <FormLabel>Ingrese segundo teléfono</FormLabel>
              <InputForm  type="number" name="telefono2" placeholder="Ingrese segundo teléfono" handlechange={cambioapoderado} value={apoderado.telefono2} />
            </FormControl>

            <FormControl id="correo">
              <FormLabel>Ingrese correo</FormLabel>
              <InputForm  type="email" name="correo" placeholder="Ingrese correo" handlechange={cambioapoderado} value={apoderado.correo} />
            </FormControl>

          </Stack>
          <HStack maxW={'full'} alignItems='center'>
            <Button colorScheme='green' marginTop='10' marginBottom='10' minW={'100'} marginRight='15' onClick={apoderadocrear}>Guardar</Button>
            <Button colorScheme='yellow' marginTop='10' marginBottom='10' minW={'100'} onClick={()=>router.push('./apoderado')}>Volver</Button>
          </HStack>
    
    </Container>
    </>
  )
}
export default ApoderadoCrear