import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import './App.css'

ChartJS.register(ArcElement, Tooltip, Legend)

const App = () => {
  const data = {
    labels: ['Yes', 'No'],
    datasets: [
      {
        label: 'Yes || No',
        data: [50, 20],
        backgroundColor: ['green', 'grey'],
        borderColor: ['transparent'],
        hoverBorderColor: ['transparent']
      }
    ]
  }

  const options = {
    responsive: true,
    cutout: '80%',
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        yAlign: 'bottom',
        displayColors: false,
        callbacks: {
          label: function (tooltipItem, data, value) {
            const score = tooltipItem.dataset.data
            return `Risk Score: ${score}`
          }
        }
      }
    }
  }
  const optionsTwo = {
    responsive: true,
    cutout: '80%',
    rotation: 225,
    circumference: 270,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        yAlign: 'bottom',
        displayColors: false,
        callbacks: {
          label: function (tooltipItem, data, value) {
            const score = tooltipItem.dataset.data
            return `Risk Score: ${score}`
          }
        }
      }
    }
  }

  const textCenter = {
    id: 'textCenter',
    beforeDatasetsDraw(chart) {
      const { ctx, data } = chart
      const xCoor = chart.getDatasetMeta(0).data[0].x
      const yCoor = chart.getDatasetMeta(0).data[0].y
      const chartArea = chart.chartArea
      ctx.save()

      // Adjust font size based on chart width
      const fontSize = Math.min(50, chartArea.width / 10)
      const valueFontSize = Math.min(120, chartArea.width / 5)

      ctx.font = `${fontSize}px mulish`
      ctx.fillStyle = 'Black'
      ctx.textAlign = 'center'
      ctx.textBaseLine = 'middle'
      ctx.fillText('RISK SCORE', xCoor, yCoor - fontSize * 0.5)

      ctx.font = `${valueFontSize}px mulish`
      ctx.fillStyle = 'Green'
      ctx.fillText(data.datasets[0].data[0], xCoor, yCoor + valueFontSize * 0.6)
      ctx.restore()
    }
  }
  return (
    <div className='App'>
      <header className='App-header'>
        <div id='chart-wrapper'>
          <Doughnut data={data} options={options} plugins={[textCenter]} />
          <Doughnut data={data} options={optionsTwo} plugins={[textCenter]} />
        </div>
      </header>
    </div>
  )
}

export default App
