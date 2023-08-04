import { Container, Heading } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import axios from 'axios';

const Index = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api');
        console.log('Conectado al backend:', response.data);
      } catch (error) {
        console.error('Error al conectar al backend:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Container maxW={'container.sm'} centerContent backgroundColor="blackAlpha.400" mt="10" borderRadius="10">
        <Heading as="h1" textAlign="center" mt={10} mb={30}>
          Tienda de Buzoss
        </Heading>
      </Container>
    </>
  );
};

export default Index;
