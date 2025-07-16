import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Authcontext from './Context/Authcontext.jsx'

createRoot(document.getElementById('root')).render(
  <Authcontext>
    <App />
  </Authcontext>,
)
