import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = [
  '#4F46E5', // Indigo
  '#16A34A', // Green
  '#F97316', // Orange
  '#EF4444', // Red
  '#3B82F6', // Blue
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#8B5CF6', // Violet
  '#EC4899', // Pink
  '#22D3EE', // Cyan
  '#A855F7', // Purple
  '#14B8A6', // Teal
];

const CustomLegend = ({ payload }) => (
  <ul className="text-sm space-y-1">
    {payload.map((entry, index) => (
      <li key={`item-${index}`} className="flex items-center space-x-2">
        <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: entry.color }} />
        <span>{entry.value}</span>
      </li>
    ))}
  </ul>
);

const CustomPieChart = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            
          >
            {data?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
       
            <Legend 
                content={<CustomLegend />}  
                wrapperStyle={{
                    bottom: '0px'
                }}
            />
        
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;
