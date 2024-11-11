import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface AttendanceChartProps {
  attendance: {
    percentage: number;
    attended: number;
    total: number;
  };
}

export default function AttendanceChart({ attendance }: AttendanceChartProps) {
  const data = [
    { name: 'Present', value: attendance.attended },
    { name: 'Absent', value: attendance.total - attendance.attended },
  ];

  const COLORS = ['#3b82f6', '#ef4444'];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-sm text-gray-600">Total Classes: {attendance.total}</p>
        <p className="text-sm text-gray-600">Classes Attended: {attendance.attended}</p>
      </div>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}