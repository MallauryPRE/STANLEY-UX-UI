import { useNotifications } from '../context/NotificationContext'
import { X, Trash2, Clock, CheckCircle, AlertTriangle, Info, AlertCircle, Archive } from 'lucide-react'
import './NotificationHistory.css'

const iconMap = {
    success: CheckCircle,
    warning: AlertTriangle,
    error: AlertCircle,
    info: Info
}

function NotificationHistory() {
    const {
        archivedNotifications,
        showHistory,
        setShowHistory,
        deleteNotification,
        clearArchive
    } = useNotifications()

    const formatDateTime = (date) => {
        return new Date(date).toLocaleString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    if (!showHistory) return null

    return (
        <div className="notification-history-overlay" onClick={() => setShowHistory(false)}>
            <div className="notification-history-panel" onClick={(e) => e.stopPropagation()}>
                <div className="history-header">
                    <div className="history-title">
                        <Archive size={20} />
                        <span>Historique des Notifications</span>
                    </div>
                    <div className="history-actions">
                        {archivedNotifications.length > 0 && (
                            <button className="clear-all-btn" onClick={clearArchive}>
                                <Trash2 size={14} />
                                Tout supprimer
                            </button>
                        )}
                        <button className="close-history-btn" onClick={() => setShowHistory(false)}>
                            <X size={20} />
                        </button>
                    </div>
                </div>

                <div className="history-content">
                    {archivedNotifications.length === 0 ? (
                        <div className="history-empty">
                            <Clock size={48} />
                            <p>Aucune notification archivée</p>
                        </div>
                    ) : (
                        <div className="history-list">
                            {archivedNotifications.map((notification) => {
                                const Icon = iconMap[notification.type] || Info

                                return (
                                    <div
                                        key={notification.id}
                                        className={`history-item ${notification.type || 'info'}`}
                                    >
                                        <div className="history-item-icon">
                                            <Icon size={18} />
                                        </div>

                                        <div className="history-item-content">
                                            <div className="history-item-header">
                                                <span className="history-item-title">{notification.title}</span>
                                                <span className="history-item-time">
                                                    <Clock size={12} />
                                                    {formatDateTime(notification.timestamp)}
                                                </span>
                                            </div>
                                            <p className="history-item-message">{notification.message}</p>
                                        </div>

                                        <button
                                            className="history-item-delete"
                                            onClick={() => deleteNotification(notification.id, true)}
                                            title="Supprimer définitivement"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default NotificationHistory
