import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import * as THREE from 'three'
import './Building3DViewer.css'

// Server rack component
function ServerRack({ position, label, color = '#60a5fa' }) {
    return (
        <group position={position}>
            {/* Rack frame */}
            <mesh>
                <boxGeometry args={[0.8, 1.5, 0.6]} />
                <meshStandardMaterial color="#1a1a1a" />
            </mesh>
            {/* Server units */}
            {[-0.4, -0.1, 0.2, 0.5].map((y, i) => (
                <mesh key={i} position={[0, y, 0.05]}>
                    <boxGeometry args={[0.7, 0.25, 0.5]} />
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
                </mesh>
            ))}
            {/* LED lights */}
            {[-0.4, -0.1, 0.2, 0.5].map((y, i) => (
                <mesh key={`led-${i}`} position={[0.25, y, 0.31]}>
                    <boxGeometry args={[0.05, 0.05, 0.02]} />
                    <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={1} />
                </mesh>
            ))}
            {label && (
                <Text
                    position={[0, 1, 0]}
                    fontSize={0.15}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="bottom"
                >
                    {label}
                </Text>
            )}
        </group>
    )
}

// Workstation component
function Workstation({ position }) {
    return (
        <group position={position}>
            {/* Desk */}
            <mesh position={[0, 0.4, 0]}>
                <boxGeometry args={[1, 0.05, 0.6]} />
                <meshStandardMaterial color="#2a2a2a" />
            </mesh>
            {/* Monitor */}
            <mesh position={[0, 0.7, -0.1]}>
                <boxGeometry args={[0.6, 0.4, 0.05]} />
                <meshStandardMaterial color="#0a0a0a" />
            </mesh>
            {/* Screen glow */}
            <mesh position={[0, 0.7, -0.07]}>
                <boxGeometry args={[0.55, 0.35, 0.01]} />
                <meshStandardMaterial color="#1e3a5f" emissive="#1e3a5f" emissiveIntensity={0.5} />
            </mesh>
            {/* Keyboard */}
            <mesh position={[0, 0.45, 0.15]}>
                <boxGeometry args={[0.4, 0.02, 0.15]} />
                <meshStandardMaterial color="#333" />
            </mesh>
        </group>
    )
}

// Network switch component
function NetworkSwitch({ position, color = '#a78bfa' }) {
    return (
        <group position={position}>
            <mesh>
                <boxGeometry args={[1.2, 0.15, 0.4]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
            </mesh>
            {/* Port lights */}
            {Array.from({ length: 8 }).map((_, i) => (
                <mesh key={i} position={[-0.5 + i * 0.12, 0, 0.21]}>
                    <boxGeometry args={[0.03, 0.03, 0.02]} />
                    <meshStandardMaterial
                        color={Math.random() > 0.3 ? '#22c55e' : '#f97316'}
                        emissive={Math.random() > 0.3 ? '#22c55e' : '#f97316'}
                        emissiveIntensity={1}
                    />
                </mesh>
            ))}
        </group>
    )
}

// Firewall component
function Firewall({ position }) {
    return (
        <group position={position}>
            <mesh>
                <boxGeometry args={[0.8, 0.8, 0.4]} />
                <meshStandardMaterial color="#dc2626" emissive="#dc2626" emissiveIntensity={0.15} />
            </mesh>
            <Text
                position={[0, 0, 0.21]}
                fontSize={0.1}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
            >
                FIREWALL
            </Text>
        </group>
    )
}

// Floor component
function Floor({ visible, yPosition, floorData }) {
    if (!visible) return null

    return (
        <group position={[0, yPosition, 0]}>
            {/* Floor base */}
            <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[12, 8]} />
                <meshStandardMaterial color="#0d1117" side={THREE.DoubleSide} />
            </mesh>

            {/* Floor grid */}
            <gridHelper args={[12, 24, '#1e3a5f', '#0d2137']} position={[0, 0, 0]} />

            {/* Walls */}
            <mesh position={[0, 1.5, -4]}>
                <boxGeometry args={[12, 3, 0.1]} />
                <meshStandardMaterial color="#1a1a2e" transparent opacity={0.3} />
            </mesh>
            <mesh position={[0, 1.5, 4]}>
                <boxGeometry args={[12, 3, 0.1]} />
                <meshStandardMaterial color="#1a1a2e" transparent opacity={0.3} />
            </mesh>
            <mesh position={[-6, 1.5, 0]}>
                <boxGeometry args={[0.1, 3, 8]} />
                <meshStandardMaterial color="#1a1a2e" transparent opacity={0.3} />
            </mesh>
            <mesh position={[6, 1.5, 0]}>
                <boxGeometry args={[0.1, 3, 8]} />
                <meshStandardMaterial color="#1a1a2e" transparent opacity={0.3} />
            </mesh>

            {/* Equipment based on floor */}
            {floorData.servers.map((pos, i) => (
                <ServerRack key={`srv-${i}`} position={pos.position} label={pos.label} color={pos.color} />
            ))}
            {floorData.workstations.map((pos, i) => (
                <Workstation key={`ws-${i}`} position={pos} />
            ))}
            {floorData.switches.map((pos, i) => (
                <NetworkSwitch key={`sw-${i}`} position={pos.position} color={pos.color} />
            ))}
            {floorData.firewalls.map((pos, i) => (
                <Firewall key={`fw-${i}`} position={pos} />
            ))}

            {/* Zone labels */}
            {floorData.zones.map((zone, i) => (
                <Text
                    key={`zone-${i}`}
                    position={zone.position}
                    fontSize={0.3}
                    color={zone.color}
                    anchorX="center"
                    anchorY="middle"
                >
                    {zone.label}
                </Text>
            ))}
        </group>
    )
}

// Scene content with rotation
function Scene({ currentFloor }) {
    const groupRef = useRef()

    // Floor data configuration
    const floors = {
        0: { // WAN Level
            name: 'WAN Gateway',
            servers: [
                { position: [0, 0.75, 0], label: 'VPN-GW', color: '#3b82f6' },
            ],
            workstations: [],
            switches: [
                { position: [-2, 0.5, 0], color: '#3b82f6' },
                { position: [2, 0.5, 0], color: '#3b82f6' },
            ],
            firewalls: [
                [0, 0.4, 2],
            ],
            zones: [
                { position: [0, 0.1, -2], label: 'WAN ZONE', color: '#3b82f6' },
            ]
        },
        1: { // DMZ Level
            name: 'DMZ',
            servers: [
                { position: [-3, 0.75, -1], label: 'WEB-01', color: '#f97316' },
                { position: [-1, 0.75, -1], label: 'WEB-02', color: '#f97316' },
                { position: [1, 0.75, -1], label: 'MAIL', color: '#f97316' },
                { position: [3, 0.75, -1], label: 'DNS', color: '#f97316' },
            ],
            workstations: [],
            switches: [
                { position: [0, 0.5, 1], color: '#f97316' },
            ],
            firewalls: [
                [-4, 0.4, 0],
                [4, 0.4, 0],
            ],
            zones: [
                { position: [0, 0.1, -3], label: 'DMZ ZONE', color: '#f97316' },
            ]
        },
        2: { // LAN Level
            name: 'LAN Internal',
            servers: [
                { position: [-4, 0.75, -2], label: 'AD-DC', color: '#22c55e' },
                { position: [-2, 0.75, -2], label: 'DB-01', color: '#22c55e' },
                { position: [0, 0.75, -2], label: 'FILE-SRV', color: '#22c55e' },
                { position: [2, 0.75, -2], label: 'APP-01', color: '#22c55e' },
                { position: [4, 0.75, -2], label: 'BACKUP', color: '#22c55e' },
            ],
            workstations: [
                [-4, 0, 2],
                [-2, 0, 2],
                [0, 0, 2],
                [2, 0, 2],
                [4, 0, 2],
            ],
            switches: [
                { position: [-2, 0.5, 0], color: '#22c55e' },
                { position: [2, 0.5, 0], color: '#22c55e' },
            ],
            firewalls: [],
            zones: [
                { position: [0, 0.1, -3.5], label: 'LAN ZONE', color: '#22c55e' },
            ]
        },
    }

    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            <pointLight position={[-10, 10, -10]} intensity={0.5} />
            <spotLight position={[0, 15, 0]} intensity={0.6} angle={0.5} />

            {/* Floor rendering */}
            <group ref={groupRef}>
                {Object.entries(floors).map(([floorNum, floorData]) => (
                    <Floor
                        key={floorNum}
                        visible={parseInt(floorNum) === currentFloor}
                        yPosition={0}
                        floorData={floorData}
                    />
                ))}
            </group>

            {/* Camera controls */}
            <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                minDistance={5}
                maxDistance={25}
                minPolarAngle={0.2}
                maxPolarAngle={Math.PI / 2.2}
            />
        </>
    )
}

function Building3DViewer() {
    const [currentFloor, setCurrentFloor] = useState(2)

    const floorNames = ['WAN Gateway', 'DMZ', 'LAN Internal']
    const floorColors = ['#3b82f6', '#f97316', '#22c55e']

    return (
        <div className="building-viewer">
            <div className="viewer-canvas">
                <Canvas
                    camera={{ position: [8, 8, 8], fov: 50 }}
                    gl={{ antialias: true }}
                >
                    <Scene currentFloor={currentFloor} />
                </Canvas>
            </div>

            {/* Floor selector */}
            <div className="floor-selector">
                <div className="floor-label">ÉTAGE</div>
                <div className="floor-slider">
                    {floorNames.map((name, index) => (
                        <button
                            key={index}
                            className={`floor-btn ${currentFloor === index ? 'active' : ''}`}
                            style={{
                                '--floor-color': floorColors[index],
                                borderColor: currentFloor === index ? floorColors[index] : 'transparent'
                            }}
                            onClick={() => setCurrentFloor(index)}
                        >
                            <span className="floor-number">{index}</span>
                            <span className="floor-name">{name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Controls hint */}
            <div className="viewer-controls-hint">
                <span>🖱️ Clic + Glisser pour tourner</span>
                <span>🔍 Molette pour zoomer</span>
            </div>
        </div>
    )
}

export default Building3DViewer
