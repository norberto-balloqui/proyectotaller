import { FormControl, FormLabel, Textarea } from '@chakra-ui/react'
import React from 'react'

const TextareaForm = ({label, name, placeholder, handleChange, value, defaultValue}) => {
  return (
    <FormControl id={name}>
        <FormLabel>{label}</FormLabel>
        <Textarea placeholder={placeholder} name={name} onChange={handleChange} value={value} defaultValue={defaultValue}/>
    </FormControl>
  )
}

export default TextareaForm