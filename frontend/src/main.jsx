import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './authContext.jsx';
import ProjectRoutes from './Routes.jsx';
import {BrowserRouter as Router} from 'react-router-dom';
import Signup from './components/auth/Signup.jsx';

createRoot(document.getElementById('root')).render(
    <AuthProvider>
    <Router>
    <ProjectRoutes/>
    </Router>
    </AuthProvider>
   
  
);
