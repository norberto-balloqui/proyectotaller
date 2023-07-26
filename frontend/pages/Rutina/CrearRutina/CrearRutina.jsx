import {useState as state, useEffect as effect} from 'react'
import {CrearRutina} from '../../../data/Rutina'
import {BuscarGrados} from '../../../data/Grado'
import {BuscarEducadoras} from '../../../data/Educadora'
import { Container, Heading, Stack, FormControl, FormLabel, Input, Select, Button, Textarea, HStack} from '@chakra-ui/react'
import router from 'next/router'
import Swal from 'sweetalert2'

const Crear_Rutina = () => {
  const hoy = new Date().toLocaleDateString();
  const [grado, setGrado] = state([])
  const [educadora, setEducadora] = state([])

  effect(() => {
    BuscarGrados().then(res => {
      setGrado(res.data)
    })
    BuscarEducadoras().then(res => {
      setEducadora(res.data)
    })
}, [])

  const [rutina, setRutina] = state({
    fecha: Date.now('cl-CL'),
    grado: '',
    educadora: '',
    actividad: '',
    evaluacion: ''
  })

  const sacargrados = ()=>{
    return grado.map((grados=>(
      <option value={grados._id} key={grados._id}>{grados.grado}</option>
    )))
  }
  
  const sacareducadoras = ()=>{
    return educadora.map((educadoras=>(
      <option value={educadoras._id} key={educadoras._id}>{educadoras.nombre}</option>
    )))
  }

  const handlechange = (e) =>{
    setRutina({
      ...rutina,
      [e.target.name]: e.target.value
    })
  }

  const submitRutina = async (e) =>{
    e.preventDefault()
    const response = await CrearRutina(rutina)
      if(response.status == 200){
        Swal.fire(
          {
            icon: 'success',
            title: 'Rutina creada',
            showConfirmButton: true,
            text: 'La Rutina se ingreso correctamente'
          }).then(() =>{
            router.push('../VistaRutinas')
          })
      }else{
        Swal.fire(
          {
            icon: 'error',
            title: 'Error',
            showConfirmButton: true,
            text: 'Error al ingresar Rutina'
          }
        )
      }
  }

  return (
    <>
    <Container maxW="container.lg" my='40'>
      <Stack spacing={5} my={'15'}>
        <Heading as='h1' size={'2xl'} align='center' textColor={'black'}>Crear Rutina</Heading>
        <Container maxW='container.lg' marginTop={'40'}>
        <form onSubmit={submitRutina} id="form">
          <Stack spacing={7}>
            <FormControl id="fecha">
              <FormLabel>Fecha actual</FormLabel>
              <Input variant='filled' name='fecha' defaultValue={hoy} onChange={handlechange} disabled/>
            </FormControl>
            <FormControl id="grado" isRequired>
              <FormLabel>Grado</FormLabel>
              <Select variant='filled' name='grado' placeholder='Seleccione Grado' onChange={handlechange}>
                {sacargrados()}
              </Select>
            </FormControl >
            <FormControl id="educadora" isRequired>
              <FormLabel>Educadora</FormLabel>
              <Select variant='filled'name='educadora' onChange={handlechange} placeholder='Seleccione Educadora'>
                {sacareducadoras()}
              </Select>
            </FormControl>
            <FormControl id="actividad" isRequired>
              <FormLabel>Actividad</FormLabel>
              <Textarea variant='filled' type="text" placeholder='Ingrese Actividad' name={"actividad"} minLength={8} maxLength={200} onChange={handlechange}/>
            </FormControl>
            <FormControl id="evaluacion">
              <FormLabel>Evaluación</FormLabel>
              <Input variant='filled' placeholder='Evaluación' isDisabled />
            </FormControl>
          </Stack>
          <HStack maxW={'full'} alignItems='center'>
            <Button colorScheme='whatsapp' marginTop='10' marginBottom='10' minW={'100'} marginRight='15' type={"submit"}>Crear</Button>
            <Button colorScheme='red' marginTop='10' marginBottom='10' minW={'100'} onClick={()=>router.push('../VistaRutinas')}>Cancelar</Button>
          </HStack>
        </form>
        </Container>
      </Stack>
    </Container>
    </>
  )
}

export default Crear_Rutina