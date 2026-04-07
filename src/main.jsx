import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { NotificationProvider } from './context/NotificationContext'
import { FullscreenProvider } from './context/FullscreenContext'
import { UserProvider } from './context/UserContext'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <UserProvider>
                <FullscreenProvider>
                    <NotificationProvider>
                        <App />
                    </NotificationProvider>
                </FullscreenProvider>
            </UserProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
