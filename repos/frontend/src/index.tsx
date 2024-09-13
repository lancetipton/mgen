import './index.css'
import App from './App'
import * as React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MGenProvider } from '@MG/contexts/MGenContext'
import { GlobalStyles } from '@MG/components/GlobalStyles'

window.React = React
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MGenProvider>
      <GlobalStyles />
      <App />
    </MGenProvider>
  </StrictMode>
)
