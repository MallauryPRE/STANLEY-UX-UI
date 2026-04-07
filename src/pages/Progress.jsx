import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Card from '../components/Card'
import BarChart from '../components/BarChart'
import {
    Target,
    Clock,
    TrendingUp,
    CheckCircle,
    Circle,
    Flag,
    Zap,
    Trophy,
    Lock,
    Unlock
} from 'lucide-react'
import './Progress.css'

// Données simulées utilisateur
const mockUserProgress = {
    username: 'Player1',
    team: 'CyberHunters',
    rank: 1,
    totalPoints: 1850,
    solvedChallenges: 8,
    totalChallenges: 25,

    // Par catégorie
    categories: [
        { name: 'Web', solved: 3, total: 6, points: 450, color: '#60a5fa' },
        { name: 'Crypto', solved: 2, total: 5, points: 300, color: '#a78bfa' },
        { name: 'Pwn', solved: 1, total: 4, points: 400, color: '#f87171' },
        { name: 'Forensics', solved: 1, total: 4, points: 200, color: '#4ade80' },
        { name: 'Reverse', solved: 1, total: 3, points: 350, color: '#fbbf24' },
        { name: 'Misc', solved: 0, total: 3, points: 0, color: '#8b8b8d' }
    ],

    // Résolutions récentes
    recentSolves: [
        { challenge: 'SQL Injection Pro', category: 'Web', points: 300, time: '10:45', difficulty: 'Hard' },
        { challenge: 'RSA Basics', category: 'Crypto', points: 150, time: '09:30', difficulty: 'Easy' },
        { challenge: 'Buffer Overflow', category: 'Pwn', points: 400, time: '08:15', difficulty: 'Hard' },
        { challenge: 'XSS Challenge', category: 'Web', points: 100, time: '07:45', difficulty: 'Easy' },
        { challenge: 'Base64 Decode', category: 'Crypto', points: 50, time: '07:20', difficulty: 'Easy' }
    ],

    // Objectifs restants (challenges non résolus)
    remainingChallenges: [
        { id: 1, name: 'Advanced SQLi', category: 'Web', points: 400, difficulty: 'Hard', attempts: 2 },
        { id: 2, name: 'Heap Exploitation', category: 'Pwn', points: 500, difficulty: 'Hard', attempts: 0 },
        { id: 3, name: 'AES Decryption', category: 'Crypto', points: 250, difficulty: 'Medium', attempts: 1 },
        { id: 4, name: 'Memory Dump', category: 'Forensics', points: 300, difficulty: 'Medium', attempts: 0 },
        { id: 5, name: 'Cookie Hijack', category: 'Web', points: 200, difficulty: 'Medium', attempts: 3 },
        { id: 6, name: 'Packet Analysis', category: 'Forensics', points: 150, difficulty: 'Easy', attempts: 0 },
        { id: 7, name: 'ROT13 Variant', category: 'Crypto', points: 100, difficulty: 'Easy', attempts: 0 },
        { id: 8, name: 'Binary Patch', category: 'Reverse', points: 350, difficulty: 'Medium', attempts: 1 }
    ]
}

function Progress() {
    const [user] = useState(mockUserProgress)
    const [filter, setFilter] = useState('all')
    const [currentTime, setCurrentTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    const progressPercent = Math.round((user.solvedChallenges / user.totalChallenges) * 100)

    const getDifficultyClass = (difficulty) => {
        switch (difficulty.toLowerCase()) {
            case 'easy': return 'easy'
            case 'medium': return 'medium'
            case 'hard': return 'hard'
            default: return ''
        }
    }

    const filteredChallenges = filter === 'all'
        ? user.remainingChallenges
        : user.remainingChallenges.filter(c => c.category.toLowerCase() === filter)

    const categoryLabels = user.categories.map(c => c.name)
    const categoryData = user.categories.map(c => c.solved)

    return (
        <div className="progress-page">
            <Header />

            <main className="progress-content">
                {/* Quick Stats Bar */}
                <div className="quick-stats-bar">
                    <div className="quick-stat">
                        <Trophy size={20} />
                        <div className="quick-stat-content">
                            <span className="quick-stat-value">#{user.rank}</span>
                            <span className="quick-stat-label">Classement</span>
                        </div>
                    </div>
                    <div className="quick-stat">
                        <Target size={20} />
                        <div className="quick-stat-content">
                            <span className="quick-stat-value">{user.solvedChallenges}/{user.totalChallenges}</span>
                            <span className="quick-stat-label">Challenges</span>
                        </div>
                    </div>
                    <div className="quick-stat">
                        <Zap size={20} />
                        <div className="quick-stat-content">
                            <span className="quick-stat-value">{user.totalPoints.toLocaleString()}</span>
                            <span className="quick-stat-label">Points</span>
                        </div>
                    </div>
                    <div className="quick-stat">
                        <Clock size={20} />
                        <div className="quick-stat-content">
                            <span className="quick-stat-value">04:32:15</span>
                            <span className="quick-stat-label">Restant</span>
                        </div>
                    </div>
                </div>

                {/* Main Progress Section */}
                <div className="progress-grid">
                    {/* Left Column - Categories & Recent */}
                    <div className="progress-left">
                        {/* Overall Progress */}
                        <Card title="Progression Globale" icon={TrendingUp} className="overall-card">
                            <div className="overall-progress">
                                <div className="progress-circle-container">
                                    <div className="progress-circle">
                                        <svg viewBox="0 0 100 100">
                                            <circle cx="50" cy="50" r="45" className="progress-bg" />
                                            <circle
                                                cx="50" cy="50" r="45"
                                                className="progress-fill-circle"
                                                strokeDasharray={`${progressPercent * 2.83} 283`}
                                            />
                                        </svg>
                                        <div className="progress-circle-value">{progressPercent}%</div>
                                    </div>
                                </div>
                                <div className="progress-details">
                                    <div className="progress-detail-item">
                                        <CheckCircle size={16} className="solved-icon" />
                                        <span>{user.solvedChallenges} résolus</span>
                                    </div>
                                    <div className="progress-detail-item">
                                        <Circle size={16} className="remaining-icon" />
                                        <span>{user.totalChallenges - user.solvedChallenges} restants</span>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Categories */}
                        <Card title="Progression par Catégorie" icon={Flag} className="categories-card">
                            <div className="categories-list">
                                {user.categories.map((cat) => (
                                    <div key={cat.name} className="category-item">
                                        <div className="category-header">
                                            <span className="category-name" style={{ color: cat.color }}>{cat.name}</span>
                                            <span className="category-score">{cat.solved}/{cat.total}</span>
                                        </div>
                                        <div className="category-bar">
                                            <div
                                                className="category-fill"
                                                style={{
                                                    width: `${(cat.solved / cat.total) * 100}%`,
                                                    backgroundColor: cat.color
                                                }}
                                            />
                                        </div>
                                        <div className="category-points">{cat.points} pts</div>
                                    </div>
                                ))}
                            </div>

                            <div className="category-chart">
                                <BarChart
                                    data={categoryData}
                                    labels={categoryLabels}
                                    title="Résolutions"
                                />
                            </div>
                        </Card>
                    </div>

                    {/* Right Column - Recent & Objectives */}
                    <div className="progress-right">
                        {/* Recent Solves */}
                        <Card title="Résolutions Récentes" icon={Zap} className="recent-solves-card">
                            <div className="recent-solves-list">
                                {user.recentSolves.map((solve, index) => (
                                    <div key={index} className="recent-solve-item">
                                        <div className="solve-icon">
                                            <CheckCircle size={18} />
                                        </div>
                                        <div className="solve-content">
                                            <span className="solve-name">{solve.challenge}</span>
                                            <div className="solve-meta">
                                                <span className="solve-category">{solve.category}</span>
                                                <span className={`solve-difficulty ${getDifficultyClass(solve.difficulty)}`}>
                                                    {solve.difficulty}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="solve-right">
                                            <span className="solve-points">+{solve.points}</span>
                                            <span className="solve-time">{solve.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Remaining Objectives */}
                        <Card title="Objectifs Restants" icon={Target} className="objectives-card">
                            <div className="objectives-filter">
                                <button
                                    className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                                    onClick={() => setFilter('all')}
                                >
                                    Tous
                                </button>
                                {['Web', 'Crypto', 'Pwn', 'Forensics', 'Reverse'].map(cat => (
                                    <button
                                        key={cat}
                                        className={`filter-btn ${filter === cat.toLowerCase() ? 'active' : ''}`}
                                        onClick={() => setFilter(cat.toLowerCase())}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            <div className="objectives-list">
                                {filteredChallenges.map((challenge) => (
                                    <div key={challenge.id} className="objective-item">
                                        <div className="objective-lock">
                                            {challenge.attempts > 0 ? <Unlock size={16} /> : <Lock size={16} />}
                                        </div>
                                        <div className="objective-content">
                                            <span className="objective-name">{challenge.name}</span>
                                            <div className="objective-meta">
                                                <span className="objective-category">{challenge.category}</span>
                                                <span className={`objective-difficulty ${getDifficultyClass(challenge.difficulty)}`}>
                                                    {challenge.difficulty}
                                                </span>
                                                {challenge.attempts > 0 && (
                                                    <span className="objective-attempts">{challenge.attempts} essais</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="objective-points">
                                            <span>{challenge.points}</span>
                                            <span className="pts-label">pts</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Progress
