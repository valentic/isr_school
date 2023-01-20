import React from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query' 
import { useNavigate } from 'react-router-dom'
import { adminService } from 'services' 
import { showNotification } from '@mantine/notifications'
import { applicationKeys } from './ApplicationQuery'

import { 
    IconBan, 
    IconAlertCircle, 
    IconCircleCheck, 
    IconTrashOff, 
    IconTrash 
    } from '@tabler/icons'

import {
    Button,
    Group
} from '@mantine/core'

const ApproveButton = ({application}) => {

    const mutation = useMutation(adminService.updateApplication)
    const queryClient = useQueryClient()

    if (mutation.isError) {
        showNotification({
            title: 'Error updating application',
            message: mutation.error,
            color: 'red',
            icon: <IconAlertCircle />
        })
    }

    const toggle = async (event) => {
        const payload = {
            id: application.id,
            approved: !application.approved
        }
        await mutation.mutateAsync(payload)
        mutation.reset()
        queryClient.invalidateQueries('applications')
    }

    const ToggleButton = ({icon, color, children}) => (
        <Button leftIcon={icon} color={color} onClick={toggle} variant="outline">
          {children}
        </Button>
    )

    return (
       <>
        { application.approved ? 
            <ToggleButton icon={<IconBan/>} color="yellow">No longer approve</ToggleButton>
            :
            <ToggleButton icon={<IconCircleCheck/>} color="green">Approve</ToggleButton>
        }
        </>
    )
}

const TrashButton = ({application}) => {

    const mutation = useMutation(adminService.updateApplication)
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    if (mutation.isError) {
        showNotification({
            title: 'Error updating application',
            message: mutation.error,
            color: 'red',
            icon: <IconAlertCircle />
        })
    }

    const toggle = async (event) => {
        const payload = {
            id: application.id,
            approved: false,
            trash: !application.trash
        }
        await mutation.mutateAsync(payload)
        mutation.reset()
        queryClient.invalidateQueries(applicationKeys.lists())
        navigate('..')
    }

    const ToggleButton = ({icon, color, children}) => (
        <Button leftIcon={icon} color={color} onClick={toggle} variant="outline">
          {children}
        </Button>
    )

    return (
       <>
        { application.trash ? 
            <ToggleButton icon={<IconTrashOff/>} color="blue">Restore from trash</ToggleButton>
            :
            <ToggleButton icon={<IconTrash/>} color="red">Move to trash</ToggleButton>
        }
        </>
    )
}

const ActiveButtons = (application) => (
    <Group mt="2em" mb="1em" position="center">
      <ApproveButton application={application} /> 
      <TrashButton application={application} /> 
    </Group>
)

const TrashButtons = (application) => (
    <Group mt="2em" mb="1em" position="center">
      <TrashButton application={application} /> 
    </Group>
)

const ManagerButtons = { 
    Active: ActiveButtons, 
    Trash: TrashButtons
}

export { ManagerButtons }

