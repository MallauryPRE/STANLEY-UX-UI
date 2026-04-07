import Header from '../components/Header'
import FloorPlanMap from '../components/FloorPlanMap'
import {
    MapPin,
    Target,
    Server,
    Info,
    AlertTriangle,
    Clock,
    FileText
} from 'lucide-react'
import './Briefing.css'

function Briefing() {
    return (
        <div className="briefing-page">
            <Header />

            <main className="briefing-content">
                {/* Header Bar */}
                <div className="briefing-header-bar">
                    <div className="briefing-title-section">
                        <FileText size={24} className="briefing-icon" />
                        <div>
                            <h1 className="briefing-title">Scénario</h1>
                            <span className="briefing-subtitle">Présentation du challenge</span>
                        </div>
                    </div>
                    <div className="briefing-meta">
                        <div className="meta-item">
                            <Clock size={16} />
                            <span>Durée : 6h00</span>
                        </div>
                        <div className="meta-item threat">
                            <AlertTriangle size={16} />
                            <span>Difficulté : Élevée</span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="briefing-grid">
                    {/* Left - 3D Map */}
                    <div className="briefing-map-section">
                        <div className="section-header">
                            <MapPin size={18} />
                            <h2>Architecture réseau</h2>
                        </div>
                        <div className="tactical-map-container">
                            <FloorPlanMap />
                        </div>
                    </div>

                    {/* Right - Context Panels */}
                    <div className="briefing-info-section">
                        {/* Context Block */}
                        <div className="info-block context-block">
                            <div className="block-header">
                                <Info size={18} />
                                <h3>Contexte</h3>
                            </div>
                            <div className="block-content">
                                <p className="story-text">
                                    L'infrastructure réseau de <strong>NEXUS CORP</strong>,
                                    une entreprise du secteur énergétique, a été compromise.
                                    Des backdoors ont été déployées sur plusieurs serveurs
                                    et le réseau interne est potentiellement exposé.
                                </p>
                                <p className="story-text">
                                    Votre rôle : <strong>analyser l'infrastructure</strong>,
                                    <strong>identifier les failles</strong> et <strong>documenter vos découvertes</strong>
                                    pour permettre la remédiation.
                                </p>
                                <div className="warning-box">
                                    <AlertTriangle size={16} />
                                    <span>Le temps est limité. Des attaquants sont potentiellement encore actifs.</span>
                                </div>
                            </div>
                        </div>

                        {/* Objectives Block */}
                        <div className="info-block objectives-block">
                            <div className="block-header">
                                <Target size={18} />
                                <h3>Objectifs</h3>
                            </div>
                            <div className="block-content">
                                <ul className="objectives-list">
                                    <li className="objective-item primary">
                                        <span className="obj-marker">01</span>
                                        <span>Identifier les vulnérabilités du périmètre DMZ</span>
                                    </li>
                                    <li className="objective-item primary">
                                        <span className="obj-marker">02</span>
                                        <span>Obtenir un accès au réseau interne (LAN)</span>
                                    </li>
                                    <li className="objective-item primary">
                                        <span className="obj-marker">03</span>
                                        <span>Récupérer les preuves de l'attaque</span>
                                    </li>
                                    <li className="objective-item secondary">
                                        <span className="obj-marker">04</span>
                                        <span>Identifier les backdoors installées</span>
                                    </li>
                                    <li className="objective-item secondary">
                                        <span className="obj-marker">05</span>
                                        <span>Documenter la chaîne d'attaque</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Network Details Block */}
                        <div className="info-block network-block">
                            <div className="block-header">
                                <Server size={18} />
                                <h3>Infrastructure</h3>
                            </div>
                            <div className="block-content">
                                <div className="network-grid">
                                    <div className="network-item">
                                        <span className="net-label">Réseau DMZ</span>
                                        <span className="net-value">10.0.1.0/24</span>
                                    </div>
                                    <div className="network-item">
                                        <span className="net-label">Réseau LAN</span>
                                        <span className="net-value">192.168.1.0/24</span>
                                    </div>
                                    <div className="network-item">
                                        <span className="net-label">Passerelle WAN</span>
                                        <span className="net-value">203.0.113.1</span>
                                    </div>
                                    <div className="network-item">
                                        <span className="net-label">Serveur Web</span>
                                        <span className="net-value">10.0.1.10</span>
                                    </div>
                                    <div className="network-item">
                                        <span className="net-label">Serveur DB</span>
                                        <span className="net-value">192.168.1.50</span>
                                    </div>
                                    <div className="network-item">
                                        <span className="net-label">Serveur AD</span>
                                        <span className="net-value">192.168.1.5</span>
                                    </div>
                                    <div className="network-item">
                                        <span className="net-label">Firewall</span>
                                        <span className="net-value">10.0.1.1</span>
                                    </div>
                                    <div className="network-item">
                                        <span className="net-label">VPN Gateway</span>
                                        <span className="net-value">203.0.113.10</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Briefing
