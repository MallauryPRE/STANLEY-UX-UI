import { useState } from 'react'
import Header from '../components/Header'
import Card from '../components/Card'
import LineChart from '../components/LineChart'
import { Trophy, Medal, Award, Clock, Target, TrendingUp } from 'lucide-react'
import './Scoreboard.css'

// Données simulées
const mockTeams = [
    {
        rank: 1,
        name: 'CyberHunters',
        points: 3250,
        solves: 14,
        lastSolve: '2 min',
        color: '#ffffff'
    },
    {
        rank: 2,
        name: 'ByteBreakers',
        points: 2890,
        solves: 12,
        lastSolve: '5 min',
        color: '#e0e0e0'
    },
    {
        rank: 3,
        name: 'NullPointers',
        points: 2540,
        solves: 11,
        lastSolve: '8 min',
        color: '#c0c0c0'
    },
    {
        rank: 4,
        name: 'HexMasters',
        points: 2100,
        solves: 9,
        lastSolve: '12 min',
        color: '#a0a0a0'
    },
    {
        rank: 5,
        name: 'CipherSquad',
        points: 1780,
        solves: 8,
        lastSolve: '15 min',
        color: '#909090'
    },
    {
        rank: 6,
        name: 'DataMiners',
        points: 1650,
        solves: 7,
        lastSolve: '20 min',
        color: '#808080'
    },
    {
        rank: 7,
        name: 'SecurityFirst',
        points: 1420,
        solves: 6,
        lastSolve: '25 min',
        color: '#707070'
    },
    {
        rank: 8,
        name: 'BinaryBusters',
        points: 1280,
        solves: 6,
        lastSolve: '30 min',
        color: '#606060'
    },
    {
        rank: 9,
        name: 'PacketStorm',
        points: 1100,
        solves: 5,
        lastSolve: '35 min',
        color: '#505050'
    },
    {
        rank: 10,
        name: 'ZeroDay',
        points: 950,
        solves: 4,
        lastSolve: '40 min',
        color: '#404040'
    }
]

const mockScoreHistory = {
    labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00'],
    datasets: [
        { label: 'CyberHunters', data: [0, 450, 900, 1400, 1800, 2200, 2600, 2900, 3250], color: '#ffffff' },
        { label: 'ByteBreakers', data: [0, 300, 650, 1100, 1500, 1900, 2300, 2600, 2890], color: '#c0c0c0' },
        { label: 'NullPointers', data: [0, 200, 500, 900, 1300, 1700, 2000, 2300, 2540], color: '#909090' },
        { label: 'HexMasters', data: [0, 150, 400, 700, 1000, 1400, 1700, 1900, 2100], color: '#606060' },
        { label: 'CipherSquad', data: [0, 100, 350, 600, 900, 1200, 1450, 1620, 1780], color: '#404040' },
    ]
}

function Scoreboard() {
    const [teams] = useState(mockTeams)

    const getRankIcon = (rank) => {
        switch (rank) {
            case 1: return <Trophy size={20} />
            case 2: return <Medal size={20} />
            case 3: return <Award size={20} />
            default: return <span className="rank-number">{rank}</span>
        }
    }

    const maxPoints = Math.max(...teams.map(t => t.points))

    return (
        <div className="scoreboard-page">
            <Header />

            <main className="scoreboard-content">
                <div className="scoreboard-header">
                    <div>
                        <h1 className="page-title">Scoreboard</h1>
                        <p className="page-subtitle">Classement des équipes en temps réel</p>
                    </div>
                    <div className="stats-summary">
                        <div className="summary-item">
                            <Target size={18} />
                            <span>{teams.reduce((acc, t) => acc + t.solves, 0)} solves</span>
                        </div>
                        <div className="summary-item">
                            <Clock size={18} />
                            <span>04:32:15 restant</span>
                        </div>
                    </div>
                </div>

                {/* Top 3 Podium */}
                <div className="podium">
                    <div className="podium-item second">
                        <div className="podium-avatar">
                            <Medal size={24} />
                        </div>
                        <span className="podium-name">{teams[1]?.name}</span>
                        <span className="podium-points">{teams[1]?.points.toLocaleString()}</span>
                        <div className="podium-bar"></div>
                    </div>
                    <div className="podium-item first">
                        <div className="podium-avatar">
                            <Trophy size={28} />
                        </div>
                        <span className="podium-name">{teams[0]?.name}</span>
                        <span className="podium-points">{teams[0]?.points.toLocaleString()}</span>
                        <div className="podium-bar"></div>
                    </div>
                    <div className="podium-item third">
                        <div className="podium-avatar">
                            <Award size={22} />
                        </div>
                        <span className="podium-name">{teams[2]?.name}</span>
                        <span className="podium-points">{teams[2]?.points.toLocaleString()}</span>
                        <div className="podium-bar"></div>
                    </div>
                </div>

                {/* Score Evolution Chart */}
                <Card title="Évolution des Scores" icon={TrendingUp} className="chart-card">
                    <div className="chart-container-large">
                        <LineChart
                            data={mockScoreHistory.datasets}
                            labels={mockScoreHistory.labels}
                            showLegend={true}
                        />
                    </div>
                </Card>

                {/* Full Ranking Table */}
                <Card title="Classement Complet" className="ranking-card">
                    <div className="ranking-table">
                        <div className="table-header">
                            <span className="col-rank">Rang</span>
                            <span className="col-team">Équipe</span>
                            <span className="col-solves">Solves</span>
                            <span className="col-points">Points</span>
                            <span className="col-progress">Progression</span>
                            <span className="col-last">Dernier Solve</span>
                        </div>

                        {teams.map((team) => (
                            <div key={team.rank} className={`table-row rank-${team.rank}`}>
                                <span className="col-rank">
                                    <div className={`rank-badge rank-${team.rank}`}>
                                        {getRankIcon(team.rank)}
                                    </div>
                                </span>
                                <span className="col-team">
                                    <span className="team-name">{team.name}</span>
                                </span>
                                <span className="col-solves">{team.solves}</span>
                                <span className="col-points">{team.points.toLocaleString()}</span>
                                <span className="col-progress">
                                    <div className="progress-bar">
                                        <div
                                            className="progress-fill"
                                            style={{ width: `${(team.points / maxPoints) * 100}%` }}
                                        ></div>
                                    </div>
                                </span>
                                <span className="col-last">{team.lastSolve}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </main>
        </div>
    )
}

export default Scoreboard
