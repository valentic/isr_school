import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box } from '@mantine/core'

import { useAuth } from '~/app'

import { Header } from './header'
import { Footer } from './footer'
import classes from './layout.module.css'

const Layout = () => {

    const auth = useAuth()

    let links = [
        { label: 'Home',        link: '/'           },
        { label: 'Application', link: '/apply'      }, 
        { label: 'Contact Us',  link: '/contacts'   },
    ]

    if (auth.loggedIn()) {
        links.push({link: '/admin',     label: 'Dashboard'  })
        links.push({link: '/logout',    label: 'Sign out'   })
    }
    
    return (
        <Box className={classes.page}> 
          <Header links={links} /> 
          <main className={classes.main}> 
            <section className={classes.section} > 
              <Outlet />
            </section>
          </main>
          <Footer /> 
        </Box>
    )
}

export { Layout }
