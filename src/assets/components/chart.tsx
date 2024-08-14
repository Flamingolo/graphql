import React, { useState, useRef } from "react";
import "../css/chart.css";
import Tooltip from "./Tooltip";

interface ChartData {
  amount: string;
  projectName: string;
  date: string;
}

interface ChartProps {
  data: ChartData[];
}

const Chart: React.FC<ChartProps> = ({ data }) => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ left: number; top: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const maxValue = Math.max(...data.map(d => parseFloat(d.amount)));
  const svgHeight = 100; // Height in percentage
  const barWidth = 8; // Bar width in pixels
  const barSpacing = 5; // Spacing between bars in pixels
  const svgWidth = data.length * (barWidth + barSpacing) - barSpacing + 10; // Total width of the chart

  const handleMouseEnter = (index: number, event: React.MouseEvent<SVGRectElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const left = rect.left + rect.width / 2;
    const top = rect.top; // Adjust as necessary for desired tooltip position

    setTooltipPos({ left, top });
    setHoveredBar(index);
  };

  const handleMouseLeave = () => {
    setHoveredBar(null);
    setTooltipPos(null);
  };

  return (
    <div className="chart-container" ref={containerRef} style={{ width: svgWidth, position: "relative", overflow: "hidden" }}>
      <svg className="chart" viewBox={`0 0 ${svgWidth} 100`} preserveAspectRatio="none">
        {data.map((entry, index) => {
          const barHeight = (parseFloat(entry.amount) / maxValue) * svgHeight;
          return (
            <rect
              key={index}
              x={index * (barWidth + barSpacing)}
              y={svgHeight - barHeight}
              width={barWidth}
              height={barHeight}
              rx="3"
              ry="3"
              className="bar"
              onMouseEnter={(event) => handleMouseEnter(index, event)}
              onMouseLeave={handleMouseLeave}
            />
          );
        })}
      </svg>
      {hoveredBar !== null && tooltipPos && (
        <Tooltip left={tooltipPos.left} top={tooltipPos.top}>
          <strong>{data[hoveredBar].projectName}</strong><br />
          {data[hoveredBar].date}<br />
          {data[hoveredBar].amount}
        </Tooltip>
      )}
    </div>
  );
};

export default Chart;
