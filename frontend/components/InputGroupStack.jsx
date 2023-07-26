import { Input, InputGroup, InputLeftAddon, Stack } from '@chakra-ui/react'
import React from 'react'

const inputgroupStack = ({type, placeholder}) => {
  return (
    <Stack>
        <InputGroup>
            <InputLeftAddon/>
            <Input type={type} placeholder={placeholder} />
        </InputGroup>
    </Stack>
  )
}

export default inputgroupStack