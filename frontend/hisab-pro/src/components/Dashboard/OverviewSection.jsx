import React from 'react';
import CustomPieChart from '../Charts/CustomPieChart';

const OverviewSection = ({ stocked30Days, sold30Days, currentStock }) => {
  const chartData = [
    { name: 'Stocked (30d)', value: stocked30Days },
    { name: 'Sold (30d)', value: sold30Days },
    { name: 'Remaining Inventory', value: currentStock },
  ];

  return (
    <div className="card p-4">
      <h2 className="text-lg">Inventory Overview</h2>
      <CustomPieChart data={chartData} />
    </div>
  );
};

export default OverviewSection;
