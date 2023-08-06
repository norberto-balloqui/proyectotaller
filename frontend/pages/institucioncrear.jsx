import React, { useEffect, useState } from 'react';
import { Button, Container, Heading, Stack, Select, FormControl, FormLabel, Input, Textarea, HStack,Box } from '@chakra-ui/react';
import InputForm from '../components/InputForm';
import router from 'next/router';

import { CrearInstitucion } from '../tienda/institucion';
import Swal from 'sweetalert2';

const InstitucionCrear = () => { 

 



  const [institucion, InstitucionVer] = useState({ 
    _id: '',
    nombre: '',
  });


  const cambioinstitucion = (e) => {
    InstitucionVer({
      ...institucion,
      [e.target.name]: e.target.value
    });
  };

  const institucioncrear = async (e) => {
    e.preventDefault();
  
    console.log(institucion);
  
    try {
      const response = await CrearInstitucion(institucion);
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Institucion guardada',
          showConfirmButton: true,
          text: 'Institución está correcta',
        }).then(() => {
          router.push('./productocrear');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          showConfirmButton: true,
          text: 'Institucion erróneo',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        showConfirmButton: true,
        text: 'Institución Errónea',
      });
    }
  };
  

  return (
    <>
      <Container maxW="container.lg" my="50">
      <Box p="6" borderWidth="1px" borderRadius="lg" margin="auto">
        <Stack spacing={5} my={'30'}>
        <Heading
      as="h1"
      size="2xl"
      color="teal.500" // Cambia el color del texto a un tono de verde azulado
      textAlign="center"
      mt="15"
      fontFamily="New Romance" // Si ya has definido la fuente "New Romance" en globals.css, puedes usarla aquí
      textShadow="1px 1px 3px rgba(0, 0, 0, 0.3)" // Agrega un sombreado al texto
    >
      
      Registrar 
      Institución
    </Heading>


          
          <Container maxW='container.lg' marginTop={'40'}>
            <Stack spacing={8}>
              <b/>
              
            
              <FormControl id="nombre">
                <FormLabel>Ingrese Nombre de institución</FormLabel>
                <InputForm type="text" name="nombre" placeholder="EJ: Jardin solsito" handlechange={cambioinstitucion} value={institucion.nombre} />
              </FormControl>

             
                         
            </Stack>
            <HStack maxW={'full'} alignItems="center">
              <Button colorScheme="green" marginTop="10" marginBottom="10" minW={'100'} marginRight="15" onClick={institucioncrear}>
                Guardar institucion
              </Button>
              <Button colorScheme="yellow" marginTop="10" marginBottom="10" minW={'100'} onClick={() => router.push('./productocrear')}>
                Volver
              </Button> 
            </HStack>
          </Container>
          
        </Stack>
        </Box>
      </Container>
    </>
  );
};

export default InstitucionCrear;