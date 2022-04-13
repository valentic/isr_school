import React from 'react'
import { Redirect } from 'react-router-dom'
import { useStoreActions } from 'easy-peasy'

const LogoutPage = () => {
    const logout = useStoreActions(actions => actions.auth.logout)

    logout()
    return ( <Redirect to="/login" /> )
}

export { LogoutPage }
