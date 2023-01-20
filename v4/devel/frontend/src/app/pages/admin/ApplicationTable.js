import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IconCheck } from '@tabler/icons'
import moment from 'moment'

import {
    Table,
    Text,
    createStyles
} from '@mantine/core'

const useStyles = createStyles((theme) => ({
    icon: {
        color: theme.colors.green[7]
    }
}))

const ApplicationTable = ({applications}) => {

    const navigate = useNavigate()
    const { classes } = useStyles()

    const rows = applications.map((entry, index) => {

        const created_on = moment(entry.created_on)

        const showDetails = () => {
            navigate(`${entry.id}`)
        }

        return (
            <tr key={entry.id} onClick={showDetails} style={{cursor:'pointer'}}>
              <td>{index+1}</td>
              <td>
                <div>
                  <Text size="sm" weight={500}> {entry.firstname} {entry.lastname} </Text>
                  <Text size="xs" color="dimmed"> {entry.university} </Text>
                </div>
              </td>
              <td>{entry.supervisor_name}</td>
              <td>
                <div>
                  <Text size="xs"> {created_on.format('MMM DD, YYYY')} </Text>
                  <Text size="xs" color="dimmed"> {created_on.format('HH:MM:SS')} UTC</Text>
                </div>
              </td>
              <td>{entry.apptype}</td>
              <td>{entry.approved ? <IconCheck className={classes.icon} /> : null }</td>
            </tr>
        )

    })

    return (
          <Table striped highlightOnHover>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Supervisor</th>
                <th>Submitted</th>
                <th>Type</th>
                <th>Approved</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
    )
}

export { ApplicationTable }

