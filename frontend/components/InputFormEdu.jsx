import React from 'react'
import { FormControl, FormLabel, Input} from '@chakra-ui/react'

const InputFormEdu = ({name, placeholder, handlechange, label, value, type, min, max}) => {
  return (
    <FormControl id={name} isRequired>
        <FormLabel>{label}</FormLabel>
        <Input variant={"filled"} type={type} name={name} placeholder={placeholder} onChange={handlechange} minLength={min} maxLength={max} value={value}/>
    </FormControl>  )
}

export default InputFormEdu
