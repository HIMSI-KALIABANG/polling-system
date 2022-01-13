import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChartComponent = ({ candidates }) => {
  const labels = candidates.map((candidate) => candidate.name);
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Jumlah Suara Kandidat',
        data: candidates.map((candidate) => candidate.count),
        backgroundColor: ['rgb(62, 62, 62)', 'rgb(102, 102, 102)', 'rgb(122, 122, 122)'],
      },
    ],
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChartComponent;
