import React, { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from 'app'
import { 
    IconList, 
    IconUsers, 
    IconId, 
    IconTrash 
    } from '@tabler/icons'

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
        <Container sx={{ flexGrow: 1 }} my="1em">
          <Tabs value={activeTab} onTabChange={onChange} mb="1em" >
            <Tabs.List>
              <Tabs.Tab value="applications" icon={<IconList/>}>Applications</Tabs.Tab>
              <Tabs.Tab value="trash" icon={<IconTrash/>} disabled={!(isAdmin || isManager)}>Trash</Tabs.Tab>
              <Tabs.Tab value="users" icon={<IconUsers/>} disabled={!isAdmin}>Users</Tabs.Tab>
              <Tabs.Tab value="roles" icon={<IconId/>} disabled={!isAdmin}>Roles</Tabs.Tab>
            </Tabs.List>
          </Tabs>
          <Container px={0} sx={{ position: 'relative' }}>
            <Outlet />
          </Container>
        </Container>
    )
}

export { AdminHome }
