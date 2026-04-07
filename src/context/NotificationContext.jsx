import { createContext, useContext, useState, useCallback } from 'react'

const NotificationContext = createContext()

export function useNotifications() {
    const context = useContext(NotificationContext)
    if (!context) {
        throw new Error('useNotifications must be used within NotificationProvider')
    }
    return context
}

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([])
    const [archivedNotifications, setArchivedNotifications] = useState([])
    const [showHistory, setShowHistory] = useState(false)

    // Add a new notification
    const addNotification = useCallback((notification) => {
        const newNotification = {
            id: Date.now() + Math.random(),
            timestamp: new Date(),
            read: false,
            ...notification
        }
        setNotifications(prev => [newNotification, ...prev])

        // Auto-dismiss after duration (default 5s) unless persistent
        if (!notification.persistent) {
            setTimeout(() => {
                dismissNotification(newNotification.id)
            }, notification.duration || 5000)
        }

        return newNotification.id
    }, [])

    // Dismiss (archive) a notification
    const dismissNotification = useCallback((id) => {
        setNotifications(prev => {
            const notification = prev.find(n => n.id === id)
            if (notification) {
                setArchivedNotifications(archived => [
                    { ...notification, archivedAt: new Date(), read: true },
                    ...archived
                ])
            }
            return prev.filter(n => n.id !== id)
        })
    }, [])

    // Delete a notification permanently
    const deleteNotification = useCallback((id, fromArchive = false) => {
        if (fromArchive) {
            setArchivedNotifications(prev => prev.filter(n => n.id !== id))
        } else {
            setNotifications(prev => prev.filter(n => n.id !== id))
        }
    }, [])

    // Mark notification as read
    const markAsRead = useCallback((id) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        )
    }, [])

    // Clear all archived notifications
    const clearArchive = useCallback(() => {
        setArchivedNotifications([])
    }, [])

    // Get unread count
    const unreadCount = notifications.filter(n => !n.read).length

    const value = {
        notifications,
        archivedNotifications,
        showHistory,
        setShowHistory,
        addNotification,
        dismissNotification,
        deleteNotification,
        markAsRead,
        clearArchive,
        unreadCount
    }

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    )
}
