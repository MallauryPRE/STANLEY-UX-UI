import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, User, Lock, ArrowRight } from 'lucide-react'
import './Login.css'

function Login() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate login
        setTimeout(() => {
            setIsLoading(false)
            navigate('/dashboard')
        }, 800)
    }

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <div className="login-logo">
                        <Shield size={48} />
                    </div>
                    <h1 className="login-title">CyberRange Stanley</h1>
                    <p className="login-subtitle">Plateforme de compétition CTF</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="username">
                            <User size={16} />
                            Nom d'utilisateur
                        </label>
                        <input
                            id="username"
                            type="text"
                            className="form-input"
                            placeholder="Entrez votre nom d'utilisateur"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="password">
                            <Lock size={16} />
                            Mot de passe
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="form-input"
                            placeholder="Entrez votre mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`login-btn ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="loader"></span>
                        ) : (
                            <>
                                Se connecter
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                <div className="login-footer">
                    <p>Propulsé par CTFd</p>
                </div>
            </div>

            <div className="login-decoration">
                <div className="decoration-grid"></div>
            </div>
        </div>
    )
}

export default Login
