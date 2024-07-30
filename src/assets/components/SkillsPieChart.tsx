import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Skill {
  name: string;
  value: number;
}

interface SkillsPieChartProps {
  skills: Skill[];
}

const RADIAN = Math.PI / 180;

interface CustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  name: string;
}

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}: CustomizedLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={percent > 0.05 ? '12px' : '10px'}
    >
      {percent > 0.05 ? `${name}: ${(percent * 100).toFixed(0)}%` : ''}
    </text>
  );
};

const formatTooltip = (value: number) => ` ${value.toFixed(2)}`;

const SkillsPieChart: React.FC<SkillsPieChartProps> = ({ skills }) => {
  const COLORS = skills.map(() => '#' + Math.floor(Math.random() * 16777215).toString(16));

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={skills}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {skills.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={formatTooltip} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillsPieChart;
