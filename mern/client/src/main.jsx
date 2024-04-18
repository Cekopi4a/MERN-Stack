import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter} from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import { CartContextProvider } from './context/cartContext.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
     <AuthContextProvider>
        <CartContextProvider>
     <App />
     </CartContextProvider>
     </AuthContextProvider>
    </BrowserRouter>
    
)