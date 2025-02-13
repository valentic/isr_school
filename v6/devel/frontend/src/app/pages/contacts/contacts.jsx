import React from 'react'
import { 
    Container, 
    Text,
    Title
} from '@mantine/core'

const Contacts = () => {

    return (
        <Container size="sm" mt="1em">
          <Title order={2} c="blue.7">Contact Us</Title>
       
          <Text mt="1rem">
            For more information, please contact:<br/>
            Andrey Krywonos <a href="mailto:krywonos@ucf.edu">krywonos@ucf.edu</a>
          </Text>
         
        </Container>
    )
}

export { Contacts } 
