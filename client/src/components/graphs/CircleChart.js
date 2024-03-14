
import React from 'react';

const CircleChart = ({ values }) => {
    const COLORS = {
        '1': 'rgba(18,19,56,1)',
        '2': 'rgba(11,14,162,0.8)',
        '3': 'rgba(0,2,108,0.6)',
        '4': 'rgba(55,55,68,0.4)',
        '5': 'rgba(106,114,128,0.8)',
        '6': 'rgba(195,209,229,0.69)',
        '7': 'rgba(182,107,180,0.4)',
        '8': 'rgb(89,69,69)'
    }

    const total = Object.values(values).reduce((acc, curr) => acc + curr, 0);

    let startAngle = -90;
    const strokeWidth = 10;
    let gap = 5; // Отступ между секторами
    const radius = 100; // Радиус круга

    if(Object.keys(values).length === 1 ) {
        gap = 0
        values = {A:99.99,B:0.01}
    }

    const sectors = Object.entries(values).map(([key, value], index) => {
        const percentage = (value / total) * 100;
        const angle = (percentage * 360) / 100 - gap;

        const startAngleRad = (startAngle * Math.PI) / 180;
        const endAngleRad = ((startAngle + angle) * Math.PI) / 180;

        const startOuter = {
            x: radius * Math.cos(startAngleRad) + radius,
            y: radius * Math.sin(startAngleRad) + radius
        }

        const endOuter = {
            x: radius * Math.cos(endAngleRad) + radius,
            y: radius * Math.sin(endAngleRad) + radius
        }

        const startInner = {
            x: (radius - strokeWidth) * Math.cos(startAngleRad) + radius,
            y: (radius - strokeWidth) * Math.sin(startAngleRad) + radius
        }

        const endInner = {
            x: (radius - strokeWidth) * Math.cos(endAngleRad) + radius,
            y: (radius - strokeWidth) * Math.sin(endAngleRad) + radius
        }

        const largeArcFlag = angle > 180 ? 1 : 0;

        const pathData = `
      M ${startOuter.x} ${startOuter.y}
      A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endOuter.x} ${endOuter.y}
      L ${endInner.x} ${endInner.y}
      A ${radius - strokeWidth} ${radius - strokeWidth} 0 ${largeArcFlag} 0 ${startInner.x} ${startInner.y}
      Z
    `;

        // Увеличиваем startAngle на угол предыдущего сектора плюс отступ
        startAngle += angle + gap;

        return (
            <path
                key={key}
                d={pathData}
                fill={COLORS[index + 1]}
                stroke="none"
            />
        );
    });

    return (
        <svg className='circle' width="200" height="200">
            {sectors}
        </svg>
    );
};

export default CircleChart;