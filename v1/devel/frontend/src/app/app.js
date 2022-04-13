import React from 'react'

import './app.css'

import { Header } from './header'
import { Footer } from './footer'

const App = props => {
    
    return (
        <>
          <Header />
          <article>
            { props.children }
          </article>
          <Footer />
        </>
    )
}

export { App }
                
