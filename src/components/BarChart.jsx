import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

function BarChart({ data, labels, title }) {
    const chartData = {
        labels,
        datasets: [{
            label: title || 'Data',
            data,
            backgroundColor: data.map((_, i) => {
                const colors = [
                    'rgba(255, 255, 255, 0.8)',
                    'rgba(255, 255, 255, 0.6)',
                    'rgba(255, 255, 255, 0.5)',
                    'rgba(255, 255, 255, 0.4)',
                    'rgba(255, 255, 255, 0.3)',
                ]
                return colors[i % colors.length]
            }),
            borderRadius: 6,
            borderSkipped: false,
        }]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: '#1a1a1f',
                titleColor: '#ffffff',
                bodyColor: '#8b8b8d',
                borderColor: '#2a2a2f',
                borderWidth: 1,
                padding: 12,
                cornerRadius: 8,
                titleFont: {
                    family: 'Inter',
                    size: 14,
                    weight: '600',
                },
                bodyFont: {
                    family: 'Inter',
                    size: 12,
                },
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#8b8b8d',
                    font: {
                        family: 'Inter',
                        size: 11,
                    }
                }
            },
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)',
                    drawBorder: false,
                },
                ticks: {
                    color: '#5a5a5c',
                    font: {
                        family: 'Inter',
                        size: 11,
                    }
                }
            }
        }
    }

    return (
        <div style={{ width: '100%', height: '100%', minHeight: '200px' }}>
            <Bar data={chartData} options={options} />
        </div>
    )
}

export default BarChart
