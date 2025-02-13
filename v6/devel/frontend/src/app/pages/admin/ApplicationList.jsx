import React from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { ApplicationTable } from './ApplicationTable'
import { useApplicationsActive } from './ApplicationQuery'
import { useApplicationsTrash } from './ApplicationQuery'
import { ExportToCsv } from 'export-to-csv-fix-source-map'
import { IconDownload } from '@tabler/icons-react'

import {
    Container,
    Flex,
    Title,
    LoadingOverlay,
    Button
} from '@mantine/core'

const applicationExporter = new ExportToCsv({
    filename: 'isr_school_applications',
    showLabels: true,
    useKeysAsHeaders: true
})

const ApplicationListView = ({queryFunc, download }) => {

    const query = queryFunc() 
    const navigate = useNavigate()

    if (query.isError) {
        return (
            <Container>
                <Title>Error</Title>
                <div>{query.error.message}</div>
            </Container>
        )
    }

    if (query.isLoading) {
        return <LoadingOverlay visible />
    }

    const handleCSV = async () => {
        applicationExporter.generateCsv(query.data)
    }

    const downloadPDF = () => {
        navigate('pdf') 
    }

    return (
        <>
          { download ? 
              <Flex
                gap="md"
                justify="flex-start"
                align="center"
                direction="row"
                wrap="wrap"
              >
                <Button onClick={handleCSV} leftSection={<IconDownload/>}>
                  Download as CSV
                </Button>
                <Button onClick={downloadPDF} >
                  PDF
                </Button>
              </Flex> : null 
          }
          <ApplicationTable applications={query.data} />
          <Outlet />
        </>
    )
}

const Active = () => <ApplicationListView queryFunc={useApplicationsActive} download />
const Trash = () => <ApplicationListView queryFunc={useApplicationsTrash} />

const ApplicationList = { Active, Trash }

export { ApplicationList }
