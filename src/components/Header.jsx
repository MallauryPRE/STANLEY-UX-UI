import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
    Shield,
    User,
    LogOut,
    Server,
    Bell,
    Maximize,
    Minimize,
    History,
    TrendingUp,
    Flag,
    FileText,
    LayoutDashboard,
    Trophy
} from 'lucide-react'
import { useNotifications } from '../context/NotificationContext'
import { useFullscreen } from '../context/FullscreenContext'
import { useUser } from '../context/UserContext'
import './Header.css'

function Header() {
    const { user, canAccessHardware, switchRole } = useUser()
    const { unreadCount, setShowHistory } = useNotifications()
    const { isFullscreen, toggleFullscreen } = useFullscreen()
    const navigate = useNavigate()

    const handleLogout = () => {
        // In a real app, clear auth tokens here
        // localStorage.removeItem('token')
        navigate('/login')
    }

    // Assuming user.role is the current role and switchRole is the function to change it
    const userRole = user.role;
    const changeRole = switchRole;

    return (
        <header className={`header ${isFullscreen ? 'fullscreen-mode' : ''}`}>
            <div className="header-content">
                <div className="header-logo">
                    <Shield size={28} />
                    <span className="logo-stanley">STANLEY</span>
                </div>

                <nav className="header-nav">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    >
                        <LayoutDashboard size={14} />
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/briefing"
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    >
                        <FileText size={14} />
                        Briefing
                    </NavLink>
                    <NavLink
                        to="/challenges"
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    >
                        <Flag size={14} />
                        Challenges
                    </NavLink>
                    <NavLink
                        to="/progress"
                        className={({ isActive }) => `nav-link progress-link ${isActive ? 'active' : ''}`}
                    >
                        <TrendingUp size={14} />
                        Ma Progression
                    </NavLink>
                    <NavLink
                        to="/scoreboard"
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    >
                        <Trophy size={14} />
                        Scoreboard
                    </NavLink>

                    {canAccessHardware && (
                        <NavLink
                            to="/hardware"
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        >
                            <Server size={14} />
                            Hardware
                        </NavLink>
                    )}
                </nav>

                <div className="header-actions">
                    <button
                        className="action-btn fullscreen-btn"
                        onClick={toggleFullscreen}
                        title={isFullscreen ? 'Quitter le plein écran' : 'Mode plein écran'}
                    >
                        {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                    </button>

                    <button
                        className="action-btn history-btn"
                        onClick={() => setShowHistory(true)}
                        title="Historique des notifications"
                    >
                        <History size={18} />
                    </button>

                    <button
                        className="action-btn notification-btn"
                        onClick={() => setShowHistory(true)}
                        title="Notifications"
                    >
                        <Bell size={18} />
                        {unreadCount > 0 && (
                            <span className="notification-badge">{unreadCount}</span>
                        )}
                    </button>

                    <div className="header-divider"></div>

                    <div className="header-user">
                        <div className="user-info">
                            <div className="user-avatar">
                                <User size={18} />
                            </div>
                            <span className="user-name">{user.username}</span>
                            <select
                                className="role-select"
                                value={userRole}
                                onChange={(e) => changeRole(e.target.value)}
                                title="Changer de rôle (Demo)"
                            >
                                <option value="player">Player</option>
                                <option value="gamemaster">GM</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <button className="logout-btn" onClick={handleLogout} title="Déconnexion">
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
