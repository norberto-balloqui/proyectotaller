import React, { useEffect as effect, useState as state} from 'react'
import { Button, Container, Heading, Stack, Select, Table, Tbody, Td, Thead, Tr, FormControl, FormLabel, Input, Textarea, HStack} from '@chakra-ui/react'

import router from 'next/router'

import {getParvulos} from '../data/parvulo'
import {VerEnfermedad} from '../antmedico/enfermedad'
import {VerDiscapacidad} from '../antmedico/discapacidad'
import {CrearAntecedente} from '../antmedico/antecedente'

import Swal from 'sweetalert2'  


const AntecedenteCrear = () => {

  const [parvulo, verParvulo] = state([])
  const [enfermedad, verEnfermedad] = state([])
  const [discapacidad, verDiscapacidad] = state([])
  

  effect(() => {
    getParvulos().then(res => {
        verParvulo(res.data)
      })
    
    VerDiscapacidad().then(res => {
      verDiscapacidad(res.data)
    })
    VerEnfermedad().then(res => {
        verEnfermedad(res.data)
      })
    

}, [])

  const [antecedente, AntecedenteVer] = state({
    _id:'',
    parvulo: '',
    discapacidad: '',
    enfermedad: '',
    cuidado: ''
  })

  const bodyparvulo = ()=>{
    return parvulo.map((parvulos=>(
      <option value={parvulos._id} key={parvulos._id}>{parvulos.nombre}</option>
    )))
  }
  
  const bodydiscapacidad = ()=>{
    return discapacidad.map((discapacidades=>(
      <option value={discapacidades._id} key={discapacidades._id}>{discapacidades.nombre}</option>
    )))
  }
  
  const bodyenfermedad = ()=>{
    return enfermedad.map((enfermedades=>(
      <option value={enfermedades._id} key={enfermedades._id}>{enfermedades.nombre}</option>
    )))
  }


  const handlechange = (e) =>{
    AntecedenteVer({
      ...antecedente,
      [e.target.name]: e.target.value
    })
  }

  const antecedentecrear = async (e) =>{
    e.preventDefault()

    console.log(antecedente)

    const response = await CrearAntecedente(antecedente)
      if(response.status == 200){
        Swal.fire(
          {
            icon: 'success',
            title: 'Antecedente medico guardado',
            showConfirmButton: true,
            text: 'Antecedente esta correcto'
          }).then(() =>{
            router.push('./antecedente')
          })
      }else{
        Swal.fire(
          {
            icon: 'error',
            title: 'Error',
            showConfirmButton: true,
            text: 'Antecedente erroneo'
          }
        )
      }
  }


  return (
    <>
    <Container maxW="container.lg" my='40'>
      <Stack spacing={5} my={'30'}>
        <Heading as='h1' size={'2xl'} align='center' textColor={'Black'}>Registrar antecedente médico</Heading>
        <Container maxW='container.lg' marginTop={'40'}>
          <Stack spacing={8}>
          <b/> 
            
          <FormControl id="parvulo">
              <FormLabel>Seleccione párvulo</FormLabel>
              <Select variant='filled'name='parvulo' onChange={handlechange} placeholder='Párvulo'>
                {bodyparvulo()}
              </Select>
            </FormControl>

            <FormControl id="discapacidad">
              <FormLabel>Seleccione discapacidad</FormLabel>
              <Select variant='filled'name='discapacidad' onChange={handlechange} placeholder=''>
                {bodydiscapacidad()}
              </Select>
            </FormControl>

            <FormControl id="enfermedad">
              <FormLabel>Seleccione enfermedad</FormLabel>
              <Select variant='filled' name='enfermedad' placeholder='' onChange={handlechange}>
                {bodyenfermedad()}
              </Select>
            </FormControl >
                         
            <FormControl id="cuidado">
              <FormLabel>Ingrese un cuidado</FormLabel>
              <Input variant='filled' onChange={handlechange} name='cuidado' placeholder='Ingresar mínimo 2 palabras' />
            </FormControl>

          </Stack>
          <HStack maxW={'full'} alignItems='center'>
            <Button colorScheme='green' marginTop='10' marginBottom='10' minW={'100'} marginRight='15' onClick={antecedentecrear}>Guardar</Button>
            <Button colorScheme='yellow' marginTop='10' marginBottom='10' minW={'100'} onClick={()=>router.push('./antecedente')}>Volver</Button>
          </HStack>
        </Container>
      </Stack>
    </Container>
    </>
  )
}
export default AntecedenteCrear