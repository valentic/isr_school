import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button } from 'semantic-ui-react'
import { useStoreState, useStoreActions } from 'easy-peasy'

const PendingPage = () => {

    const getUsers = useStoreActions(actions => actions.admin.getUsers) 
    const users  = useStoreState(state => state.admin.users)
    
    useEffect(() => {
        getUsers()
    },[getUsers])

    const pending = Object.values(users).filter(user => user.pending)

    const rows = pending.map(user => (
        <Table.Row key={user.id}>
          <Table.Cell>{user.username}</Table.Cell>
          <Table.Cell>{user.email}</Table.Cell>
          <Table.Cell>{user.firstname}&nbsp;{user.lastname}</Table.Cell>
        </Table.Row>
    ))

    return (
        <div>
          <h1>Pending User Requests</h1>
          <Button as={Link} to="/admin" primary>Back to admin</Button>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Username</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              { rows }
            </Table.Body>
          </Table>
        </div>
    )
}

export { PendingPage }
