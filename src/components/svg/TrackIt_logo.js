import * as React from "react";

const TrackItSVG = ({ width = 48, height = 48, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24" // Keep the original viewBox
    fill="none"
    stroke="#000000"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <g transform="translate(0, 0)">
      <line x1={16.5} y1={9.4} x2={7.5} y2={4.21} />
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1={12} y1={22.08} x2={12} y2={12} />
    </g>
  </svg>
);

export default TrackItSVG;
