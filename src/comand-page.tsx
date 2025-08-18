import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Sidebar from './sidebar/sidebar' 
// import Users from './components/users/UsersPage'

createRoot(document.getElementById('root')!).render(
  <div className="app-container">
    <StrictMode>
      <Sidebar />
      {/* <Users /> */}
    </StrictMode>
  </div>
)