import './global.styles.css'

import App from './App'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MGenProvider } from '@MG/contexts/MGenContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MGenProvider>
      <App />
    </MGenProvider>
  </StrictMode>
)
