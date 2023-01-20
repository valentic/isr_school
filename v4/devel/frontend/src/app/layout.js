import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box, createStyles } from '@mantine/core'

import { HeaderResponsive } from './header'
import { Footer } from './footer'
import { useAuth } from 'app'

const useStyles = createStyles((theme) => {

    return {

        page: {
            display: 'grid',
            gridTemplateColumns: '1fr',
            gridTemplateRows: 'auto 1fr',
            gridTemplateAreas: "'header' 'main'",
            height: '100vh',
        },

        main: {
            gridArea: 'main',
            overflow: 'auto',
            display: 'grid',
            gridTemplateRows: '1fr auto',
            gridTemplateColumns: `1fr minmax(0, ${theme.breakpoints.sm}px) 1fr`,
        },

        section: {
            gridArea: '1 / 2 / 1 / 3',
            padding: '5px 0 0 0',
            width: '100%',
            display: 'flex'
        },

        footer: {
            gridArea: '2 / 1 / 3 /4'
        }
    }
})

const Layout = () => {

    const { classes } = useStyles()
    const auth = useAuth()

    let links = [
        { link: '/',            label: 'Home'           },
        { link: '/apply',       label: 'Application'    },
        { link: '/contacts',    label: 'Contact Us'     }
        ]

    if (auth.loggedIn()) {
        links.push({link: '/admin',     label: 'Dashboard'  })
        links.push({link: '/logout',    label: 'Sign out' })
    }
    
    return (
        <Box className={classes.page}> 
          <HeaderResponsive className={classes.header} links={links} /> 
          <main className={classes.main}> 
            <section className={classes.section} > 
              <Outlet />
            </section>
            <Footer className={classes.footer}/> 
          </main>
        </Box>
    )
}

export { Layout }
