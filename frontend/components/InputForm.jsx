import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'

const InputForm = ({label, handleChange, name, placeholder, type, value}) => {
  return (
    <FormControl id={name}>
        <FormLabel>{label}</FormLabel>
        <Input type={type} placeholder={placeholder} name={name} onChange={handleChange} value={value}/>
    </FormControl>
  )
}

export default InputForm