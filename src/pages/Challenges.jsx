import { useState } from 'react'
import Header from '../components/Header'
import Card from '../components/Card'
import {
    Flag,
    Search,
    Filter,
    CheckCircle,
    Lock,
    Clock,
    Zap,
    ArrowRight,
    X,
    Send
} from 'lucide-react'
import './Challenges.css'

// All challenges data
const allChallenges = [
    {
        id: 1,
        name: 'SQL Injection Basics',
        category: 'Web',
        points: 100,
        difficulty: 'Easy',
        solved: true,
        solveCount: 45,
        description: 'Exploitez une vulnérabilité SQL injection basique pour récupérer les données cachées.',
        hint: 'Pensez aux commentaires SQL...',
        author: 'Admin'
    },
    {
        id: 2,
        name: 'XSS Challenge',
        category: 'Web',
        points: 100,
        difficulty: 'Easy',
        solved: true,
        solveCount: 38,
        description: 'Trouvez et exploitez une faille XSS réfléchie sur cette application.',
        hint: 'Les champs de recherche sont souvent vulnérables.',
        author: 'Admin'
    },
    {
        id: 3,
        name: 'Advanced SQLi',
        category: 'Web',
        points: 400,
        difficulty: 'Hard',
        solved: false,
        solveCount: 5,
        description: 'Une injection SQL avancée avec WAF bypass. Vous devez extraire le flag de la base de données.',
        hint: 'Le WAF filtre les mots-clés classiques. Essayez des techniques d\'obfuscation.',
        author: 'CyberMaster'
    },
    {
        id: 4,
        name: 'Cookie Hijack',
        category: 'Web',
        points: 200,
        difficulty: 'Medium',
        solved: false,
        solveCount: 12,
        description: 'Volez le cookie de session de l\'administrateur pour accéder au panel admin.',
        hint: 'HttpOnly n\'est pas activé...',
        author: 'Admin'
    },
    {
        id: 5,
        name: 'RSA Basics',
        category: 'Crypto',
        points: 150,
        difficulty: 'Easy',
        solved: true,
        solveCount: 32,
        description: 'Décryptez ce message RSA. La clé publique a un petit exposant...',
        hint: 'e = 3, peut-être une attaque de petit exposant?',
        author: 'CryptoKing'
    },
    {
        id: 6,
        name: 'AES Decryption',
        category: 'Crypto',
        points: 250,
        difficulty: 'Medium',
        solved: false,
        solveCount: 8,
        description: 'Le mode ECB a été utilisé pour chiffrer une image. Retrouvez l\'information cachée.',
        hint: 'ECB mode révèle des patterns...',
        author: 'CryptoKing'
    },
    {
        id: 7,
        name: 'Buffer Overflow',
        category: 'Pwn',
        points: 400,
        difficulty: 'Hard',
        solved: true,
        solveCount: 3,
        description: 'Exploitez un buffer overflow pour obtenir un shell et lire le flag.',
        hint: 'NX est désactivé, ret2shellcode possible.',
        author: 'PwnMaster'
    },
    {
        id: 8,
        name: 'Heap Exploitation',
        category: 'Pwn',
        points: 500,
        difficulty: 'Hard',
        solved: false,
        solveCount: 1,
        description: 'Use-after-free vulnerability. Exploitez la heap pour contrôler le flux d\'exécution.',
        hint: 'Fastbin attack...',
        author: 'PwnMaster'
    },
    {
        id: 9,
        name: 'Memory Dump',
        category: 'Forensics',
        points: 300,
        difficulty: 'Medium',
        solved: false,
        solveCount: 6,
        description: 'Analysez ce dump mémoire pour retrouver les credentials de l\'utilisateur.',
        hint: 'Utilisez Volatility...',
        author: 'ForensicExpert'
    },
    {
        id: 10,
        name: 'Packet Analysis',
        category: 'Forensics',
        points: 150,
        difficulty: 'Easy',
        solved: false,
        solveCount: 18,
        description: 'Un fichier pcap contient une communication suspecte. Trouvez le flag.',
        hint: 'Cherchez des transferts de fichiers...',
        author: 'ForensicExpert'
    },
    {
        id: 11,
        name: 'Binary Patch',
        category: 'Reverse',
        points: 350,
        difficulty: 'Medium',
        solved: false,
        solveCount: 4,
        description: 'Ce binaire vérifie une licence. Contournez la vérification.',
        hint: 'Patch le jump conditionnel...',
        author: 'ReverseNinja'
    }
]

function Challenges() {
    const [challenges] = useState(allChallenges)
    const [search, setSearch] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('all')
    const [statusFilter, setStatusFilter] = useState('all')
    const [selectedChallenge, setSelectedChallenge] = useState(null)
    const [flagInput, setFlagInput] = useState('')
    const [flagStatus, setFlagStatus] = useState(null)

    const categories = ['Web', 'Crypto', 'Pwn', 'Forensics', 'Reverse']

    const filteredChallenges = challenges.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase())
        const matchesCategory = categoryFilter === 'all' || c.category === categoryFilter
        const matchesStatus = statusFilter === 'all' ||
            (statusFilter === 'solved' && c.solved) ||
            (statusFilter === 'unsolved' && !c.solved)
        return matchesSearch && matchesCategory && matchesStatus
    })

    const getDifficultyClass = (d) => d.toLowerCase()

    const handleSubmitFlag = () => {
        if (!flagInput.trim()) return

        // Simulated flag validation
        if (flagInput === 'STANLEY{test_flag}') {
            setFlagStatus('success')
        } else {
            setFlagStatus('error')
        }

        setTimeout(() => setFlagStatus(null), 3000)
    }

    const solvedCount = challenges.filter(c => c.solved).length
    const totalPoints = challenges.filter(c => c.solved).reduce((acc, c) => acc + c.points, 0)

    return (
        <div className="challenges-page">
            <Header />

            <main className="challenges-content">
                {/* Stats Bar */}
                <div className="challenges-stats">
                    <div className="stat-item">
                        <Flag size={18} />
                        <span className="stat-value">{solvedCount}/{challenges.length}</span>
                        <span className="stat-label">Challenges</span>
                    </div>
                    <div className="stat-item">
                        <Zap size={18} />
                        <span className="stat-value">{totalPoints}</span>
                        <span className="stat-label">Points</span>
                    </div>
                    <div className="stat-item">
                        <Clock size={18} />
                        <span className="stat-value">04:32:15</span>
                        <span className="stat-label">Restant</span>
                    </div>
                </div>

                {/* Filters */}
                <div className="challenges-filters">
                    <div className="search-box">
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="Rechercher un challenge..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="filter-group">
                        <Filter size={16} />
                        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                            <option value="all">Toutes les catégories</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-buttons">
                        <button
                            className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
                            onClick={() => setStatusFilter('all')}
                        >
                            Tous
                        </button>
                        <button
                            className={`filter-btn ${statusFilter === 'unsolved' ? 'active' : ''}`}
                            onClick={() => setStatusFilter('unsolved')}
                        >
                            Non résolus
                        </button>
                        <button
                            className={`filter-btn ${statusFilter === 'solved' ? 'active' : ''}`}
                            onClick={() => setStatusFilter('solved')}
                        >
                            Résolus
                        </button>
                    </div>
                </div>

                {/* Challenges Grid */}
                <div className="challenges-grid">
                    {filteredChallenges.map((challenge) => (
                        <div
                            key={challenge.id}
                            className={`challenge-card ${challenge.solved ? 'solved' : ''}`}
                            onClick={() => setSelectedChallenge(challenge)}
                        >
                            <div className="challenge-header">
                                <div className="challenge-category">{challenge.category}</div>
                                <div className={`challenge-difficulty ${getDifficultyClass(challenge.difficulty)}`}>
                                    {challenge.difficulty}
                                </div>
                            </div>

                            <h3 className="challenge-name">{challenge.name}</h3>

                            <div className="challenge-footer">
                                <div className="challenge-points">
                                    <Zap size={14} />
                                    {challenge.points} pts
                                </div>
                                <div className="challenge-solves">
                                    {challenge.solveCount} solves
                                </div>
                                {challenge.solved ? (
                                    <CheckCircle size={18} className="solved-icon" />
                                ) : (
                                    <ArrowRight size={18} className="arrow-icon" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Challenge Detail Modal */}
            {selectedChallenge && (
                <div className="challenge-modal-overlay" onClick={() => setSelectedChallenge(null)}>
                    <div className="challenge-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedChallenge(null)}>
                            <X size={20} />
                        </button>

                        <div className="modal-header">
                            <div className="modal-category">{selectedChallenge.category}</div>
                            <div className={`modal-difficulty ${getDifficultyClass(selectedChallenge.difficulty)}`}>
                                {selectedChallenge.difficulty}
                            </div>
                            {selectedChallenge.solved && (
                                <div className="modal-solved">
                                    <CheckCircle size={16} />
                                    Résolu
                                </div>
                            )}
                        </div>

                        <h2 className="modal-title">{selectedChallenge.name}</h2>

                        <div className="modal-meta">
                            <span><Zap size={14} /> {selectedChallenge.points} points</span>
                            <span><Flag size={14} /> {selectedChallenge.solveCount} solves</span>
                            <span>Par {selectedChallenge.author}</span>
                        </div>

                        <div className="modal-description">
                            <h4>Description</h4>
                            <p>{selectedChallenge.description}</p>
                        </div>

                        <div className="modal-hint">
                            <h4>Indice</h4>
                            <p>{selectedChallenge.hint}</p>
                        </div>

                        {!selectedChallenge.solved && (
                            <div className="modal-submit">
                                <h4>Soumettre le Flag</h4>
                                <div className={`flag-input-group ${flagStatus || ''}`}>
                                    <input
                                        type="text"
                                        placeholder="STANLEY{...}"
                                        value={flagInput}
                                        onChange={(e) => setFlagInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSubmitFlag()}
                                    />
                                    <button className="submit-flag-btn" onClick={handleSubmitFlag}>
                                        <Send size={18} />
                                    </button>
                                </div>
                                {flagStatus === 'success' && (
                                    <p className="flag-feedback success">Flag correct ! Challenge validé.</p>
                                )}
                                {flagStatus === 'error' && (
                                    <p className="flag-feedback error">Flag incorrect. Réessayez.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Challenges
