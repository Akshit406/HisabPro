
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell,
} from 'recharts';

const COLORS = ['#4F46E5', '#16A34A', '#F97316', '#3B82F6', '#EF4444', '#8B5CF6', '#10B981'];

const HorizontalBarChart = ({ data }) => {
  return (
    <div className="w-full  h-80">
      <ResponsiveContainer>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="_id" type="category" />
          <Tooltip />
          <Bar dataKey="totalQuantitySold" fill="#8884d8">
            {data?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HorizontalBarChart;
