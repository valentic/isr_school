import React from 'react'
import { Navbar } from './navbar'
import { Responsive, Grid } from 'semantic-ui-react'

const Header = () => {

    return (
        <header>
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <Grid verticalAlign='middle'> 
              <Grid.Column textAlign='left' width={10}>
                <h1>
                <Responsive as={'span'} minWidth={Responsive.onlyTablet.minWidth}>The ISR Summer School</Responsive>
                </h1>
              </Grid.Column>
              <Grid.Column textAlign='right' width={6}>
                <Navbar />
              </Grid.Column>
            </Grid>
          </Responsive>
          <Responsive maxWidth={Responsive.onlyTablet.minWidth}>
            <Navbar />
          </Responsive>
        </header>
    )

}

export { Header }
