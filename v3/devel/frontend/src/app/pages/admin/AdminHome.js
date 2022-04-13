import React, { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from 'app'
import { List, Users, Id, Trash } from 'tabler-icons-react'

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

    const onChange = (active, tabKey) => {
        setActiveTab(active)
        navigate(tabKey, { replace: true }) 
    }

    return (
        <Container sx={{ flexGrow: 1 }} my="1em">
          <Tabs active={activeTab} onTabChange={onChange} mb="1em" >
            <Tabs.Tab label="Applications" tabKey="applications" icon={<List/>}/>
            <Tabs.Tab label="Trash" tabKey="trash" icon={<Trash/>} disabled={!(isAdmin || isManager)} />
            <Tabs.Tab label="Users" tabKey="users" icon={<Users/>} disabled={!isAdmin} />
            <Tabs.Tab label="Roles" tabKey="roles" icon={<Id/>} disabled={!isAdmin} />
          </Tabs>
          <Container px={0} sx={{ position: 'relative' }}>
            <Outlet />
          </Container>
        </Container>
    )
}

export { AdminHome }
