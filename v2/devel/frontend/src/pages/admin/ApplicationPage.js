import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Header, Container, Table, Button } from 'semantic-ui-react'
import { useStoreState, useStoreActions } from 'easy-peasy'

const ApplicationPage = () => {

    const getApplications = useStoreActions(actions => actions.admin.getApplications)
    const applications = useStoreState(state => state.admin.applications)
    const { id } = useParams()
 
    useEffect(() => { 
        getApplications()
    },[getApplications])

    const application = applications.find(element => element.id===Number(id))

    console.log(id)
    console.log(application)

    const rows = application ? Object.entries(application).map(([key,value]) => (
        <Table.Row key={key}>
          <Table.Cell>{key}</Table.Cell>
          <Table.Cell>{value}</Table.Cell>
        </Table.Row>
    )) : null

    return (
        <Container className="application">
          <Header as="h1" color="blue" dividing>Application #{id}</Header>
          <Button as={Link} to="/admin/applications" primary>Back to applications</Button>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Key</Table.HeaderCell>
                <Table.HeaderCell>Value</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              { rows }
            </Table.Body>
          </Table>
        </Container>
    )
}

export { ApplicationPage }
