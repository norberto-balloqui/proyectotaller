import React, { useEffect as effect, useState as state } from 'react';
import { Button, Container, Heading, Stack, Select, FormControl, FormLabel, Input, HStack } from '@chakra-ui/react';

import router from 'next/router';

import { VerCliente } from '../tienda/cliente';
import { VerEstado } from '../tienda/estado';
import { CrearPedido } from '../tienda/pedido';
import Swal from 'sweetalert2';

const PedidoCrear = () => {

  const [clientes, verClientes] = state([]);
  const [estados, verEstados] = state([]);

  effect(() => {
    VerCliente().then(res => {
      verClientes(res.data);
    });
    VerEstado().then(res => {
      verEstados(res.data);
    });
  }, []);

  const [pedido, PedidoVer] = state({
    _id: '',
    fecha_registro: '',
    fecha_despacho: '',
    comentario: '',
    precio_total: '',
    abono_total: '', 
    cliente: '',
    estado: ''
  });

  const bodyClientes = () => {
    return clientes.map((cliente => (
      <option value={cliente._id} key={cliente._id}>{cliente.nombre}</option>
    )));
  };

  const bodyEstados = () => {
    return estados.map((estado => (
      <option value={estado._id} key={estado._id}>{estado.nombre}</option>
    )));
  };

  const handlechange = (e) => {
    PedidoVer({
      ...pedido,
      [e.target.name]: e.target.value
    });
  };

  const pedidoCrear = async (e) => {
    e.preventDefault();

    console.log(pedido);

    const response = await CrearPedido(pedido);
    if (response.status === 200) {
      Swal.fire(
        {
          icon: 'success',
          title: 'Pedido creado con éxito',
          showConfirmButton: true,
          text: 'El pedido se ha registrado correctamente.'
        }).then(() => {
          router.push('./pedido');
        });
    } else {
      Swal.fire(
        {
          icon: 'error',
          title: 'Error',
          showConfirmButton: true,
          text: 'Ha ocurrido un error al crear el pedido.'
        }
      );
    }
  };

  return (
    <>
      <Container maxW="container.lg" my='40'>
        <Stack spacing={5} my={'30'}>
          <Heading as='h1' size={'2xl'} align='center' textColor={'Black'}>Registrar pedido</Heading>
          <Container maxW='container.lg' marginTop={'40'}>
            <Stack spacing={8}>


            <FormControl id="fecha_registro">
                <FormLabel>Fecha de registro</FormLabel>
                <Input type="date" name="fecha_registro" onChange={handlechange} value={pedido.fecha_registro} readOnly />
              </FormControl>

            <FormControl id="fecha_despacho">
              <FormLabel>Seleccione fecha de despacho</FormLabel>
              <Input type="date" name={"fecha_despacho"} onChange={handlechange} />
            </FormControl>

              

              <FormControl id="comentario">
                <FormLabel>Ingrese nuevo pedido</FormLabel>
                <Input type="text" name="comentario" placeholder="" onChange={handlechange} value={pedido.comentario} />
              </FormControl>

              <FormControl id="Precio Total">
                <FormLabel>Ingrese precio total</FormLabel>
                <Input type="text" name="precio_total" placeholder="" onChange={handlechange} value={pedido.precio_total} />
              </FormControl>

              <FormControl id="Abono Total">
                <FormLabel>Ingrese Abono</FormLabel>
                <Input type="text" name="abono_total" placeholder="" onChange={handlechange} value={pedido.abono_total} />
              </FormControl>

              <FormControl id="cliente">
                <FormLabel></FormLabel>
                <Select variant='filled' name='cliente' onChange={handlechange} placeholder='Seleccione Cliente'>
                  {bodyClientes()}
                </Select>
              </FormControl>

              <FormControl id="estado">
                <FormLabel></FormLabel>
                <Select variant='filled' name='estado' onChange={handlechange} placeholder='Seleccione Estado'>
                  {bodyEstados()}
                </Select>
              </FormControl>
            </Stack>
            <HStack maxW={'full'} alignItems='center'>
              <Button colorScheme='green' marginTop='10' marginBottom='10' minW={'100'} marginRight='15' onClick={pedidoCrear}>Guardar</Button>
              <Button colorScheme='yellow' marginTop='10' marginBottom='10' minW={'100'} onClick={() => router.push('./pedido')}>Volver</Button>
            </HStack>
          </Container>
        </Stack>
      </Container>
    </>
  );
};

export default PedidoCrear;
