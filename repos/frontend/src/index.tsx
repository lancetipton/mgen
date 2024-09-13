import './global.styles.css'

import App from './App'
import * as React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MGenProvider } from '@MG/contexts/MGenContext'

window.React = React
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MGenProvider>
      <App />
    </MGenProvider>
  </StrictMode>
)
