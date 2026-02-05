import React from 'react'
import { 
    Routes, 
    Route, 
    Navigate, 
    Outlet, 
    useLocation 
} from 'react-router-dom'

import { Layout } from './layout'
import * as Page from './pages'
import { useAuth } from './auth'

const ProtectedRoute = ({
    isAllowed,
    redirectPath = '/login',
    children
}) => {
    const location = useLocation()

    if (!isAllowed) {
        return <Navigate to={redirectPath} replace state={{ from: location }} />
    }

    return children ? children : <Outlet /> 
}

const App = () => {

    const auth = useAuth()
    const is_admin = auth.hasRole('admin')
    const is_manager = auth.hasRole('manager')
    const is_member = auth.hasRole('member') 

    return (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Page.Home />} />
            <Route path="apply" element={<Page.Application/>} />
            <Route path="contacts" element={<Page.Contacts/>} />
            <Route path="login" element={<Page.Auth.Login />} />
            <Route path="logout" element={<Page.Auth.Logout />} />
            <Route element={<ProtectedRoute isAllowed={is_member || is_manager || is_admin} />}>
              <Route path="admin" element={<Page.Admin.Home />}> 
                <Route path="applications">
                  <Route index element={<Page.Admin.Applications.Active.List />} />
                  <Route path="pdf" element={<Page.Admin.Applications.Active.PDF />} />
                  <Route path=":id" element={<Page.Admin.Applications.Active.Detail />} />
                </Route>
                <Route element={<ProtectedRoute isAllowed={is_admin || is_manager} />}>
                  <Route path="trash">
                    <Route index element={<Page.Admin.Applications.Trash.List />} />
                    <Route path=":id" element={<Page.Admin.Applications.Trash.Detail />} />
                  </Route>
                </Route>
                <Route element={<ProtectedRoute isAllowed={is_admin} />}>
                  <Route path="users">
                    <Route index element={<Page.Admin.Users.List />} />
                    <Route path="create" element={<Page.Admin.Users.Create />} />
                    <Route path=":id/update" element={<Page.Admin.Users.Update />} />
                    <Route path=":id" element={<Page.Admin.Users.View />} />
                  </Route>
                  <Route path="roles">
                    <Route index element={<Page.Admin.Roles.List />} />
                  </Route>
                </Route>
                <Route index element={<Navigate to="applications" replace />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
    )
}

export { App } 
