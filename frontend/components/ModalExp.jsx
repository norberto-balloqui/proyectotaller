import React from 'react'
import { Stack, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react'

const ModalExp = ({header, body, submit, button, color}) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    
    
    return (
    <Stack>
    <Button my={5} onClick={onOpen} colorScheme={color}>{button}</Button>
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
                {body}
          </ModalBody>
        </ModalContent>
    </Modal>
    </Stack>

  )
}

export default ModalExp