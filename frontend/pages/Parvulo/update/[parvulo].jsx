import {useState as state,useEffect as effect} from 'react'
import {findParvulo, updateParvulo} from '../../../data/parvulo'
import { Container, Stack, Heading, FormControl, FormLabel, InputGroup, InputLeftAddon, Input, HStack, Button, useToast } from '@chakra-ui/react'
import InputForm from '../../../components/InputForm'
import router from 'next/router'
import SelectForm from '../../../components/SelectForm'
import {BuscarGrados} from '../../../data/Grado'




export const getServerSideProps = async (context) => {

    const response = await findParvulo(context.query)
    return {
        props: {
            data: response.data
        }
    }
}


const editar = ({data}) => {
  const [parvuloc, setParvuloc] = state(data)
  const [grados, setGrados] = state([])
  const {parvulo} = router.query

  const handleChange = (e) => {
    setParvuloc({
        ...parvuloc,
        [e.target.name]: e.target.value
    })
  }

  const submitParvulo = (e) => {
    e.preventDefault()
    updateParvulo(parvulo, parvuloc).then(res => {
      if(res.status == '200'){
        router.push('/parvulo')
      }
    })
  }


  const contentSelectGrados = () => {
    return grados.map((grado => (
      <option value={grado._id} key={grado._id}>{grado.grado}</option>
    )
    ))
  }


  effect(() => {
    BuscarGrados().then(res =>{

      setGrados(res.data)

  
      
    })   
  }, [])

  return (
    <>
    <Container maxW="container.sm" >
        <Heading as="h1" size="2xl" textAlign="center" my={20}>Registro de Parvulo</Heading>
        <Stack spacing={3}  my={20} justify="center">
            <InputForm name="rut" isRequired={"True"}  placeholder="RUT sin punto y con guion" handleChange={handleChange} label="RUT" type="text"/> 
            <InputForm name="nombre" isRequired={"True"} placeholder="Nombre Completo" handleChange={handleChange} label="Nombre" type="text" /> 
            <InputForm name="fecha_de_nac" isRequired={"True"} handleChange={handleChange} label="Fecha de Nacimiento" type="date" />
            <SelectForm name="grado" isRequired={"True"} placeholder="Seleccione grado parvulo" handleChange={handleChange} label="Grado" content={contentSelectGrados()}/>
      </Stack>
      <HStack>
        <Button colorScheme={"green"} onClick={submitParvulo}>Guardar</Button>
        <Button colorScheme={"yellow"} onClick={() => router.push('./parvulo')}>Regresar</Button>
      </HStack>
      
    </Container>

    </>
  )
}

export default editar