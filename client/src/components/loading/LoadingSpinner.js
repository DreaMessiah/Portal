import React from 'react'
import './LoadingSpinner.scss'

const LoadingSpinner = () => {
    return (
        <div className="loading-spinner-overlay">
            <div className="loading-spinner-container">
                <div className="loading-spinner"></div>
                <div className="loading-spinner-text">Загрузка...</div>
            </div>
        </div>
    )
}

export default LoadingSpinner