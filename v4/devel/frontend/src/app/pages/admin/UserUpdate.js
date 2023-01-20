import React from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { IconCircleCheck, IconAlertCircle } from '@tabler/icons'
import { adminService } from 'services'
import { showNotification } from '@mantine/notifications'
import { UserForm } from './UserForm'
import { userKeys } from './UserKeys' 

import { 
    Container, 
    Title,
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

const UserUpdate = () => {
    
    const { classes } = useStyles()
    const params = useParams()
    const query = useQuery(userKeys.list(), adminService.getUsers)
    const mutation = useMutation(adminService.updateUser)
    const navigate = useNavigate()

    if (query.isError) {
        return <div>Error</div>
    }

    if (query.isLoading) {
        return <div>Loading</div>
    }

    const users = query.data.users
    const user = users.find(({id}) => id === parseInt(params.id))

    if (mutation.isSuccess) {
        showNotification({
            title: 'Updated successful',
            message: `Updated user ${user.username}`,
            icon: <IconCircleCheck />,
            color: 'green'
        })
        mutation.reset()
        navigate('..')
    }

    if (mutation.isError) {
        showNotification({
            title: 'Error updating user',
            message: mutation.error.message,
            autoClose: false,
            color: 'red',
            icon: <IconAlertCircle />
        })
        mutation.reset()
    }

    return (
        <Container size="sm" my="1em" p="1em" className={classes.container}>

          <Title order={2} align="center" className={classes.title}> 
            Update User 
          </Title>

          <UserForm 
            initialValues={user}
            isLoading={mutation.isLoading}
            onFormSubmit={mutation.mutate}
            isUpdate
          />

        </Container>
    )
}

export { UserUpdate } 
