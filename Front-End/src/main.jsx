import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Only one router
import App from './App.jsx';
import Authcontext from './Context/Authcontext.jsx';
import './index.css'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Authcontext>
      <App />
    </Authcontext>
  </BrowserRouter>
);