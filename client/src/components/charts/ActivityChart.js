import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const ActivityChart = ({ data, labels }) => {
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Активность',
                data: data,
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Время',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Активность',
                },
                beginAtZero: true,
            },
        },
    }

    return <Line data={chartData} options={options} />
};

export default ActivityChart;
