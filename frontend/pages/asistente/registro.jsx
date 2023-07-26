import React, { useState as state} from 'react'
import { Button, Container, FormControl, FormLabel, Heading, HStack, Input, InputGroup, InputLeftAddon, Stack, useToast as toast } from '@chakra-ui/react'
import router from 'next/router'
import {addAsistente} from '../../data/asistente'
import InputForm from '../../components/InputFormEx'

const registroAsistente = () => {
  const [asistente, setAsistente] = state({
    rut:'',
    nombre: '',
    fecha_de_nac: '',
    direccion: '',
    telefono: '',
    correo: ''
  })

  const handleChange = (e) => {
    setAsistente({
        ...asistente,
        [e.target.name]: e.target.value
    })
  }

  const submitAsistente = (e) => {
    e.preventDefault()
    addAsistente(asistente).then(res => {
      if(res.status == '200'){
      router.push('../asistente')
    }
    })
  }

  return (
    <>
    <Container maxW="container.sm" >
        <Heading as="h1" size="2xl" textAlign="center" my={20}>Registro de Asistente</Heading>
        <form onSubmit={submitAsistente} id="form">
        <Stack spacing={3}  my={20} justify="center">
            <InputForm name="rut" placeholder="RUT sin punto y con guion" handleChange={handleChange} label="RUT" type="text" maxLength={10} minLength={9} /> 
            <InputForm name="nombre" placeholder="Nombre Completo" handleChange={handleChange} label="Nombre" type="text" /> 
            <InputForm name="fecha_de_nac" handleChange={handleChange} label="Fecha de Nacimiento" type="date" />
            <InputForm name="direccion" handleChange={handleChange} label="Direccion" type="address" placeholder="Direccion" /> 
            <FormControl>
                <FormLabel>Telefono</FormLabel>
                <InputGroup>
                    <Input type="tel" placeholder='Telefono' name={"telefono"} onChange={handleChange} maxLength={9} minLength={8}/>
                </InputGroup>
            </FormControl>
            <InputForm name="correo" placeholder="Correo Electronico" type="email" handleChange={handleChange} label="Correo Electronico"  />
      </Stack>
      <HStack>
        <Button colorScheme={"green"} type={"submit"} >Guardar</Button>
        <Button colorScheme={"red"} onClick={() => router.push('../asistente')}>Regresar</Button>
      </HStack>
        </form>
    </Container>

    </>
    
    
    
  )
}

export default registroAsistente