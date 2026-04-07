import { TrendingUp, TrendingDown } from 'lucide-react'
import './StatCard.css'

function StatCard({ label, value, trend, trendValue, icon: Icon }) {
    const isPositive = trend === 'up'

    return (
        <div className="stat-card">
            <div className="stat-header">
                <span className="stat-label">{label}</span>
                {Icon && <Icon size={18} className="stat-icon" />}
            </div>
            <div className="stat-value">{value}</div>
            {trendValue && (
                <div className={`stat-trend ${isPositive ? 'positive' : 'negative'}`}>
                    {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    <span>{trendValue}</span>
                </div>
            )}
        </div>
    )
}

export default StatCard
