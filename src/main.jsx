import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {  createBrowserRouter ,createRoutesFromElements} from 'react-router'
import { Home } from './components/Home.jsx'
import {  Route, RouterProvider } from 'react-router-dom'
import { Browse } from './components/Browse.jsx'


 
const router=createBrowserRouter( 
    createRoutesFromElements([
        <Route path="/" element={<App />}>
          <Route path='/' element={<Home />} />
          <Route path="browse" element={<Browse />} />
        </Route>
       
    ]),
  )
  

createRoot(document.getElementById('root')).render(
  <StrictMode>
  
    <RouterProvider router={router}/>
      
    
  </StrictMode>,
)
