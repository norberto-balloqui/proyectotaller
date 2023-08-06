import { Container, Heading, Stack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import axios from 'axios';

const Index = () => {
  useEffect(() => {
    // Aquí puedes agregar cualquier lógica o peticiones que necesites
    // Por ejemplo, una petición a una API con axios
    // axios.get('/api/tu_ruta')
    //   .then((response) => {
    //     // Manejar la respuesta
    //   })
    //   .catch((error) => {
    //     // Manejar el error
    //   });
  }, []);

  return (
    <Container maxW='container.xl' my="50">

      
      <Heading
        as="h1"
        size="2xl"
        color="teal.500"
        textAlign="center"
        mt="15"
        fontFamily="New Romance"
        textShadow="1px 1px 3px rgba(0, 0, 0, 0.3)"
      >
        Bienvenido
      </Heading>
      <Stack spacing={'5'} mt='15'>
        {/* Aquí puedes agregar otros componentes, contenido, o lógica */}
      </Stack>
    </Container>
  );
};

export default Index;
