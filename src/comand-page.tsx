import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Sidebar from './sidebar/sidebar' 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Sidebar />
  </StrictMode>,
)