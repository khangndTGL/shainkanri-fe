import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import 'mantine-react-table/styles.css'
import '@mantine/notifications/styles.css'
import './index.css'
import { Notifications } from '@mantine/notifications'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <MantineProvider
        theme={{
          fontFamily: 'Nanum Gothic, sans-serif'
        }}
      >
        <Notifications limit={1} position='top-center' />
        <App />
      </MantineProvider>
    </BrowserRouter>
  </QueryClientProvider>
)
