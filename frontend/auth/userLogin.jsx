// userLogin.jsx
import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Button, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../data/user';

const UserLogin = () => {
  const toast = useToast();
  const router = useRouter();
  const { dispatch, state } = useAuth();
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeUsuario = (e) => {
    setUsuario(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ usuario, password });
      console.log('Login Response:', res);
  
      if (res.status === 200) {
        toast({
          title: 'Te has logeado con éxito',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
  
        dispatch({
          type: 'LOGIN',
          payload: {
            user: res.data.user, // Actualizado para incluir información del usuario desde la respuesta
            isAuthenticated: true,
          }
        });
  
        router.reload();
      } else {
        console.log('Credenciales incorrectas');
        toast({
          title: 'Credenciales incorrectas',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  // Si el usuario está autenticado, no mostrar el formulario de inicio de sesión
  if (state.isAuthenticated) {
    return null;
  }

  return (
    <form>
      <FormControl>
        <FormLabel>Usuario</FormLabel>
        <Input type="text" onChange={handleChangeUsuario} />
      </FormControl>
      <FormControl>
        <FormLabel>Contraseña</FormLabel>
        <Input type="password" onChange={handleChangePassword} />
      </FormControl>
      <Button colorScheme="green" onClick={login}>
        Ingresar
      </Button>
    </form>
  );
};

export default UserLogin;
