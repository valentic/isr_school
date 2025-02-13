import React from 'react'
import { useDisclosure } from '@mantine/hooks'
import { NavLink } from 'react-router-dom'
import classes from './header.module.css'
import { IconChevronDown } from '@tabler/icons-react'

import { 
    Box,
    Burger, 
    Center,
    Collapse,
    Container,
    Group, 
    Menu,
    Text,
    } from '@mantine/core'

const Header = ({ links }) => {

    const [navOpened, { toggle: navToggle }] = useDisclosure(false)

    const items = links.map((link) => {

        const menuItems = link.links?.map((item) => (
            <Menu.Item key={item.link}>
              <NavLink to={item.link} replace className={classes.menuLink}>
                {item.label}
              </NavLink>
            </Menu.Item>
        ))

        if (menuItems) {
            return (
              <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
                <Menu.Target>
                  <a
                    href={link.link}
                    className={classes.link}
                    onClick={(event) => event.preventDefault()}
                  >
                    <Center>
                      <span className={classes.linkLabel}>{link.label}</span>
                      <IconChevronDown size="0.9rem" stroke={1.5} />
                    </Center>
                  </a>
                </Menu.Target>
                <Menu.Dropdown>{menuItems}</Menu.Dropdown>
              </Menu>
            )
        }

        return (
          <NavLink
            key={link.label}
            to={link.link}
            replace
            className={classes.link}
          >
            {link.label}
          </NavLink>
        )
    })

    return (
      <Box>
        <header className={classes.header}>
          <Container size="sm">
            <div className={classes.inner}>
              <Text size="lg" fw={700}>{import.meta.env.VITE_TITLE}</Text>
              <Group gap={5} visibleFrom="sm">
                {items}</Group>
              <Burger 
                opened={navOpened} 
                onClick={navToggle}
                size="sm" 
                hiddenFrom="sm" 
              />
            </div>
          </Container>
        </header>
        <Collapse in={navOpened}>{items}</Collapse>
      </Box>
    )
}

export { Header }
