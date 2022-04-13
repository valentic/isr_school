import React from 'react'
import { createRoot } from 'react-dom/client'
import { StoreProvider } from 'easy-peasy'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
import { QueryClientProvider, QueryClient } from 'react-query'

import { store } from 'store'
import { App, AuthProvider } from 'app'

document.title = process.env.REACT_APP_TITLE

const queryClient = new QueryClient()
const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <BrowserRouter basename={process.env.REACT_APP_ROOT_URL}>
        <MantineProvider withNormalizeCSS withGlobalStyles >
          <NotificationsProvider>
            <ModalsProvider>
              <QueryClientProvider client={queryClient}>
                <AuthProvider>
                  <App />
                </AuthProvider>
              </QueryClientProvider>
            </ModalsProvider>
          </NotificationsProvider>
        </MantineProvider>
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>
)

