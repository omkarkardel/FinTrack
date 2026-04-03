import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <App />
      <Toaster
        position="top-right"
        richColors
        toastOptions={{
          className: 'border border-white/10 bg-slate-950/90 text-slate-100 backdrop-blur-xl',
        }}
      />
    </>
  </StrictMode>,
)
