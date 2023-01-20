// https://tkdodo.eu/blog/effective-react-query-keys

import { useQuery } from '@tanstack/react-query'
import { adminService } from 'services'

const applicationKeys = {
    all:        ['applications'],
    lists:      () => [...applicationKeys.all, 'list'],
    list:       (state) => [...applicationKeys.lists(), state]
}

const useApplicationsQuery = (select) => 
    useQuery(applicationKeys.list(), adminService.getApplications, { select })

const useApplicationsActive = () => useApplicationsQuery(
    (data) => data.applications.filter((app) => !app.trash))

const useApplicationsTrash = () => useApplicationsQuery(
    (data) => data.applications.filter((app) => app.trash))

const applicationsDownload = async () => {
    const payload = {
        'document': 'applications',
        'format': 'csv'
    }

    await adminService.getDownload(payload)
}

export { applicationKeys, 
         useApplicationsQuery,
         useApplicationsActive,
         useApplicationsTrash,
         applicationsDownload
        } 
