import React, { useEffect } from 'react';
import { Container, Heading, Text } from '@chakra-ui/react';
import { VerClientePorId } from '../tienda/cliente';

const TestVerClientePorId = () => {
  useEffect(() => {
    // Llamamos a la función VerClientePorId con un ID de ejemplo
    const idEjemplo = '64b7a7cfae70f72fe468e7b9'; // Reemplaza esto con un ID válido de tu base de datos
    VerClientePorId(idEjemplo)
      .then((response) => {
        console.log('Respuesta de la función VerClientePorId:', response);
      })
      .catch((error) => {
        console.error('Error al obtener cliente por ID:', error);
      });
  }, []);

  return (
    <Container maxW="container.md" my="50">
      <Heading as="h1" size="xl" color="teal.500" textAlign="center" mb="8">
        Verificación de VerClientePorId
      </Heading>
      <Text textAlign="center">
        Revisa la consola del navegador para ver si los datos se imprimen correctamente.
      </Text>
    </Container>
  );
};

export default TestVerClientePorId;
