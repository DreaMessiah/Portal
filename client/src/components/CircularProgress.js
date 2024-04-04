import React from 'react';

const CircularProgress = ({color="#e6e6e6", progress }) => {
    const radius = 7;
    const circumference = 2 * Math.PI * radius;
    const strokeWidth = 2;
    const center = radius + strokeWidth / 2;
    const progressValue = (1 - progress) * circumference;

    return (
        <svg width={radius * 2 + strokeWidth} height={radius * 2 + strokeWidth}>
            <circle
                r={radius}
                cx={center}
                cy={center}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
            />
            <circle
                r={radius}
                cx={center}
                cy={center}
                fill="none"
                stroke="#007bff"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={progressValue}
                strokeLinecap="round"
                transform={`rotate(-90 ${center} ${center})`}
            />
        </svg>
    );
};

export default CircularProgress;