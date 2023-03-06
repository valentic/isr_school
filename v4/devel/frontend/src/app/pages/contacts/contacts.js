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
          <table>
            <tbody>
              <tr>
                <td>Andrey Krywonos</td>
                <td><a href="mailto:krywonos@ucf.edu">kywonos@ucf.edu</a></td>
              </tr>
              <tr>
                <td>Shikha Raizada</td>
                <td><a href="mailto:shikha.raizada@ucf.edu">shikha.raizada@ucf.edu</a></td>
              </tr>
            </tbody>
          </table>
          </p>
         
        </Container>
    )
}

export { Contacts } 
