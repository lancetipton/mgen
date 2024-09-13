import './index.css'
import App from './App'
import * as React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MGenProvider } from '@MG/contexts/MGenContext'
import { SiteStyles, GlobalStyles } from '@MG/components/Styles'

window.React = React
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MGenProvider>
      <GlobalStyles />
      <SiteStyles />
      <App />
    </MGenProvider>
  </StrictMode>
)
