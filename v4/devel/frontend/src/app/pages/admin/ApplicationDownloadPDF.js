import React from 'react'
import { Outlet } from 'react-router-dom'
import { useApplicationsActive } from './ApplicationQuery'
import { IconDownload } from '@tabler/icons'
import { ApplicationDoc } from './ApplicationDoc'
import { PDFDownloadLink } from '@react-pdf/renderer'

import {
    Button,
    Container,
    LoadingOverlay,
    Title
} from '@mantine/core'

const ApplicationDownloadPDF = () => {

    const query = useApplicationsActive() 

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

    return (
      <> 
        <Button leftIcon={<IconDownload/>}>
          <PDFDownloadLink 
            document={<ApplicationDoc applications={query.data}/>} 
            fileName="ISR_School_Applications.pdf"
            style={{ textDecoration: 'none', color: 'white' }}

          >
            {({loading}) => loading ? 'Generating...' : 'Download PDF' }
          </PDFDownloadLink>
        </Button>
        <Outlet />
      </>
    )
}

export { ApplicationDownloadPDF }
