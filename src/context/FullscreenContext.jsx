import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const FullscreenContext = createContext()

export function useFullscreen() {
    const context = useContext(FullscreenContext)
    if (!context) {
        throw new Error('useFullscreen must be used within FullscreenProvider')
    }
    return context
}

export function FullscreenProvider({ children }) {
    const [isFullscreen, setIsFullscreen] = useState(false)

    const toggleFullscreen = useCallback(async () => {
        try {
            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen()
                setIsFullscreen(true)
            } else {
                await document.exitFullscreen()
                setIsFullscreen(false)
            }
        } catch (err) {
            console.error('Fullscreen error:', err)
        }
    }, [])

    const exitFullscreen = useCallback(async () => {
        try {
            if (document.fullscreenElement) {
                await document.exitFullscreen()
                setIsFullscreen(false)
            }
        } catch (err) {
            console.error('Exit fullscreen error:', err)
        }
    }, [])

    // Listen for fullscreen changes (e.g., pressing Escape)
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement)
        }

        document.addEventListener('fullscreenchange', handleFullscreenChange)
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }, [])

    const value = {
        isFullscreen,
        toggleFullscreen,
        exitFullscreen
    }

    return (
        <FullscreenContext.Provider value={value}>
            {children}
        </FullscreenContext.Provider>
    )
}
