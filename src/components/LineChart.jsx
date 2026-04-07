import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

function LineChart({ data, labels, title, showLegend = false }) {
    // Determine if data is multi-dataset (array of objects with label/data/color)
    // or single dataset (array of numbers)
    const isMultiDataset = data.length > 0 && typeof data[0] === 'object' && data[0].data !== undefined

    const chartData = {
        labels,
        datasets: isMultiDataset
            ? data.map((dataset, index) => ({
                label: dataset.label || `Dataset ${index + 1}`,
                data: dataset.data,
                borderColor: dataset.color || `hsl(${index * 60}, 70%, 70%)`,
                backgroundColor: dataset.color
                    ? `${dataset.color}20`
                    : `hsla(${index * 60}, 70%, 70%, 0.1)`,
                tension: 0.4,
                fill: false,
                borderWidth: 2,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: dataset.color || `hsl(${index * 60}, 70%, 70%)`,
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 2,
            }))
            : [{
                label: title || 'Data',
                data,
                borderColor: '#ffffff',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                tension: 0.4,
                fill: true,
                borderWidth: 2,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: '#ffffff',
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 2,
            }]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            legend: {
                display: showLegend,
                position: 'top',
                labels: {
                    color: '#8b8b8d',
                    font: {
                        family: 'Inter',
                        size: 12,
                    },
                    usePointStyle: true,
                    pointStyle: 'circle',
                }
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
            <Line data={chartData} options={options} />
        </div>
    )
}

export default LineChart
