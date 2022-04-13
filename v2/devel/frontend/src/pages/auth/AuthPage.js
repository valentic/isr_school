import React from 'react'
import { Grid } from 'semantic-ui-react'

const AuthPage = props => {

    const style={ flex: 1 }

    return (
      <Grid textAlign='center' padded style={style} verticalAlign='middle'>  
        <Grid.Column computer="6" mobile="14">
          { props.children } 
        </Grid.Column>
      </Grid>
    )
}

export { AuthPage }

