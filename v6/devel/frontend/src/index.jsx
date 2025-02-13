import { createRoot } from 'react-dom/client'
import { Program } from '~/program'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import './index.css'

document.title = import.meta.env.VITE_TITLE

createRoot(document.getElementById('root')).render(<Program />)
