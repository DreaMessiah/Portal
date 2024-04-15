import React from 'react';
import './radio.scss';

const RadioButton = ({ options, selectedOption, onChange }) => {
    return (
        <div className="radio-button-container">
            {options.map(option => (
                <label key={option.value} className="radio-button-label">
                    <input
                        type="radio"
                        value={option.value}
                        checked={selectedOption === option.value}
                        onChange={() => onChange(option.value)}
                    />
                    <span className="radio-button-text">{option.label}</span>
                </label>
            ))}
        </div>
    )
}

export default RadioButton;