import { FormControl, FormLabel, Select } from '@chakra-ui/react'
import React from 'react'

const SelectForm = ({label, name, placeholder, handleChange, content, isRequired}) => {
  return (
    <FormControl id={name} isRequired={isRequired}>
        <FormLabel>{label}</FormLabel>
        <Select name={name} placeholder={placeholder} onChange={handleChange}>
            {content}
        </Select>
    </FormControl>
  )
}

export default SelectForm