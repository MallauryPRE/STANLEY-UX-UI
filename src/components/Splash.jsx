import { useState, useEffect } from 'react'
import { Shield } from 'lucide-react'
import './Splash.css'

function Splash({ onComplete }) {
    const [phase, setPhase] = useState(0)

    useEffect(() => {
        // Phase 1: Shield appears
        const timer1 = setTimeout(() => setPhase(1), 300)
        // Phase 2: Text appears
        const timer2 = setTimeout(() => setPhase(2), 800)
        // Phase 3: Tagline appears
        const timer3 = setTimeout(() => setPhase(3), 1400)
        // Phase 4: Fade out
        const timer4 = setTimeout(() => setPhase(4), 2500)
        // Complete
        const timer5 = setTimeout(() => onComplete(), 3200)

        return () => {
            clearTimeout(timer1)
            clearTimeout(timer2)
            clearTimeout(timer3)
            clearTimeout(timer4)
            clearTimeout(timer5)
        }
    }, [onComplete])

    return (
        <div className={`splash-screen ${phase >= 4 ? 'fade-out' : ''}`}>
            <div className="splash-content">
                <div className={`splash-logo ${phase >= 1 ? 'visible' : ''}`}>
                    <div className="shield-container">
                        <Shield size={80} strokeWidth={1.5} />
                        <div className="shield-glow"></div>
                    </div>
                </div>

                <h1 className={`splash-title ${phase >= 2 ? 'visible' : ''}`}>
                    <span className="title-cyber">CYBER</span>
                    <span className="title-range">RANGE</span>
                    <span className="title-stanley">STANLEY</span>
                </h1>

                <p className={`splash-tagline ${phase >= 3 ? 'visible' : ''}`}>
                    Capture The Flag Platform
                </p>
            </div>

            <div className="splash-particles">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="particle" style={{
                        '--delay': `${Math.random() * 2}s`,
                        '--x': `${Math.random() * 100}%`,
                        '--duration': `${2 + Math.random() * 3}s`
                    }}></div>
                ))}
            </div>
        </div>
    )
}

export default Splash
