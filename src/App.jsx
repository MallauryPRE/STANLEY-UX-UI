import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { useNotifications } from './context/NotificationContext'
import { useFullscreen } from './context/FullscreenContext'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Scoreboard from './pages/Scoreboard'
import Hardware from './pages/Hardware'
import Progress from './pages/Progress'
import Challenges from './pages/Challenges'
import Briefing from './pages/Briefing'
import NotificationPopup from './components/NotificationPopup'
import NotificationHistory from './components/NotificationHistory'
import Splash from './components/Splash'
import './App.css'

function App() {
    const { addNotification } = useNotifications()
    const { isFullscreen } = useFullscreen()
    const location = useLocation()
    const [showSplash, setShowSplash] = useState(true)
    const [hasSeenSplash, setHasSeenSplash] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const notificationsTriggered = useRef(false)

    // Track login state based on location
    useEffect(() => {
        if (location.pathname !== '/login') {
            setIsLoggedIn(true)
        }
    }, [location.pathname])

    // Show splash only on initial load at login
    useEffect(() => {
        if (hasSeenSplash || location.pathname !== '/login') {
            setShowSplash(false)
        }
    }, [location.pathname, hasSeenSplash])

    const handleSplashComplete = () => {
        setShowSplash(false)
        setHasSeenSplash(true)
    }

    // Demo: Add notifications only when logged in and only once
    useEffect(() => {
        if (!isLoggedIn || notificationsTriggered.current) return
        notificationsTriggered.current = true

        // Welcome notification after login
        const timer1 = setTimeout(() => {
            addNotification({
                type: 'info',
                title: 'Bienvenue',
                message: 'Bienvenue sur STANLEY !',
                duration: 6000
            })
        }, 1000)

        // Simulated CTF events
        const timer2 = setTimeout(() => {
            addNotification({
                type: 'success',
                title: 'Challenge Résolu',
                message: 'CyberHunters a résolu "SQL Injection Pro" (+300 pts)',
                duration: 8000
            })
        }, 5000)

        return () => {
            clearTimeout(timer1)
            clearTimeout(timer2)
        }
    }, [isLoggedIn, addNotification])

    // Check if we're on the login page
    const isLoginPage = location.pathname === '/login'

    return (
        <div className={`app ${isFullscreen ? 'fullscreen-mode' : ''}`}>
            {showSplash && isLoginPage && (
                <Splash onComplete={handleSplashComplete} />
            )}

            {/* Background decoration - shown on all pages except login */}
            {!isLoginPage && (
                <div className="app-decoration">
                    <div className="app-grid"></div>
                </div>
            )}

            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/briefing" element={<Briefing />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/challenges" element={<Challenges />} />
                <Route path="/scoreboard" element={<Scoreboard />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/hardware" element={<Hardware />} />
                <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>

            {/* Only show notifications when logged in */}
            {isLoggedIn && (
                <>
                    <NotificationPopup />
                    <NotificationHistory />
                </>
            )}
        </div>
    )
}

export default App
