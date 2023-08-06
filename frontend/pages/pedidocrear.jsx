import React, { useEffect, useState } from 'react';
import { Button, Container, Heading, Stack, Select, FormControl, FormLabel, Input, HStack,Box,Textarea } from '@chakra-ui/react';
import router from 'next/router';

import { VerCliente } from '../tienda/cliente';
import { VerEstado } from '../tienda/estado';
import { CrearPedido } from '../tienda/pedido';
import Swal from 'sweetalert2';

const PedidoCrear = () => {
  const [clientes, setClientes] = useState([]);
  const [estados, setEstados] = useState([]);
  const [filtroCliente, setFiltroCliente] = useState('');
  const [pedido, setPedido] = useState({
    _id: '',
    fecha_registro: '',
    fecha_despacho: '',
    comentario: '',
    precio_total: '',
    abono_total: '',
    cliente: '',
    estado: '',
  });

  useEffect(() => {
    VerCliente().then((res) => {
      setClientes(res.data);
    });
    VerEstado().then((res) => {
      setEstados(res.data);
    });
  }, []);

  // Obtener la fecha actual
  const currentDate = new Date().toISOString().split('T')[0];

  const bodyClientes = () => {
    const clientesFiltrados = filtroCliente
      ? clientes.filter((cliente) =>
          cliente.nombre.toLowerCase().includes(filtroCliente.toLowerCase())
        )
      : clientes;

    return clientesFiltrados.map((cliente) => (
      <option value={cliente._id} key={cliente._id}>
         ({cliente.rut}) {cliente.nombre}
      </option>
    ));
  };

  const bodyEstados = () => {
    return estados.map((estado) => (
      <option value={estado._id} key={estado._id}>
        {estado.nombre}
      </option>
    ));
  };

  const handleChange = (e) => {
    setPedido({
      ...pedido,
      [e.target.name]: e.target.value,
    });
  };

  const pedidoCrear = async (e) => {
    e.preventDefault();
  
    console.log(pedido);
  
    try {
      const response = await CrearPedido(pedido);
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Pedido creado con éxito',
          showConfirmButton: true,
          text: 'El pedido se ha registrado correctamente.',
        }).then(() => {
          router.push('./pedido');
        });
      } else {
        throw new Error('Error al crear pedido');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        showConfirmButton: true,
        text: 'Pedido Erróneo.',
      });
    }
  };
  

  return (
    <>
      <Container maxW="container.lg" my="50">
      <Box p="6" borderWidth="1px" borderRadius="lg" margin="auto">
        <Stack spacing={5} my="30">
        <Heading
      as="h1"
      size="2xl"
      color="teal.500" // Cambia el color del texto a un tono de verde azulado
      textAlign="center"
      mt="15"
      fontFamily="New Romance" // Si ya has definido la fuente "New Romance" en globals.css, puedes usarla aquí
      textShadow="1px 1px 3px rgba(0, 0, 0, 0.3)" // Agrega un sombreado al texto
    >
      
      Hacer Pedido
    </Heading>
        </Stack>

        <Container maxW="container.lg" marginTop="40">
          <Stack spacing={8}>
            
            <FormControl id="fecha_despacho">
              <FormLabel>Seleccione fecha de despacho</FormLabel>
              <Input type="date" name="fecha_despacho" onChange={handleChange} min={currentDate} />
            </FormControl>

            <FormControl id="comentario">
            <FormLabel>Ingresar detalles</FormLabel>
            <Textarea name="comentario" placeholder="" onChange={handleChange} value={pedido.comentario} />
            </FormControl>

            <FormControl id="Precio Total">
              <FormLabel>Ingrese precio total</FormLabel>
              <Input type="text" name="precio_total" placeholder="" onChange={handleChange} value={pedido.precio_total} />
            </FormControl>

            <FormControl id="Abono Total">
              <FormLabel>Ingrese lo Abonado</FormLabel>
              <Input type="text" name="abono_total" placeholder="" onChange={handleChange} value={pedido.abono_total} />
            </FormControl>

            <FormControl id="filtro_cliente">
              <FormLabel>Escribir nombre de cliente a buscar</FormLabel>
              <Input
                type="text"
                name="filtro_cliente"
                placeholder=" EJ: manu"
                onChange={(e) => setFiltroCliente(e.target.value)}
                value={filtroCliente}
              />
            </FormControl>

            <FormControl id="cliente">
              <FormLabel></FormLabel>
              <Select variant="filled" name="cliente" onChange={handleChange} placeholder="Seleccione Cliente Buscado">
                {bodyClientes()}
              </Select>
            </FormControl>

            <FormControl id="estado">
              <FormLabel>Seleccione un estado</FormLabel>
              <Select variant="filled" name="estado" onChange={handleChange} placeholder="..">
                {bodyEstados()}
              </Select>
            </FormControl>
          </Stack>
          <HStack maxW="full" alignItems="center">
            <Button
              colorScheme="green"
              marginTop="10"
              marginBottom="10"
              minW="100"
              marginRight="15"
              onClick={pedidoCrear}
            >
              Guardar pedido
            </Button>
            <Button colorScheme="yellow" marginTop="10" marginBottom="10" minW="100" onClick={() => router.push('./pedido')}>
              Volver
            </Button>
            <Button colorScheme="yellow" marginTop="10" marginBottom="10" minW="100" onClick={() => router.push('./clientecrear2')}>
              Ingresar cliente nuevo
            </Button>
            
          </HStack>
        </Container>
        </Box>
      </Container>
    </>
  );
};

export default PedidoCrear;

