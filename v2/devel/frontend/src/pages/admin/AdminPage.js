import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Button, Header } from 'semantic-ui-react'

const AdminPage = () => {
   
    return (
        <Container className="application">
          <Header as="h1" color='blue' dividing>Admin Functions</Header>
          <Button as={Link} to="/admin/applications">List Applications</Button>
          <Button as={Link} to="/admin/users">List Users</Button>
          <Button as={Link} to="/admin/history">History</Button>
        </Container>
    )
}

export { AdminPage }
