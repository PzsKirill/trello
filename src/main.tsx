import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import Sidebar from './sidebar/sidebar' 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Sidebar />
    <App />
  </StrictMode>,
)