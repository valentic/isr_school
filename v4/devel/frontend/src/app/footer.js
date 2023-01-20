import React from 'react'
import { Link } from 'react-router-dom'
import { createStyles } from '@mantine/core'

const useStyles = createStyles((theme) => {
    
    return {
        footer: {
            padding: '0.5em',
            backgroundColor: theme.colors.gray[2], 
            color: '#888',
            textAlign: 'center',
            fontSize: 'smaller',
            fontWeight: 'bold'
        }
    }
})

const Footer = ({className, props}) => {

    const release = process.env.REACT_APP_RELEASE
    const { classes, cx } = useStyles()

    return (
        <footer className={cx(classes.footer, className)} {...props}>
          Release {release} &nbsp; <Link to='/admin/'>Admin</Link>
        </footer>
    )
}

export { Footer }
