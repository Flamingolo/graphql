<<<<<<< HEAD
import React, { useState, useRef, useCallback, useEffect } from "react";
import "../css/chart.css";
import Tooltip from "./Tooltip";
import convertToReadableUnit from "./convert";
=======
import React, { useState, useRef } from "react";
import "../css/chart.css";
import Tooltip from "./Tooltip";
>>>>>>> myrepo/main

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
<<<<<<< HEAD
  const [dimensions, setDimensions] = useState({ width: 0, height: 75 });

  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      setDimensions({ width, height: 100 });
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  const maxValue = Math.max(...data.map(d => parseFloat(d.amount)));
  const svgHeight = dimensions.height;
  const totalBars = data.length;
  const maxBarWidth = 8;
  const minBarWidth = 3;
  const barWidth = Math.max(minBarWidth, Math.min(maxBarWidth, dimensions.width / (totalBars * 1.5))); // min width
  const barSpacing = Math.max(minBarWidth, barWidth * 0.5);
  const svgWidth = totalBars * (barWidth + barSpacing); // Total width of the chart
=======

  const maxValue = Math.max(...data.map(d => parseFloat(d.amount)));
  const svgHeight = 100; // Height in percentage
  const barWidth = 8; // Bar width in pixels
  const barSpacing = 5; // Spacing between bars in pixels
  const svgWidth = data.length * (barWidth + barSpacing) - barSpacing + 10; // Total width of the chart
>>>>>>> myrepo/main

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
<<<<<<< HEAD
  

  return (
    <div className="chart-container" ref={containerRef} style={{ width: '100%', position: "relative", overflow: "hidden" }}>
=======

  return (
    <div className="chart-container" ref={containerRef} style={{ width: svgWidth, position: "relative", overflow: "hidden" }}>
>>>>>>> myrepo/main
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
<<<<<<< HEAD
          {convertToReadableUnit(parseFloat(data[hoveredBar].amount))}
=======
          {data[hoveredBar].amount}
>>>>>>> myrepo/main
        </Tooltip>
      )}
    </div>
  );
};

<<<<<<< HEAD
export default Chart;
=======
export default Chart;
>>>>>>> myrepo/main
