import React from 'react'
import { 
    Container, 
    Title
} from '@mantine/core'

const Contacts = () => {

    return (
        <Container size="md" mt="1em">
          <Title 
            sx={(theme) => ({ color: theme.colors.blue })}
          >Contact Us</Title>
       
          <p>
          For more information about the school, please contact:{" "}
          <a href="mailto:shikha.raizada@ucf.edu">shikha.raizada@ucf.edu</a>.
          </p>
         
        </Container>
    )
}

export { Contacts } 
