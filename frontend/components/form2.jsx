import React from 'react'
import { FormControl, FormLabel, Input} from '@chakra-ui/react'

const InputForm = ({name, placeholder, handlechange, label, type, value}) => {
  return (
    <FormControl id={name} >
        <FormLabel>{label}</FormLabel>
        <Input variant={"filled"} type={type} name={name} placeholder={placeholder} onChange={handlechange} value={value}  />
    </FormControl>  )
}

export default InputForm