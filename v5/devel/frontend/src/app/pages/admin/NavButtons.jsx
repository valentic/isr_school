import React from 'react'
import { Link } from 'react-router-dom'
import { 
    IconArrowBigLeft, 
    IconArrowBigRight, 
    IconArrowBigUpLines 
    } from '@tabler/icons-react'

import {
    Button,
    Group
} from '@mantine/core'

const NavButton = ({ linkId, curId, children, ...props}) => {

    const url = `../${linkId}`
    const disabled = linkId === curId

    if (disabled) {
        return (
            <Button {...props} disabled > 
                {children} 
            </Button>
        )
    }

    return (
        <Button component={Link} {...props} to={url}>
            { children }
        </Button>
    )
}

const LeftButton = (props) => (
    <NavButton {...props} leftSection={<IconArrowBigLeft />} />
)

const RightButton = (props) => (
    <NavButton {...props} rightSection={<IconArrowBigRight />} />
)

const UpButton = (props) => (
    <Button {...props} component={Link} to=".." leftSection={<IconArrowBigUpLines />} />
)

const NavButtons = ({prev, next, cur, label}) => (
    <Group mt="2em" mb="1em" justify="center">
      <LeftButton linkId={prev} curId={cur}> Prev </LeftButton>
      <UpButton> Back to {label} </UpButton>
      <RightButton linkId={next} curId={cur}> Next </RightButton>
    </Group>
)

export { NavButtons }

