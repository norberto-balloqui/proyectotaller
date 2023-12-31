import React from 'react'
import { Stack, Link } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'

const Navbar = () => {
    const router = useRouter()
  return (
    <Stack>
        <nav className='nav'>
            
            <Link onClick={() => router.replace('/')} className='site-title'>
            Tienda de Buzos
            </Link>
            <ul>
                
                <li>
                    <Link as={NextLink} href='/cliente'>Clientes</Link>
                </li>
                <li>
                    <Link as={NextLink} href='/producto'>Productos</Link>
                </li>
                <li>
                    <Link as={NextLink} href='/pedido'>Pedidos</Link>
                </li>
               
                
            </ul>
        </nav>
    </Stack>
  )
}

export default Navbar
