import {useState as state} from 'react'
import {findAsistente, updateAsistente} from '../../../data/asistente'
import { Container, Stack, Heading, FormControl, FormLabel, InputGroup, InputLeftAddon, Input, HStack, Button, useToast as toast} from '@chakra-ui/react'
import InputForm from '../../../components/InputFormEx'
import router from 'next/router'

export const getServerSideProps = async (context) => {
    const response = await findAsistente(context.query)
    return {
        props: {
            data: response.data
        }
    }
}

const editar = ({data}) => {
  const [asistentec, setAsistentec] = state(data)
  const { asistente } = router.query

  const handleChange = (e) => {
    setAsistentec({
        ...asistentec,
        [e.target.name]: e.target.value
    })
  }

  const submitAsistente = (e) => {
    e.preventDefault()
    updateAsistente(asistente, asistentec).then(res => {
      if(res.status == '200'){
        router.push('/asistente')
      }
    })
  }

  return (
    <>
    <Container maxW="container.sm" >
        <Heading as="h1" size="2xl" textAlign="center" my={20}>Actualizacion de Asistente: {data.nombre}</Heading>
        <form id='form' onSubmit={submitAsistente}>
        <Stack spacing={3}  my={20} justify="center">
            <InputForm name="rut" placeholder="RUT sin punto y con guion" handleChange={handleChange} label="RUT" type="text" value={asistentec.rut} maxLength={10} minLength={9}/> 
            <InputForm name="nombre" placeholder="Nombre Completo" handleChange={handleChange} label="Nombre" type="text" value={asistentec.nombre} /> 
            <InputForm name="fecha_de_nac" handleChange={handleChange} label="Fecha de Nacimiento" type="date" value={asistentec.fecha_de_nac.substring(0,10)}/>
            <InputForm name="direccion" handleChange={handleChange} label="Direccion" type="address" placeholder="Direccion" value={asistentec.direccion} /> 
            <FormControl>
                <FormLabel>Telefono</FormLabel>
                <InputGroup>
                    <Input type="tel" placeholder='Telefono' name={"telefono"} onChange={handleChange} value={asistentec.telefono} maxLength={9} minLength={8}/>
                </InputGroup>
            </FormControl>
            <InputForm name="correo" placeholder="Correo Electronico" type="email" handleChange={handleChange} label="Correo Electronico"  value={asistentec.correo}/>
      </Stack>
      <HStack>
        <Button colorScheme={"whatsapp"} type={"submit"} >Confirmar</Button>
        <Button colorScheme={"red"} onClick={() => router.back()}>Cancelar</Button>
      </HStack>
        </form>
      
    </Container>

    </>
  )
}

export default editar