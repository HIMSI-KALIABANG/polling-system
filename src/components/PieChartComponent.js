import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = ({ candidates }) => {
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
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChartComponent;
