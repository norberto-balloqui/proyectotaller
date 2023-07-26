import React, { useEffect as effect, useState as state} from 'react'
import { Button, Container, Heading, HStack, useToast as toast, Stack } from '@chakra-ui/react'
import router from 'next/router'
import {getAsistentes} from '../../data/asistente'
import {addAsistencia} from '../../data/asistencia'
import InputForm from '../../components/InputFormEx'
import TextareaForm from '../../components/TextareaFormEx'
import SelectForm from '../../components/SelectFormEx'

const registroAsistencia = () => {
  const [asistentes, setAsistentes] = state([])
  const [asistencia, setAsistencia] = state({
    titulo:'',
    idAsistente: '',
    comentario: ''
  })

  const contentSelect = () => {
    return asistentes.map((asistentes => (
      <option value={asistentes._id} key={asistentes._id}>{asistentes.nombre}</option>
    )
    ))
  }
  
  const handleChange = (e) => {
    setAsistencia({
        ...asistencia,
        [e.target.name]: e.target.value
    })
  }

  effect(() => {
    getAsistentes().then(res =>{
      setAsistentes(res.data)
    })
  }, [])

  const submitAsistencia = (e) => {
    e.preventDefault()
    addAsistencia(asistencia).then(res => {
      if(res.status == '200'){
        router.push('../asistencia')
      }
    })
  }


  return (
    <>
    <Container maxW="container.sm" >
      <Heading as="h1" size="2xl" textAlign="center" my={20} >Registro de Asistencia</Heading>
          <form onSubmit={submitAsistencia} id="form">
            <Stack spacing={3}  my={20} justify="center"> 
                <InputForm name="titulo" type="text" placeholder="Nombre de la Clase" handleChange={handleChange} label="Titulo" />
                <SelectForm name="idAsistente" placeholder="Seleccione a una asistente..." handleChange={handleChange} content={contentSelect()} />
                <TextareaForm name="comentario" placeholder="Comentario" handleChange={handleChange} label="Comentario"/>
            </Stack>
            <HStack>
              <Button colorScheme="whatsapp"  type="submit" >Guardar</Button>
              <Button colorScheme={"red"} onClick={() => router.push('../asistencia')}>Regresar</Button>
            </HStack>
          </form>
    </Container>
    </>
  )
}

export default registroAsistencia