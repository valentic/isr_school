import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IconCheck } from '@tabler/icons-react'
import moment from 'moment'

import {
    Table,
    Text,
} from '@mantine/core'

const ApplicationTable = ({applications}) => {

    const navigate = useNavigate()

    const rows = applications.map((entry, index) => {

        const created_on = moment(entry.created_on)

        const showDetails = () => {
            navigate(`${entry.id}`)
        }

        return (
            <Table.Tr key={entry.id} onClick={showDetails} style={{cursor:'pointer'}}>
              <Table.Td>{index+1}</Table.Td>
              <Table.Td>
                <div>
                  <Text size="sm" weight={500}> {entry.firstname} {entry.lastname} </Text>
                  <Text size="xs" color="dimmed"> {entry.university} </Text>
                </div>
              </Table.Td>
              <Table.Td>{entry.supervisor_name}</Table.Td>
              <Table.Td>
                <div>
                  <Text size="xs"> {created_on.format('MMM DD, YYYY')} </Text>
                  <Text size="xs" color="dimmed"> {created_on.format('HH:MM:SS')} UTC</Text>
                </div>
              </Table.Td>
              <Table.Td>{entry.apptype}</Table.Td>
              <Table.Td>{entry.approved ? <IconCheck color="var(--mantine-color-green-filled)" /> : null }</Table.Td>
            </Table.Tr>
        )

    })

    return (
      <Table striped highlightOnHover> 
        <Table.Thead>
          <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Supervisor</Table.Th>
            <Table.Th>Submitted</Table.Th>
            <Table.Th>Type</Table.Th>
            <Table.Th>Approved</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {rows}
        </Table.Tbody>
      </Table>
)
}

export { ApplicationTable }

