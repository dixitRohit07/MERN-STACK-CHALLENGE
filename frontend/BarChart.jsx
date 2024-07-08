// BarChart.jsx

import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.range),
    datasets: [
      {
        label: 'Number of Items',
        data: data.map(item => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className="bar-chart">
      <h3>Transactions Price Range</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default BarChart;