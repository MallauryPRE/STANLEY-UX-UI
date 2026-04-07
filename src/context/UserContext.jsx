import { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export function UserProvider({ children }) {
    // Simulated user - in production this would come from authentication
    const [user, setUser] = useState({
        id: 1,
        username: 'Player1',
        team: 'CyberHunters',
        role: 'player', // 'admin' | 'gamemaster' | 'player'
        avatar: null
    })

    const isAdmin = user.role === 'admin'
    const isGameMaster = user.role === 'gamemaster'
    const isPlayer = user.role === 'player'
    const canAccessHardware = isAdmin || isGameMaster

    // For demo purposes - switch between roles
    const switchRole = (role) => {
        setUser(prev => ({ ...prev, role }))
    }

    const value = {
        user,
        setUser,
        isAdmin,
        isGameMaster,
        isPlayer,
        canAccessHardware,
        switchRole
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('useUser must be used within a UserProvider')
    }
    return context
}
