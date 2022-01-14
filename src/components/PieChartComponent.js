import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = ({ candidates }) => {
  const labels = candidates.map((candidate) => candidate.name);
  const options = {
    responsive: true,
    maintainAspectRatio: true,
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Jumlah Suara Kandidat',
        data: candidates.map((candidate) => candidate.count),
        backgroundColor: ['rgba(0, 147, 255, 0.2)', 'rgba(0, 147, 200, 0.2)', 'rgba(0, 147, 150, 0.2)'],
      },
    ],
  };
  return (
    <div>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChartComponent;
