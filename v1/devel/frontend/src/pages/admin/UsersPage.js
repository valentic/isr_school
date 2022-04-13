import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Header, Table, Button } from 'semantic-ui-react'
import { useStoreState, useStoreActions } from 'easy-peasy'

const UsersPage = () => {

    const getUsers = useStoreActions(actions => actions.admin.getUsers)
    const users = useStoreState(state => state.admin.users)
    
    useEffect(() => { 
        getUsers()
    },[getUsers])

    const rows = Object.values(users).map(user => (
        <Table.Row key={user.id}>
          <Table.Cell>{user.username}</Table.Cell>
          <Table.Cell>{user.email}</Table.Cell>
          <Table.Cell>{user.admin ? 'Yes' : 'No'}</Table.Cell>
          <Table.Cell>{user.active ? 'Yes' : 'No'}</Table.Cell>
        </Table.Row>
    ))

    return (
        <Container className="application">
          <Header as="h1" color="blue" dividing>List Users</Header>
          <Button as={Link} to="/admin" primary>Back to admin</Button>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Username</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Admin</Table.HeaderCell>
                <Table.HeaderCell>Active</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              { rows }
            </Table.Body>
          </Table>
        </Container>
    )
}

export { UsersPage }
