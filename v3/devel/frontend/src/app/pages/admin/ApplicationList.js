import React from 'react'
import { Outlet } from 'react-router-dom'
import { ApplicationTable } from './ApplicationTable'
import { useApplicationsActive } from './ApplicationQuery'
import { useApplicationsTrash } from './ApplicationQuery'
import { ExportToCsv } from 'export-to-csv-fix-source-map'
import { Download } from 'tabler-icons-react'

import {
    Container,
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

    const handleDownload = async () => {
        applicationExporter.generateCsv(query.data)
    }

    return (
        <>
          { download ? <Button onClick={handleDownload} leftIcon={<Download/>}>Download as CSV</Button> : null }
          <ApplicationTable applications={query.data} />
          <Outlet />
        </>
    )
}

const Active = () => <ApplicationListView queryFunc={useApplicationsActive} download />
const Trash = () => <ApplicationListView queryFunc={useApplicationsTrash} />

const ApplicationList = { Active, Trash }

export { ApplicationList }
