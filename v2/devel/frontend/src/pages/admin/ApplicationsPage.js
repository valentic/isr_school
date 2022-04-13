import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Header, Container, Table, Button } from 'semantic-ui-react'
import { useStoreState, useStoreActions } from 'easy-peasy'

const ApplicationsPage = () => {

    const getApplications = useStoreActions(actions => actions.admin.getApplications)
    const applications = useStoreState(state => state.admin.applications)
    
    useEffect(() => { 
        getApplications()
    },[getApplications])

    console.log('Applications')
    console.log(applications)

    const rows = applications.map(application => (
        <Table.Row key={application.id}>
          <Table.Cell><Link to={'/admin/application/'+application.id}>View</Link></Table.Cell>
          <Table.Cell>{application.id}</Table.Cell>
          <Table.Cell>{application.created_on}</Table.Cell>
          <Table.Cell>{application.firstname} {application.lastname}</Table.Cell>
          <Table.Cell>{application.university}</Table.Cell>
          <Table.Cell>{application.supervisor_name}</Table.Cell>
          <Table.Cell>{application.approved ? 'Yes' : 'No'}</Table.Cell>
        </Table.Row>
    ))

    return (
        <Container className="application">
          <Header as="h1" color="blue" dividing>Applications</Header>
          <Button as={Link} to="/admin" primary>Back to admin</Button>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Submission Date</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>University</Table.HeaderCell>
                <Table.HeaderCell>Supervisor</Table.HeaderCell>
                <Table.HeaderCell>Approved</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              { rows }
            </Table.Body>
          </Table>
        </Container>
    )
}

export { ApplicationsPage }
