import { FormControl, FormLabel, Select } from '@chakra-ui/react'
import React from 'react'

const SelectForm = ({label, name, placeholder, handleChange, content, value}) => {
  return (
    <FormControl id={name}>
        <FormLabel>{label}</FormLabel>
        <Select name={name} placeholder={placeholder} onChange={handleChange} isRequired value={value}>
            {content}
        </Select>
    </FormControl>
  )
}

export default SelectForm