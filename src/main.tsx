import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import theme from './theme/theme.ts'

const AppRootContainer = () => {
  return (
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRootContainer />
  </React.StrictMode>,
)
