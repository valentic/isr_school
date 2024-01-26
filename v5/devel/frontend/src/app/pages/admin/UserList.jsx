import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link, Outlet } from 'react-router-dom'
import { adminService } from '~/services'
import { IconCirclePlus, IconEdit } from '@tabler/icons-react'
import { userKeys } from './UserKeys'
import { UserDelete } from './UserDelete'
import moment from 'moment'

import {
    Container,
    Title,
    LoadingOverlay,
    Group,
    Table,
    Text,
    Button,
    ActionIcon
} from '@mantine/core'

const UserEdit = ({user}) => {
    return (
      <ActionIcon variant="default" component={Link} to={`${user.id}/update`} >
        <IconEdit /> 
      </ActionIcon>
    )
}

const UserList = () => {

    const query = useQuery({
        queryKey: userKeys.list(), 
        queryFn: adminService.getUsers
    })

    const rows = query.data?.users.map((user,index) => {

        const created_on = moment(user.created_on)

        return (
            <Table.Tr key={user.id} >
              <Table.Td>
                <div>
                  <Text size="sm" weight={500}> {user.username} </Text>
                  <Text size="xs" color="dimmed"> {user.email} </Text>
                </div>
              </Table.Td>
              <Table.Td style={{textTransform: 'capitalize'}}>{user.role}</Table.Td>
              <Table.Td>
                <div>
                  <Text size="xs"> {created_on.format('MMM DD, YYYY')} </Text>
                  <Text size="xs" color="dimmed"> {created_on.format('HH:MM:SS')} UTC</Text>
                </div>
              </Table.Td>
              <Table.Td>{user.active ? "Yes" : "No"}</Table.Td>
              <Table.Td>{user.pending ? "Yes" : "No"}</Table.Td>
              <Table.Td>
                <Group>
                  <UserEdit user={user} />
                  <UserDelete user={user} />
                </Group>
              </Table.Td>
            </Table.Tr>
        )
    })

    if (query.isError) {
        return (
            <Container>
              <Title>Error</Title>
              <div>{query.error.message}</div>
            </Container>
        )
    }

    return (
        <>
          <LoadingOverlay visible={query.isLoading} />

          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>User</Table.Th>
                <Table.Th>Role</Table.Th>
                <Table.Th>Created On</Table.Th>
                <Table.Th>Active</Table.Th>
                <Table.Th>Pending</Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {rows}
            </Table.Tbody>
          </Table>

          <Button component={Link} to="create" variant="outline" leftSection={<IconCirclePlus />} mt="1rem">
            Create new user
          </Button>

          <Outlet />

        </>
    )
}

export { UserList }

