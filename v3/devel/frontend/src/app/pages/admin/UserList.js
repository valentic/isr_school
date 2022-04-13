import React from 'react'
import { useQuery } from 'react-query'
import { Link, Outlet } from 'react-router-dom'
import { adminService } from 'services'
import { CirclePlus, Edit } from 'tabler-icons-react'
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
      <ActionIcon component={Link} to={`${user.id}/update`} >
        <Edit />
      </ActionIcon>
    )
}

const UserList = () => {

    const query = useQuery(userKeys.list(), adminService.getUsers)

    const rows = query.data?.users.map((user,index) => {

        const created_on = moment(user.created_on)

        return (
            <tr key={user.id} >
              <td>
                <div>
                  <Text size="sm" weight={500}> {user.username} </Text>
                  <Text size="xs" color="dimmed"> {user.email} </Text>
                </div>
              </td>
              <td style={{textTransform: 'capitalize'}}>{user.role}</td>
              <td>
                <div>
                  <Text size="xs"> {created_on.format('MMM DD, YYYY')} </Text>
                  <Text size="xs" color="dimmed"> {created_on.format('HH:MM:SS')} UTC</Text>
                </div>
              </td>
              <td>{user.active ? "Yes" : "No"}</td>
              <td>{user.pending ? "Yes" : "No"}</td>
              <td>
                <Group>
                  <UserEdit user={user} />
                  <UserDelete user={user} />
                </Group>
              </td>
            </tr>
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

          <Table striped>
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Created On</th>
                <th>Active</th>
                <th>Pending</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>

          <Button component={Link} to="create" variant="outline" leftIcon={<CirclePlus />} mt="1em">
            Create new user
          </Button>

          <Outlet />

        </>
    )
}

export { UserList }

