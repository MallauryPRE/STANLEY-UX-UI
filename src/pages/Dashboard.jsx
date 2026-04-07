import { useState, useEffect } from 'react'
import Header from '../components/Header'
import StatCard from '../components/StatCard'
import Card from '../components/Card'
import LineChart from '../components/LineChart'
import BarChart from '../components/BarChart'
import {
    Target,
    Trophy,
    Users,
    Clock,
    Activity,
    Flag,
    Zap,
    TrendingUp
} from 'lucide-react'
import './Dashboard.css'

// Données simulées
const mockData = {
    stats: {
        challengesSolved: 47,
        totalChallenges: 75,
        totalPoints: 12450,
        activeTeams: 16,
        timeRemaining: '04:32:15'
    },
    activityData: {
        labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00'],
        data: [2, 5, 8, 12, 15, 22, 28, 35, 47]
    },
    categoryData: {
        labels: ['Web', 'Crypto', 'Pwn', 'Forensics', 'Reverse', 'Misc'],
        data: [12, 8, 6, 9, 7, 5]
    },
    topPerformers: [
        { rank: 1, name: 'CyberHunters', points: 3250, solves: 14 },
        { rank: 2, name: 'ByteBreakers', points: 2890, solves: 12 },
        { rank: 3, name: 'NullPointers', points: 2540, solves: 11 },
        { rank: 4, name: 'HexMasters', points: 2100, solves: 9 },
        { rank: 5, name: 'CipherSquad', points: 1780, solves: 8 }
    ],
    recentSolves: [
        { team: 'CyberHunters', challenge: 'SQL Injection Pro', category: 'Web', points: 300, time: '2 min' },
        { team: 'ByteBreakers', challenge: 'RSA Basics', category: 'Crypto', points: 150, time: '5 min' },
        { team: 'NullPointers', challenge: 'Buffer Overflow', category: 'Pwn', points: 400, time: '8 min' },
        { team: 'HexMasters', challenge: 'Hidden Data', category: 'Forensics', points: 200, time: '12 min' },
        { team: 'CipherSquad', challenge: 'XSS Challenge', category: 'Web', points: 250, time: '15 min' }
    ]
}

function Dashboard() {
    const [data, setData] = useState(mockData)
    const [currentTime, setCurrentTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const formatTime = (date) => {
        return date.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })
    }

    return (
        <div className="dashboard-page">
            <Header />

            <main className="dashboard-content">
                <div className="dashboard-header">
                    <div>
                        <h1 className="page-title">Dashboard</h1>
                        <p className="page-subtitle">Vue d'ensemble de la compétition</p>
                    </div>
                    <div className="live-indicator">
                        <span className="live-dot"></span>
                        <span className="live-time">{formatTime(currentTime)}</span>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="stats-grid">
                    <StatCard
                        label="Challenges Résolus"
                        value={`${data.stats.challengesSolved}/${data.stats.totalChallenges}`}
                        trend="up"
                        trendValue="+5 cette heure"
                        icon={Target}
                    />
                    <StatCard
                        label="Points Totaux"
                        value={data.stats.totalPoints.toLocaleString()}
                        trend="up"
                        trendValue="+1,250"
                        icon={Trophy}
                    />
                    <StatCard
                        label="Équipes Actives"
                        value={data.stats.activeTeams}
                        icon={Users}
                    />
                    <StatCard
                        label="Temps Restant"
                        value={data.stats.timeRemaining}
                        icon={Clock}
                    />
                </div>

                {/* Charts Row */}
                <div className="charts-row">
                    <Card title="Activité en temps réel" icon={Activity} className="chart-card wide">
                        <div className="chart-container">
                            <LineChart
                                data={data.activityData.data}
                                labels={data.activityData.labels}
                                title="Résolutions"
                            />
                        </div>
                    </Card>

                    <Card title="Top Performers" icon={TrendingUp} className="performers-card">
                        <div className="performers-list">
                            {data.topPerformers.map((team) => (
                                <div key={team.rank} className="performer-item">
                                    <div className="performer-rank">#{team.rank}</div>
                                    <div className="performer-info">
                                        <span className="performer-name">{team.name}</span>
                                        <span className="performer-solves">{team.solves} solves</span>
                                    </div>
                                    <div className="performer-points">{team.points.toLocaleString()}</div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Bottom Row */}
                <div className="charts-row">
                    <Card title="Résolutions par Catégorie" icon={Flag} className="chart-card">
                        <div className="chart-container">
                            <BarChart
                                data={data.categoryData.data}
                                labels={data.categoryData.labels}
                                title="Résolutions"
                            />
                        </div>
                    </Card>

                    <Card title="Résolutions Récentes" icon={Zap} className="recent-card">
                        <div className="recent-list">
                            {data.recentSolves.map((solve, index) => (
                                <div key={index} className="recent-item">
                                    <div className="recent-main">
                                        <span className="recent-team">{solve.team}</span>
                                        <span className="recent-challenge">{solve.challenge}</span>
                                    </div>
                                    <div className="recent-meta">
                                        <span className="recent-category">{solve.category}</span>
                                        <span className="recent-points">+{solve.points}</span>
                                        <span className="recent-time">{solve.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    )
}

export default Dashboard
