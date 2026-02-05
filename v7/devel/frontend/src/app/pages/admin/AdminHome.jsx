import React, { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '~/app'
import { 
    IconList, 
    IconUsers, 
    IconId, 
    IconTrash 
    } from '@tabler/icons-react'

import { 
    Container,
    Tabs
} from '@mantine/core'

const AdminHome = () => {

    const location = useLocation()
    const url = location.pathname
    const curTab = url.substring(url.lastIndexOf('/')+1) 

    const tabList = ['applications','trash','users','roles']

    const [ activeTab, setActiveTab ] = useState(tabList.indexOf(curTab))
    const navigate = useNavigate()

    const auth = useAuth()
    const isAdmin = auth.hasRole('admin')
    const isManager = auth.hasRole('manager')

    const onChange = (value) => {
        setActiveTab(value)
        navigate(value, { replace: true }) 
    }

    return (
        <Container flex my="1em" size="sm"> 
          <Tabs value={activeTab} onChange={onChange} mb="1em" >
            <Tabs.List>
              <Tabs.Tab value="applications" leftSection={<IconList/>}>Applications</Tabs.Tab>
              <Tabs.Tab value="trash" leftSection={<IconTrash/>} disabled={!(isAdmin || isManager)}>Trash</Tabs.Tab>
              <Tabs.Tab value="users" leftSection={<IconUsers/>} disabled={!isAdmin}>Users</Tabs.Tab>
              <Tabs.Tab value="roles" leftSection={<IconId/>} disabled={!isAdmin}>Roles</Tabs.Tab>
            </Tabs.List>
          </Tabs>
          <Container px={0} style={{ position: 'relative' }}>
            <Outlet />
          </Container>
        </Container>
    )
}

export { AdminHome }
