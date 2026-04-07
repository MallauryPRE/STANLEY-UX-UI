import { useNotifications } from '../context/NotificationContext'
import { X, Archive, Trash2, Bell, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react'
import './NotificationPopup.css'

const iconMap = {
    success: CheckCircle,
    warning: AlertTriangle,
    error: AlertCircle,
    info: Info
}

function NotificationPopup() {
    const { notifications, dismissNotification, deleteNotification, markAsRead } = useNotifications()

    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    if (notifications.length === 0) return null

    return (
        <div className="notification-popup-container">
            {notifications.map((notification, index) => {
                const Icon = iconMap[notification.type] || Bell

                return (
                    <div
                        key={notification.id}
                        className={`notification-popup ${notification.type || 'info'} ${notification.read ? 'read' : ''}`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                        onClick={() => markAsRead(notification.id)}
                    >
                        <div className="notification-icon">
                            <Icon size={20} />
                        </div>

                        <div className="notification-content">
                            <div className="notification-header">
                                <span className="notification-title">{notification.title}</span>
                                <span className="notification-time">{formatTime(notification.timestamp)}</span>
                            </div>
                            <p className="notification-message">{notification.message}</p>
                        </div>

                        <div className="notification-actions">
                            <button
                                className="notification-action archive"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    dismissNotification(notification.id)
                                }}
                                title="Archiver"
                            >
                                <Archive size={14} />
                            </button>
                            <button
                                className="notification-action delete"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    deleteNotification(notification.id)
                                }}
                                title="Supprimer"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>

                        <button
                            className="notification-close"
                            onClick={(e) => {
                                e.stopPropagation()
                                dismissNotification(notification.id)
                            }}
                        >
                            <X size={16} />
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export default NotificationPopup
