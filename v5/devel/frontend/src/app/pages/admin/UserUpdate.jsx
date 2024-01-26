import React from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { IconCircleCheck, IconAlertCircle } from '@tabler/icons-react'
import { adminService } from '~/services'
import { notifications } from '@mantine/notifications'
import { UserForm } from './UserForm'
import { userKeys } from './UserKeys' 

import { 
    Container, 
    Title,
} from '@mantine/core'

const UserUpdate = () => {
    
    const params = useParams()
    const query = useQuery({
        queryKey: userKeys.list(), 
        queryFn: adminService.getUsers
    })
    const mutation = useMutation({
        mutationFn: adminService.updateUser
    })
    const navigate = useNavigate()

    React.useEffect(() => {

        if (mutation.isSuccess) {
            notifications.show({
                title: 'Updated successful',
                /*message: `Updated user ${user.username}`,*/
                message: `Updated user`,
                icon: <IconCircleCheck />,
                color: 'green'
            })
            mutation.reset()
            navigate('..')
        }

        if (mutation.isError) {
            notifications.show({
                title: 'Error updating user',
                message: mutation.error.message,
                autoClose: false,
                color: 'red',
                icon: <IconAlertCircle />
            })
            mutation.reset()
        }
    }, [mutation, navigate])

    if (query.isError) {
        return <div>Error</div>
    }

    if (query.isLoading) {
        return <div>Loading</div>
    }

    const users = query.data.users
    const user = users.find(({id}) => id === parseInt(params.id))

    return (
        <Container 
            size="sm" my="1rem" p="1rem" bg="gray.0" 
            style={{ border: '1px solid var(--mantine-color-gray-5)' }}
        >

          <Title order={2} align="center" c="blue.9"> 
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
