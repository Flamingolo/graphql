import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface TooltipProps {
  left: number;
  top: number;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ left, top, children }) => {
  const [style, setStyle] = useState({ left, top });

  useEffect(() => {
    setStyle({
      left: left + window.scrollX,
      top: top + window.scrollY,
    });
  }, [left, top]);

  return ReactDOM.createPortal(
    <div className="tooltip" style={style}>
      {children}
    </div>,
    document.body
  );
};

export default Tooltip;
