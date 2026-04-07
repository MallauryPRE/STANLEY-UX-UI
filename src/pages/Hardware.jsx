import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Card from '../components/Card'
import LineChart from '../components/LineChart'
import {
    Cpu,
    MemoryStick,
    HardDrive,
    Network,
    Thermometer,
    Activity,
    Server,
    Gauge,
    AlertTriangle,
    CheckCircle
} from 'lucide-react'
import './Hardware.css'

// Génère une valeur aléatoire dans une plage
const randomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

// Génère un historique de valeurs
const generateHistory = (baseValue, variance, length = 20) => {
    return Array.from({ length }, () =>
        Math.max(0, Math.min(100, baseValue + randomInRange(-variance, variance)))
    )
}

// Configuration des serveurs simulés
const initialServers = [
    { id: 'srv-01', name: 'CTF-Server-01', type: 'Challenge Host', status: 'online' },
    { id: 'srv-02', name: 'CTF-Server-02', type: 'Challenge Host', status: 'online' },
    { id: 'srv-03', name: 'Database-01', type: 'Database', status: 'online' },
    { id: 'srv-04', name: 'Web-Frontend', type: 'Web Server', status: 'online' },
    { id: 'srv-05', name: 'VPN-Gateway', type: 'Network', status: 'warning' },
    { id: 'srv-06', name: 'Backup-01', type: 'Storage', status: 'online' },
]

function Hardware() {
    const [metrics, setMetrics] = useState({
        cpu: { current: 45, history: generateHistory(45, 15) },
        memory: { current: 62, history: generateHistory(62, 10) },
        disk: { current: 38, history: generateHistory(38, 5) },
        network: { current: 25, history: generateHistory(25, 20) },
        temperature: { current: 52, history: generateHistory(52, 8) },
    })

    const [servers, setServers] = useState(initialServers.map(s => ({
        ...s,
        cpu: randomInRange(20, 80),
        memory: randomInRange(30, 85),
        disk: randomInRange(20, 70),
        network: randomInRange(5, 50),
        temp: randomInRange(40, 65),
        uptime: `${randomInRange(1, 30)}j ${randomInRange(0, 23)}h`
    })))

    const [selectedServer, setSelectedServer] = useState(null)

    // Mise à jour simulée des métriques
    useEffect(() => {
        const interval = setInterval(() => {
            setMetrics(prev => ({
                cpu: {
                    current: Math.max(5, Math.min(95, prev.cpu.current + randomInRange(-8, 8))),
                    history: [...prev.cpu.history.slice(1), prev.cpu.current]
                },
                memory: {
                    current: Math.max(20, Math.min(90, prev.memory.current + randomInRange(-3, 3))),
                    history: [...prev.memory.history.slice(1), prev.memory.current]
                },
                disk: {
                    current: Math.max(10, Math.min(80, prev.disk.current + randomInRange(-1, 2))),
                    history: [...prev.disk.history.slice(1), prev.disk.current]
                },
                network: {
                    current: Math.max(0, Math.min(100, prev.network.current + randomInRange(-15, 15))),
                    history: [...prev.network.history.slice(1), prev.network.current]
                },
                temperature: {
                    current: Math.max(35, Math.min(75, prev.temperature.current + randomInRange(-3, 3))),
                    history: [...prev.temperature.history.slice(1), prev.temperature.current]
                },
            }))

            // Update servers
            setServers(prev => prev.map(s => ({
                ...s,
                cpu: Math.max(5, Math.min(95, s.cpu + randomInRange(-10, 10))),
                memory: Math.max(20, Math.min(95, s.memory + randomInRange(-5, 5))),
                network: Math.max(0, Math.min(80, s.network + randomInRange(-10, 10))),
                temp: Math.max(35, Math.min(70, s.temp + randomInRange(-2, 2))),
                status: s.cpu > 85 || s.memory > 90 ? 'warning' : 'online'
            })))
        }, 2000)

        return () => clearInterval(interval)
    }, [])

    const getStatusColor = (value, thresholds = { warning: 70, danger: 85 }) => {
        if (value >= thresholds.danger) return 'danger'
        if (value >= thresholds.warning) return 'warning'
        return 'normal'
    }

    const labels = Array.from({ length: 20 }, (_, i) => `${i * 3}s`)

    return (
        <div className="hardware-page">
            <Header />

            <main className="hardware-content">
                <div className="hardware-header">
                    <div>
                        <h1 className="page-title">Hardware Monitoring</h1>
                        <p className="page-subtitle">Surveillance des performances système en temps réel</p>
                    </div>
                    <div className="admin-badge">
                        <AlertTriangle size={16} />
                        <span>Admin / Game Master Only</span>
                    </div>
                </div>

                {/* Overview Metrics */}
                <div className="metrics-grid">
                    <div className={`metric-card ${getStatusColor(metrics.cpu.current)}`}>
                        <div className="metric-header">
                            <Cpu size={24} />
                            <span>CPU</span>
                        </div>
                        <div className="metric-value">{metrics.cpu.current}%</div>
                        <div className="metric-bar">
                            <div
                                className="metric-fill"
                                style={{ width: `${metrics.cpu.current}%` }}
                            ></div>
                        </div>
                        <div className="metric-chart">
                            <LineChart data={metrics.cpu.history} labels={labels} />
                        </div>
                    </div>

                    <div className={`metric-card ${getStatusColor(metrics.memory.current)}`}>
                        <div className="metric-header">
                            <MemoryStick size={24} />
                            <span>RAM</span>
                        </div>
                        <div className="metric-value">{metrics.memory.current}%</div>
                        <div className="metric-bar">
                            <div
                                className="metric-fill"
                                style={{ width: `${metrics.memory.current}%` }}
                            ></div>
                        </div>
                        <div className="metric-chart">
                            <LineChart data={metrics.memory.history} labels={labels} />
                        </div>
                    </div>

                    <div className={`metric-card ${getStatusColor(metrics.disk.current, { warning: 60, danger: 80 })}`}>
                        <div className="metric-header">
                            <HardDrive size={24} />
                            <span>Disque</span>
                        </div>
                        <div className="metric-value">{metrics.disk.current}%</div>
                        <div className="metric-bar">
                            <div
                                className="metric-fill"
                                style={{ width: `${metrics.disk.current}%` }}
                            ></div>
                        </div>
                        <div className="metric-chart">
                            <LineChart data={metrics.disk.history} labels={labels} />
                        </div>
                    </div>

                    <div className={`metric-card ${getStatusColor(metrics.network.current, { warning: 60, danger: 80 })}`}>
                        <div className="metric-header">
                            <Network size={24} />
                            <span>Réseau</span>
                        </div>
                        <div className="metric-value">{metrics.network.current} Mb/s</div>
                        <div className="metric-bar">
                            <div
                                className="metric-fill"
                                style={{ width: `${metrics.network.current}%` }}
                            ></div>
                        </div>
                        <div className="metric-chart">
                            <LineChart data={metrics.network.history} labels={labels} />
                        </div>
                    </div>

                    <div className={`metric-card ${getStatusColor(metrics.temperature.current, { warning: 60, danger: 70 })}`}>
                        <div className="metric-header">
                            <Thermometer size={24} />
                            <span>Température</span>
                        </div>
                        <div className="metric-value">{metrics.temperature.current}°C</div>
                        <div className="metric-bar">
                            <div
                                className="metric-fill"
                                style={{ width: `${(metrics.temperature.current / 100) * 100}%` }}
                            ></div>
                        </div>
                        <div className="metric-chart">
                            <LineChart data={metrics.temperature.history} labels={labels} />
                        </div>
                    </div>
                </div>

                {/* Server Status */}
                <Card title="État des Serveurs" icon={Server} className="servers-card">
                    <div className="servers-grid">
                        {servers.map(server => (
                            <div
                                key={server.id}
                                className={`server-card ${server.status}`}
                                onClick={() => setSelectedServer(selectedServer === server.id ? null : server.id)}
                            >
                                <div className="server-header">
                                    <div className="server-status-dot"></div>
                                    <span className="server-name">{server.name}</span>
                                    <span className="server-type">{server.type}</span>
                                </div>

                                <div className="server-metrics">
                                    <div className="server-metric">
                                        <Cpu size={14} />
                                        <span>{server.cpu}%</span>
                                    </div>
                                    <div className="server-metric">
                                        <MemoryStick size={14} />
                                        <span>{server.memory}%</span>
                                    </div>
                                    <div className="server-metric">
                                        <Network size={14} />
                                        <span>{server.network} Mb/s</span>
                                    </div>
                                    <div className="server-metric">
                                        <Thermometer size={14} />
                                        <span>{server.temp}°C</span>
                                    </div>
                                </div>

                                {selectedServer === server.id && (
                                    <div className="server-details">
                                        <div className="detail-row">
                                            <span>Uptime</span>
                                            <span>{server.uptime}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span>Disk Usage</span>
                                            <span>{server.disk}%</span>
                                        </div>
                                        <div className="detail-row">
                                            <span>Status</span>
                                            <span className={`status-badge ${server.status}`}>
                                                {server.status === 'online' ? (
                                                    <><CheckCircle size={12} /> Online</>
                                                ) : (
                                                    <><AlertTriangle size={12} /> Warning</>
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </Card>

                {/* System Health */}
                <div className="health-row">
                    <Card title="Santé Globale" icon={Activity} className="health-card">
                        <div className="health-score">
                            <div className="health-circle">
                                <svg viewBox="0 0 100 100">
                                    <circle
                                        cx="50" cy="50" r="45"
                                        fill="none"
                                        stroke="var(--bg-tertiary)"
                                        strokeWidth="8"
                                    />
                                    <circle
                                        cx="50" cy="50" r="45"
                                        fill="none"
                                        stroke="var(--text-primary)"
                                        strokeWidth="8"
                                        strokeDasharray={`${(100 - (metrics.cpu.current + metrics.memory.current) / 4) * 2.83} 283`}
                                        strokeLinecap="round"
                                        transform="rotate(-90 50 50)"
                                    />
                                </svg>
                                <div className="health-value">
                                    {Math.round(100 - (metrics.cpu.current + metrics.memory.current) / 4)}%
                                </div>
                            </div>
                            <p className="health-label">Score de santé système</p>
                        </div>
                    </Card>

                    <Card title="Alertes Récentes" icon={AlertTriangle} className="alerts-card">
                        <div className="alerts-list">
                            <div className="alert-item warning">
                                <AlertTriangle size={16} />
                                <div className="alert-content">
                                    <span className="alert-message">VPN-Gateway: Latence élevée détectée</span>
                                    <span className="alert-time">Il y a 5 min</span>
                                </div>
                            </div>
                            <div className="alert-item info">
                                <Activity size={16} />
                                <div className="alert-content">
                                    <span className="alert-message">CTF-Server-01: Pic de CPU à 78%</span>
                                    <span className="alert-time">Il y a 12 min</span>
                                </div>
                            </div>
                            <div className="alert-item success">
                                <CheckCircle size={16} />
                                <div className="alert-content">
                                    <span className="alert-message">Backup-01: Sauvegarde complétée</span>
                                    <span className="alert-time">Il y a 25 min</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    )
}

export default Hardware
