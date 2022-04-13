import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Header, Table, Button } from 'semantic-ui-react'
import { useStoreState, useStoreActions } from 'easy-peasy'

const HistoryPage = () => {

    const getHistory = useStoreActions(actions => actions.admin.getHistory)
    const history = useStoreState(state => state.admin.history)
    
    useEffect(() => { 
        getHistory()
    },[getHistory])

    const rows = Object.values(history).map(entry => (
        <Table.Row key={entry.id}>
          <Table.Cell>{entry.timestamp}</Table.Cell>
          <Table.Cell>{entry.username}</Table.Cell>
          <Table.Cell>{entry.action}</Table.Cell>
        </Table.Row>
    ))

    return (
        <Container className='application'>
          <Header as="h1" color="blue" dividing>Admin History</Header>
          <Button as={Link} to="/admin" primary>Back to admin</Button>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Timestamp</Table.HeaderCell>
                <Table.HeaderCell>Username</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              { rows }
            </Table.Body>
          </Table>
        </Container>
    )
}

export { HistoryPage }
