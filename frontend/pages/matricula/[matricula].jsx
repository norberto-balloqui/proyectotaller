import {useState as state,useEffect as effect} from 'react'
import {findMatricula, updateMatricula} from '../../data/matricula'
import { Container, Stack, Heading, FormControl, FormLabel, InputGroup, InputLeftAddon, Input, HStack, Button, useToast } from '@chakra-ui/react'
import router from 'next/router'
import SelectForm from '../../components/SelectForm'
import InputForm from '../../components/InputForm'
import {getParvulos} from '../../data/parvulo'
import {getApoderados} from '../../data/apoderado'

export const getServerSideProps = async (context) => {
    const response = await findMatricula(context.query)
    return {
        props: {
            data: response.data
        }
    }
}





const editar = ({data}) => {
  const [matriculac, setMatriculac] = state(data)
  const [parvulos, setParvulos] = state([])
  const [apoderados, setApoderados] = state([])
  const {matricula} = router.query

  const handleChange = (e) => {
    setMatriculac({
        ...matriculac,
        [e.target.name]: e.target.value
    })
  }

  const submitMatricula = (e) => {
    e.preventDefault()
    updateMatricula(matricula, matriculac).then(res => {
      if(res.status == '200'){
        router.push('/matricula')
      }
    })
  }

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

  effect(() => {
    getParvulos().then(res =>{
      setParvulos(res.data)     
    })

    getApoderados().then(res =>{
      setApoderados(res.data)
    })


    
  }, [])


  return (
    <>
    <Container maxW="container.sm" >
        <Heading as="h1" size="2xl" textAlign="center" my={20}>Registro de matricula</Heading>
        <Stack spacing={3}  my={20} justify="center">
            <InputForm name="valor" placeholder="valor matricula" handleChange={handleChange} label="Valor matricula" type="number"/> 
            <InputForm name="abono" placeholder="Abono de matricula" handleChange={handleChange} label="Abono matricula" type="number"/> 
            <SelectForm name="parvulo" placeholder="Seleccione parvulo a matricular" handleChange={handleChange} label="Parvulo" content={contentSelectParvulos()}/>


            <SelectForm name="apoderado" placeholder="Seleccione apoderado(obligatorio)" handleChange={handleChange} label="Apoderado 1" content={contentSelectApoderados()}/>
            <SelectForm name="apoderado 2" placeholder="Seleccione apoderado 2(opcional)" handleChange={handleChange} label="Apoderado 2" content={contentSelectApoderados()}/>
            <SelectForm name="apoderado 3" placeholder="Seleccione apoderado 2(opcional)" handleChange={handleChange} label="Apoderado 3" content={contentSelectApoderados()}/>
            

      </Stack>
      <HStack>
        <Button colorScheme={"green"} onClick={submitMatricula}>Guardar</Button>
        <Button colorScheme={"yellow"} onClick={() => router.push('./matricula')}>Regresar</Button>
      </HStack>
      
    </Container>

    </>
  )
}

export default editar