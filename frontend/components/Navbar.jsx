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
            Sala Cuna
            </Link>
            <ul>
                <li>
                    <Link as={NextLink} href='/Educadora/VistaEducadoras'>Educadora</Link>
                </li>
                <li>
                    <Link as={NextLink} href='/asistente'>Asistente</Link>
                </li>
                <li>
                    <Link as={NextLink} href='/apoderado'>Apoderado</Link>
                </li>
                <li>
                    <Link as={NextLink} href='/asistencia'>Asistencia</Link>
                </li>
                <li>
                    <Link as={NextLink} href='/Rutina/VistaRutinas'>Rutina</Link>
                </li>

                <li>
                    <Link as={NextLink} href='/enfermedad'>Enfermedad</Link>
                </li>
                <li>
                    <Link as={NextLink} href='/antecedente'>Antecedente</Link>
                </li>
                <li>
                    <a onClick={() => router.replace('/parvulo')}>Parvulo</a>
                </li>
                <li>
                    <a onClick={() => router.replace('/matricula')}>Matricula</a>
                </li>
            </ul>
        </nav>
    </Stack>
  )
}

export default Navbar
