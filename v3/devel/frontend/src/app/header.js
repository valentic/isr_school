import React from 'react'
import { useBooleanToggle } from '@mantine/hooks'
import { NavLink } from 'react-router-dom'
import { 
    createStyles, 
    Header, 
    Container, 
    Group, 
    Burger, 
    Paper, 
    Title, 
    Transition 
    } from '@mantine/core'

const HEADER_HEIGHT = 60

const useStyles = createStyles((theme) => ({

    root: {
        position: 'relative',
        zIndex: 1,
    },

    dropdown: {
        position: 'absolute',
        top: HEADER_HEIGHT,
        left: 0,
        right: 0,
        zIndex: 0,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderTopWidth: 0,
        overflow: 'hidden',

        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        backgroundColor: theme.colors[theme.primaryColor][6],
    },

    links: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    title: {
        color: theme.colors[theme.primaryColor][0],
        [theme.fn.smallerThan('sm')]: {
            fontSize: '18px' 
        },
    },

    burger: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.white,
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colors[theme.primaryColor][5],
        },

        [theme.fn.smallerThan('sm')]: {
            borderRadius: 0,
            padding: theme.spacing.md,
            color: theme.colors[theme.primaryColor][5],
            '&:hover': {
                backgroundColor: theme.colors[theme.primaryColor][2],
                color: theme.colors[theme.primaryColor][7],
            },
        },
        
        '&.active, &.active:hover': {
        backgroundColor: theme.colors[theme.primaryColor][0],
        color: theme.colors[theme.primaryColor][7],
        },
    },

}))

const HeaderResponsive = ({ links, className }) => {

    const [opened, toggleOpened] = useBooleanToggle(false);
    const { classes, cx } = useStyles();

    const items = links.map((link) => (
        <NavLink
            key={link.label}
            to={link.link}
            replace
            className={classes.link}
            onClick={(event) => {
                toggleOpened(false);
            }}
        >
          {link.label}
        </NavLink>
    ))

    return (
        <Header height={HEADER_HEIGHT} className={cx(classes.root, className)}>
          <Container fluid className={classes.header} >
            <Title order={1} style={{margin: 0}} className={classes.title}>
              The ISR Summer School
            </Title>
            <Group spacing={5} className={classes.links}>
              {items}
            </Group>

          <Burger
            opened={opened}
            onClick={() => toggleOpened()}
            className={classes.burger}
            size="sm"
            color="white"
          />

          <Transition transition="pop-top-right" duration={200} mounted={opened}>
            {(styles) => (
              <Paper className={classes.dropdown} withBorder style={styles}>
                {items}
              </Paper>
            )}
          </Transition>
        </Container>
      </Header>
    )
}

export { HeaderResponsive }
