import { useState } from 'react'
import { X, Server, Monitor, Shield, Wifi, Database, Globe } from 'lucide-react'
import './FloorPlanMap.css'

// Equipment data per floor
const floorsData = {
    0: {
        name: 'WAN Gateway',
        color: '#3b82f6',
        rooms: [
            { id: 'wan-main', x: 25, y: 20, width: 60, height: 60, label: 'SALLE RÉSEAU' }
        ],
        equipment: [
            { id: 'vpn-gw', type: 'server', x: 40, y: 35, label: 'VPN-GW', ip: '203.0.113.10', desc: 'Passerelle VPN principale', services: ['OpenVPN', 'IPSec'], status: 'online' },
            { id: 'fw-ext', type: 'firewall', x: 60, y: 35, label: 'FW-EXT', ip: '203.0.113.1', desc: 'Firewall périmétrique', services: ['iptables', 'fail2ban'], status: 'online' },
            { id: 'switch-wan', type: 'switch', x: 50, y: 55, label: 'SW-WAN', ip: '203.0.113.2', desc: 'Switch cœur WAN', services: ['VLAN 1-10'], status: 'online' }
        ]
    },
    1: {
        name: 'DMZ',
        color: '#f97316',
        rooms: [
            { id: 'dmz-web', x: 15, y: 10, width: 40, height: 35, label: 'ZONE WEB' },
            { id: 'dmz-mail', x: 65, y: 10, width: 30, height: 35, label: 'ZONE MAIL' },
            { id: 'dmz-core', x: 30, y: 55, width: 60, height: 35, label: 'CŒUR DMZ' }
        ],
        equipment: [
            { id: 'web-01', type: 'server', x: 25, y: 25, label: 'WEB-01', ip: '10.0.1.10', desc: 'Serveur web principal', services: ['Apache', 'PHP 8.1'], status: 'compromised' },
            { id: 'web-02', type: 'server', x: 45, y: 25, label: 'WEB-02', ip: '10.0.1.11', desc: 'Serveur web secondaire', services: ['Nginx', 'Node.js'], status: 'online' },
            { id: 'mail-srv', type: 'server', x: 75, y: 25, label: 'MAIL', ip: '10.0.1.20', desc: 'Serveur de messagerie', services: ['Postfix', 'Dovecot'], status: 'online' },
            { id: 'dns-srv', type: 'server', x: 90, y: 25, label: 'DNS', ip: '10.0.1.5', desc: 'Serveur DNS public', services: ['BIND9'], status: 'online' },
            { id: 'fw-dmz', type: 'firewall', x: 45, y: 70, label: 'FW-DMZ', ip: '10.0.1.1', desc: 'Firewall DMZ', services: ['pfSense'], status: 'online' },
            { id: 'switch-dmz', type: 'switch', x: 75, y: 70, label: 'SW-DMZ', ip: '10.0.1.2', desc: 'Switch DMZ', services: ['VLAN 100-110'], status: 'online' }
        ]
    },
    2: {
        name: 'LAN Interne',
        color: '#22c55e',
        rooms: [
            { id: 'lan-srv', x: 15, y: 5, width: 50, height: 40, label: 'SALLE SERVEURS' },
            { id: 'lan-office', x: 70, y: 5, width: 25, height: 40, label: 'BUREAUX' },
            { id: 'lan-admin', x: 15, y: 55, width: 30, height: 35, label: 'ADMIN IT' },
            { id: 'lan-network', x: 50, y: 55, width: 45, height: 35, label: 'LOCAL TECHNIQUE' }
        ],
        equipment: [
            { id: 'ad-dc', type: 'server', x: 22, y: 20, label: 'AD-DC', ip: '192.168.1.5', desc: 'Active Directory', services: ['LDAP', 'Kerberos', 'DNS'], status: 'online' },
            { id: 'db-01', type: 'database', x: 38, y: 20, label: 'DB-01', ip: '192.168.1.50', desc: 'Base de données principale', services: ['PostgreSQL 15'], status: 'compromised' },
            { id: 'file-srv', type: 'server', x: 54, y: 20, label: 'FILE-SRV', ip: '192.168.1.30', desc: 'Serveur de fichiers', services: ['Samba', 'NFS'], status: 'online' },
            { id: 'ws-01', type: 'workstation', x: 77, y: 15, label: 'WS-01', ip: '192.168.1.101', desc: 'Poste utilisateur', services: ['Windows 11'], status: 'online' },
            { id: 'ws-02', type: 'workstation', x: 88, y: 15, label: 'WS-02', ip: '192.168.1.102', desc: 'Poste utilisateur', services: ['Windows 11'], status: 'online' },
            { id: 'ws-03', type: 'workstation', x: 77, y: 32, label: 'WS-03', ip: '192.168.1.103', desc: 'Poste utilisateur', services: ['Ubuntu 22.04'], status: 'online' },
            { id: 'admin-pc', type: 'workstation', x: 30, y: 70, label: 'ADMIN-PC', ip: '192.168.1.10', desc: 'Poste administrateur', services: ['Windows 11 Pro'], status: 'online' },
            { id: 'switch-lan', type: 'switch', x: 65, y: 70, label: 'SW-LAN', ip: '192.168.1.2', desc: 'Switch principal LAN', services: ['VLAN 200-250'], status: 'online' },
            { id: 'backup-srv', type: 'server', x: 85, y: 70, label: 'BACKUP', ip: '192.168.1.100', desc: 'Serveur de sauvegarde', services: ['Veeam', 'rsync'], status: 'online' }
        ]
    }
}

function EquipmentIcon({ type, status }) {
    const iconProps = { size: 16 }

    switch (type) {
        case 'server':
            return <Server {...iconProps} />
        case 'workstation':
            return <Monitor {...iconProps} />
        case 'firewall':
            return <Shield {...iconProps} />
        case 'switch':
            return <Wifi {...iconProps} />
        case 'database':
            return <Database {...iconProps} />
        default:
            return <Globe {...iconProps} />
    }
}

function FloorPlanMap() {
    const [currentFloor, setCurrentFloor] = useState(2)
    const [selectedEquipment, setSelectedEquipment] = useState(null)
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 })

    const floor = floorsData[currentFloor]

    const handleEquipmentClick = (equipment, event) => {
        const rect = event.currentTarget.closest('.floor-plan-container').getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

        setPopupPosition({ x, y })
        setSelectedEquipment(equipment)
    }

    const closePopup = () => {
        setSelectedEquipment(null)
    }

    return (
        <div className="floor-plan-wrapper">
            <div className="floor-plan-container">
                {/* Blueprint grid background */}
                <div className="blueprint-grid"></div>

                {/* Rooms */}
                {floor.rooms.map(room => (
                    <div
                        key={room.id}
                        className="room"
                        style={{
                            left: `${room.x}%`,
                            top: `${room.y}%`,
                            width: `${room.width}%`,
                            height: `${room.height}%`,
                            '--floor-color': floor.color
                        }}
                    >
                        <span className="room-label">{room.label}</span>
                    </div>
                ))}

                {/* Equipment icons */}
                {floor.equipment.map(eq => (
                    <button
                        key={eq.id}
                        className={`equipment-marker ${eq.status}`}
                        style={{
                            left: `${eq.x}%`,
                            top: `${eq.y}%`,
                            '--floor-color': floor.color
                        }}
                        onClick={(e) => handleEquipmentClick(eq, e)}
                        title={eq.label}
                    >
                        <EquipmentIcon type={eq.type} status={eq.status} />
                    </button>
                ))}

                {/* Equipment popup */}
                {selectedEquipment && (
                    <div
                        className="equipment-popup"
                        style={{
                            left: popupPosition.x > 300 ? popupPosition.x - 220 : popupPosition.x + 20,
                            top: popupPosition.y > 200 ? popupPosition.y - 150 : popupPosition.y
                        }}
                    >
                        <div className="popup-header">
                            <div className="popup-title">
                                <EquipmentIcon type={selectedEquipment.type} />
                                <span>{selectedEquipment.label}</span>
                            </div>
                            <button className="popup-close" onClick={closePopup}>
                                <X size={14} />
                            </button>
                        </div>
                        <div className="popup-content">
                            <div className="popup-row">
                                <span className="popup-label">IP</span>
                                <span className="popup-value ip">{selectedEquipment.ip}</span>
                            </div>
                            <div className="popup-row">
                                <span className="popup-label">Description</span>
                                <span className="popup-value">{selectedEquipment.desc}</span>
                            </div>
                            <div className="popup-row">
                                <span className="popup-label">Services</span>
                                <span className="popup-value">{selectedEquipment.services.join(', ')}</span>
                            </div>
                            <div className="popup-row">
                                <span className="popup-label">Statut</span>
                                <span className={`popup-status ${selectedEquipment.status}`}>
                                    {selectedEquipment.status === 'online' ? 'En ligne' :
                                        selectedEquipment.status === 'compromised' ? 'Compromis' : 'Hors ligne'}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Controls Container - Bottom Left */}
                <div className="map-controls">
                    <div className="floor-selector">
                        {Object.entries(floorsData).reverse().map(([num, data]) => (
                            <button
                                key={num}
                                className={`floor-btn ${parseInt(num) === currentFloor ? 'active' : ''}`}
                                style={{ '--floor-color': data.color }}
                                onClick={() => { setCurrentFloor(parseInt(num)); closePopup(); }}
                                title={data.name}
                            >
                                <span className="floor-num">{num}</span>
                            </button>
                        ))}
                    </div>
                    <div className="current-floor-label" style={{ color: floor.color }}>
                        <span className="floor-number-display">{currentFloor}</span>
                        <span className="floor-name-display">{floor.name}</span>
                    </div>
                </div>

                {/* Legend - Integrated at bottom */}
                <div className="map-legend-integrated">
                    <div className="legend-group">
                        <div className="legend-item">
                            <EquipmentIcon type="server" /> <span>Serveur</span>
                        </div>
                        <div className="legend-item">
                            <EquipmentIcon type="workstation" /> <span>Poste</span>
                        </div>
                        <div className="legend-item">
                            <EquipmentIcon type="firewall" /> <span>Firewall</span>
                        </div>
                        <div className="legend-item">
                            <EquipmentIcon type="switch" /> <span>Switch</span>
                        </div>
                    </div>
                    <div className="legend-divider"></div>
                    <div className="legend-item compromised">
                        <span className="legend-dot"></span> <span>Compromis</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FloorPlanMap
