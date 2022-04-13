import React from 'react'
import { useMutation } from 'react-query'
import { Link, Navigate } from 'react-router-dom'
import { AlertCircle } from 'tabler-icons-react'
import { adminService } from 'services'
import { UserForm } from './UserForm'

import { 
    Container, 
    Title,
    Text, 
    Button,
    Center,
    Divider,
    createStyles
} from '@mantine/core'

const useStyles = createStyles((theme) => ({

    container: {
        backgroundColor: theme.colors.gray[0],
        border: '1px solid '+theme.colors.gray[5],
        position: 'relative'
    },

    title: {
        color: theme.colors.blue
    }

}))

const ErrorMessage = ({message}) => (

    <Container size="md" m="1em" p="1em">

      <Text size="xl" weight={700} color="red"><AlertCircle/> Submission Error</Text>
      <Divider />

      <Text>

        <p>
        Sorry, there was an error.
        </p>

        <Divider label="Error Message" labelPosition="center"/>
        <p> {message} </p>
        <Divider />

       </Text>

       <Center mt="1em">
         <Button component={Link} to="..">Continue</Button>
       </Center>
     </Container>
)

const UserCreate = () => {

    const initialValues = {
            username: '',
            email: '',
            password: '',
            pending: false,
            active: true,
            role: 'member'
        }

    const { classes } = useStyles()
    const mutation = useMutation(adminService.createUser)

    if (mutation.isSuccess) {
        return <Navigate to=".." />
    }

    if (mutation.isError) {
        return <ErrorMessage message={mutation.error.message} /> 
    }

    return (
        <Container size="sm" my="1em" p="1em" className={classes.container}>

          <Title order={2} align="center" className={classes.title}> 
            Create New User 
          </Title>

          <UserForm 
            initialValues={initialValues}
            isLoading={mutation.isLoading}
            onFormSubmit={mutation.mutate}
          />

        </Container>
    )
}

export { UserCreate } 
