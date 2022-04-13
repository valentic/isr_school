import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { adminService } from 'services'
import { Trash, CircleCheck, AlertCircle } from 'tabler-icons-react'
import { useModals } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { userKeys } from './UserKeys'

import {
    ActionIcon,
    Text
} from '@mantine/core'

const UserDelete = ({user}) => {

    const mutation = useMutation(adminService.deleteUser)
    const navigate = useNavigate()
    const modals = useModals()
    const queryClient = useQueryClient()

    if (mutation.isError) {
        showNotification({
            title: 'Error updating user',
            message: mutation.error,
            color: 'red',
            icon: <AlertCircle /> 
        })
        mutation.reset()
    }

    const remove = async (user) => {
        await mutation.mutateAsync(user.id)
        queryClient.invalidateQueries(userKeys.list())

        showNotification({
            title: 'Delete notification',
            message: `User ${user.username} has been deleted`,
            color: 'green',
            icon: <CircleCheck /> 
        })

        navigate('..') 
    }

    const openDeleteModal = () => (
        modals.openConfirmModal({
            title: 'Delete User Account',
            centered: true,
            children: (
              <Text size="sm">
                Are you sure you want to delete {user.username}? 
              </Text>
            ),
            labels: { confirm: 'Delete account', cancel: "No don't delete it" },
            confirmProps: { color: 'red' },
            onConfirm: () => remove(user) 
        })
    )

    return (
        <ActionIcon sx={(theme) => ({ color: theme.colors.red[4] })}> 
          <Trash onClick={openDeleteModal} />
        </ActionIcon>
    )
}

export { UserDelete }

