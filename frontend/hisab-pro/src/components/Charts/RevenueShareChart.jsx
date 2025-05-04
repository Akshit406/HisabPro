import React from 'react';
import CustomPieChart from '../Charts/CustomPieChart';

const RevenueShareChart = ({ data }) => {
  const chartData = data?.map((item) => ({
    name: item._id,
    value: item.revenue
  }));

  return (
    <div className="card  p-4">
      <h2 className="text-lg mb-4">Revenue Share (Top 5)</h2>
      <CustomPieChart data={chartData} />
    </div>
  );
};

export default RevenueShareChart;
