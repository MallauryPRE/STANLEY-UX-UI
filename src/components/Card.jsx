import './Card.css'

function Card({ title, children, className = '', icon: Icon }) {
    return (
        <div className={`card-component ${className}`}>
            {(title || Icon) && (
                <div className="card-header">
                    {Icon && <Icon size={20} className="card-icon" />}
                    {title && <h3 className="card-title">{title}</h3>}
                </div>
            )}
            <div className="card-body">
                {children}
            </div>
        </div>
    )
}

export default Card
