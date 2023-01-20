import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { adminService } from 'services'
import { NavButtons } from './NavButtons'
import { userKeys } from './UserKeys'

import {
    Container,
    Title,
    LoadingOverlay,
    Table
} from '@mantine/core'

const UserView = () => {

    const params = useParams()
    const query = useQuery(userKeys.list(), adminService.getUsers) 

    if (query.isError) {
        return (
            <Container>
                <Title>Error</Title>
                <div>{query.error.message}</div>
            </Container>
        )
    }

    if (query.isLoading) {  
        return (
            <Container>
                <div>Loading</div>
            </Container>
        )
    }

    const users = query.data.users
    const index = users.findIndex(({id}) => id === parseInt(params.id))

    if (index === -1) {
        return (
            <Container>
                <Title>Error</Title>
                <div>Unknown user Id</div>
            </Container>
        )
    }

    const user = users[index]

    const prevId = users[Math.max(0, index-1)].id
    const nextId = users[Math.min(users.length-1, index+1)].id

    const rows = Object.entries(user).map(([key,value]) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{String(value)}</td>
          </tr>
        )) 

    return (
        <Container>
          
          <LoadingOverlay visible={query.isLoading} />

          <Title>User Details</Title>
          <NavButtons prev={prevId} next={nextId} cur={user.id} label="Users" />
    
          <Table striped highlightOnHover>
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </Table>

        </Container>
    )
}

export { UserView }

