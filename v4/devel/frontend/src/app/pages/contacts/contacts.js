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
                <td><a href="mailto:krywonos@ucf.edu">krywonos@ucf.edu</a></td>
              </tr>
            </tbody>
          </table>
          </p>
         
        </Container>
    )
}

export { Contacts } 
