import React from 'react'
import { useStoreState } from 'easy-peasy'
import { NavLink } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

const MenuLink = ({children, ...props}) => (
    <Menu.Item as={NavLink} {...props}>{children}</Menu.Item>
)

const Navbar = () => {

    const auth = useStoreState(state => state.auth) 
    const loggedIn = auth && auth.user !== undefined
    const isAdmin = loggedIn && auth.user.admin

    const style = {
        border: '0',
        marginBottom: '0.5em',
        }

    if (loggedIn) {
        return (
            <Menu style={style} inverted pointing borderless secondary compact>
              <MenuLink to='/about'>About</MenuLink>
              { 0 ? <MenuLink to='/apply'>Apply</MenuLink> : null }
              { isAdmin ?  <MenuLink to='/admin'>Admin</MenuLink> : null }
              <MenuLink to='/logout'>Logout</MenuLink> 
            </Menu>
        )
    } else {
        return (
            <Menu style={style} inverted pointing borderless secondary compact>
              <MenuLink to='/about'>About</MenuLink>
              { 0 ? <MenuLink to='/apply'>Apply</MenuLink> : null }
            </Menu>
        )
    }
}

export { Navbar }

