import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export const AdminRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => {
        const user = JSON.parse(localStorage.getItem('user'))
        return  (
            user && user.admin
            ? <Component {...props} />
            : <Redirect to='/login' />
        )
    }} />
)


