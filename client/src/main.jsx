import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppCondextProvider } from './context/AppContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppCondextProvider>
      <App />
    </AppCondextProvider>
  </BrowserRouter>,
)
