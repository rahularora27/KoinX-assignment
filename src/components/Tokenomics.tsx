'use client';

import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Tokenomics() {
  const data: ChartData<'doughnut'> = {
    labels: ['Crowdsale investors: 80%', 'Foundation: 20%'],
    datasets: [
      {
        data: [80, 20],
        backgroundColor: ['#0082FF', '#FFA500'],
        borderWidth: 0,
        spacing: 0,
      },
    ],
  };

  const options = {
    cutout: '65%',
    radius: '80%',
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 16,
            family: 'Inter',
          },
          color: '#1D1D1D',
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    maintainAspectRatio: false,
    hover: { mode: null as any },
    responsive: true,
  };

  return (
    <div className="hidden rounded-lg bg-white p-6 lg:block">
      <h2 className="mb-6 text-2xl font-semibold">Tokenomics</h2>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Initial Distribution</h3>

        {/* Chart Container */}
        <div className="my-8 h-[250px] w-full max-w-[640px]">
          <Doughnut data={data} options={options} />
        </div>

        {/* Description */}
        <p className="leading-7 text-[#3E424A]">
          Lorem ipsum dolor sit amet consectetur. Cras aliquet tristique ornare
          vestibulum nunc dignissim vel consequat. Leo etiam nascetur bibendum
          amet enim sit eget leo amet. At metus orci augue fusce eleifend lectus
          eu fusce adipiscing. Volutpat ultrices nibh sodales massa habitasse
          urna felis augue. Gravida aliquam fermentum augue eu. Imperdiet
          bibendum amet aliquam donec. Eget justo dui metus odio rutrum. Vel
          ipsum eget in at curabitur sem posuere facilisis vitae. Sed lorem sit
          mauris id eget arcu ut. Vulputate ipsum aliquet odio nisi eu ac risus.
        </p>
      </div>
    </div>
  );
}
