import React from 'react'
import { render } from 'react-dom'
import { StoreProvider } from 'easy-peasy'
import { BrowserRouter } from 'react-router-dom'

import 'semantic-ui-css/semantic.css'
import 'index.css'
import 'support/assets/random_grey_variations.png'

import { store } from 'store'
import { App } from 'app'
import { Routes } from 'routes'

document.title = process.env.REACT_APP_TITLE

const showApp = () => {
    render(
        <StoreProvider store={store}>
          <BrowserRouter basename={process.env.REACT_APP_ROOT_URL}>
            <App>
              <Routes />
            </App>
          </BrowserRouter>
        </StoreProvider>,
        document.getElementById('root')
    )
}

store.dispatch.auth.bootstrap().then(showApp)

