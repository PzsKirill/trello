import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Sidebar from './sidebar/sidebar' 
import TableUser from './pages/Employees'
import GlobalBackground from "./background/GlobalBackground";

createRoot(document.getElementById('root')!).render(
  <div className="app-container">
    <StrictMode>
      <Sidebar />
      <TableUser />
      <GlobalBackground />
    </StrictMode>
  </div>
)