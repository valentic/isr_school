import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { adminService } from '~/services'
import { useModals } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { userKeys } from './UserKeys'

import { 
    IconTrash, 
    IconCircleCheck, 
    IconAlertCircle 
    } from '@tabler/icons-react'

import {
    ActionIcon,
    Text
} from '@mantine/core'

const UserDelete = ({user}) => {

    const mutation = useMutation({
        mutationFn: adminService.deleteUser
    })
    const navigate = useNavigate()
    const modals = useModals()
    const queryClient = useQueryClient()

    if (mutation.isError) {
        showNotification({
            title: 'Error updating user',
            message: mutation.error,
            color: 'red',
            icon: <IconAlertCircle /> 
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
            icon: <IconCircleCheck /> 
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
        <ActionIcon variant="default" c="red"> 
          <IconTrash onClick={openDeleteModal} />
        </ActionIcon>
    )
}

export { UserDelete }

