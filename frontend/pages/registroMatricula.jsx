import React, { useState as state,useEffect as effect} from 'react'
import { Button, Container, FormControl, FormLabel, Heading, HStack, Input, InputGroup, InputLeftAddon, Stack, useToast } from '@chakra-ui/react'
import router from 'next/router'
import {addMatricula} from '../data/matricula'
import InputForm from '../components/InputForm'
import SelectForm from '../components/SelectForm'
import {getParvulos} from '../data/parvulo'
import {getApoderados} from '../data/apoderado'



const registroMatricula = () => {
  const [parvulos, setParvulos] = state([])
  const [apoderados, setApoderados] = state([])

  const [matricula, setMatriculas] = state([])

  const handleChange = (e) => {
    setMatriculas({
        ...matricula,
        [e.target.name]: e.target.value
    })
  }
 
  effect(() => {
    getParvulos().then(res =>{
      setParvulos(res.data)     
    })

    getApoderados().then(res =>{
      setApoderados(res.data)
    })


    
  }, [])


  const contentSelectParvulos = () => {
    return parvulos.map((parvulos => (
      <option value={parvulos._id} key={parvulos._id}>{parvulos.nombre}</option>
    )
    ))
  }

  const contentSelectApoderados = () => {
    return apoderados.map((apoderados => (
      <option value={apoderados._id} key={apoderados._id}>{apoderados.nombre}</option>
    )
    ))
  }


  const submitMatricula = (e) => {
    e.preventDefault()
    addMatricula(matricula).then(res => {
      if(res.status == '200'){
      router.push('./matricula')
    }
    })
  }

  return (
    <>
    <Container maxW="container.sm" >
        <Heading as="h1" size="2xl" textAlign="center" my={20}>Registro de matricula</Heading>
       <form id="form" onSubmit={submitMatricula}>
       <Stack spacing={3}  my={20} justify="center">
            <InputForm name="valor" placeholder="valor matricula" handleChange={handleChange} label="Valor matricula" type="number"/> 
            <InputForm name="abono" placeholder="Abono de matricula" handleChange={handleChange} label="Abono matricula" type="number"/> 
            <SelectForm name="parvulo" placeholder="Seleccione parvulo a matricular" isRequired={"True"} handleChange={handleChange} label="Parvulo" content={contentSelectParvulos()}/>


            <SelectForm name="apoderado" placeholder="Seleccione apoderado(obligatorio)" isRequired={"True"} handleChange={handleChange} label="Apoderado 1" content={contentSelectApoderados()}/>
            <SelectForm name="apoderado2" placeholder="Seleccione apoderado 2(opcional)" handleChange={handleChange} label="Apoderado 2" content={contentSelectApoderados()}/>
            <SelectForm name="apoderado3" placeholder="Seleccione apoderado 2(opcional)" handleChange={handleChange} label="Apoderado 3" content={contentSelectApoderados()}/>


            

      </Stack>
      <HStack>
        <Button colorScheme={"green"} type={"submit"}>Guardar</Button>
        <Button colorScheme={"yellow"} onClick={() => router.push('./matricula')}>Regresar</Button>
      </HStack>
       </form>
      
    </Container>

    </>
    
    
    
  )
}

export default registroMatricula