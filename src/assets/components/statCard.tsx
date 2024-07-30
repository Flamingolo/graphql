import React from 'react';
import "../css/statCard.css";

interface StatCardProps {
  className: string;
  title: string;
  info: string;
}

const StatCard: React.FC<StatCardProps> = ({ className, title, info }) => {
  return (
    <div className={`stat-card ${className}`}>
      <div className="stat-title">{title}</div>
      <div className="stat-info">{info}</div>
    </div>
  );
};

export default StatCard;