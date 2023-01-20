import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Outlet } from 'react-router-dom'
import { adminService } from 'services'

import {
    Container,
    Title,
    LoadingOverlay,
    Table
} from '@mantine/core'

const RoleList = () => {

    const query = useQuery(['roles'], adminService.getRoles)

    const rows = query.data?.roles.map((role) => (
            <tr key={role.id}>
              <td style={{textTransform: 'capitalize'}}>{role.name}</td>
              <td>{role.description}</td>
              <td>{role.users.join(', ')}</td>
            </tr>
        ))

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
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Users</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>

          <Outlet />

        </>
    )
}

export { RoleList }

