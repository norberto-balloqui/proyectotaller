import React from 'react'
import { Stack, Input, InputGroup, FormControl, FormLabel} from '@chakra-ui/react'
import {HandleChange} from '../pages/registroAsistente'


const InputAsistente = ({type, placeholder, name, label}) => {
  return (
    
    <Stack spacing={3}>
            <FormControl>
                <FormLabel>{label}</FormLabel>
                <Input type={type} placeholder={placeholder} name={name} onChange={HandleChange}/>
            </FormControl>
    </Stack>
  )
}

export default InputAsistente