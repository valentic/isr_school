import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Outlet } from 'react-router-dom'
import { adminService } from '~/services'

import {
    Container,
    Title,
    LoadingOverlay,
    Table
} from '@mantine/core'

const RoleList = () => {

    const query = useQuery({
        queryKey: ['roles'], 
        queryFn: adminService.getRoles
    })

    const rows = query.data?.roles.map((role) => (
            <Table.Tr key={role.id}>
              <Table.Td style={{textTransform: 'capitalize'}}>{role.name}</Table.Td>
              <Table.Td>{role.description}</Table.Td>
              <Table.Td>{role.users.join(', ')}</Table.Td>
            </Table.Tr>
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
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Description</Table.Th>
                <Table.Th>Users</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>

          <Outlet />

        </>
    )
}

export { RoleList }

