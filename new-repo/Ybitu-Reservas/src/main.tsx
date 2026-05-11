import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Import just what we need from bootstrap
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/tab';

import Quartos from './pages/Quartos.tsx'

import './styles/style.scss'
// import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Quartos />
  </StrictMode>,
)
