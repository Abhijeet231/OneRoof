import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '@/App'
import "@fortawesome/fontawesome-free/css/all.min.css"

import { RouterProvider} from 'react-router-dom';
import router from '@/routes/index'
import {AuthProvider} from "@/components/provider/AuthProvider"


createRoot(document.getElementById('root')).render(
  <StrictMode>

    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    
  </StrictMode>,
)
