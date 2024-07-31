import React from "react";

// define the props interface for the Controls component
interface ControlsProps {
  maxIterations: number;
  setMaxIterations: (value: number) => void;
  escapeRadius: number;
  setEscapeRadius: (value: number) => void;
  colorScale: number;
  setColorScale: (value: number) => void;
}

// controls component for adjusting fractal parameters
const Controls: React.FC<ControlsProps> = ({
  maxIterations,
  setMaxIterations,
  escapeRadius,
  setEscapeRadius,
  colorScale,
  setColorScale,
}) => {
  return (
    // container for controls, positioned absolutley with a semi-transparent background
    <div className="absolute top-0 left-0 p-4 bg-black bg-opacity-50 test-white">
      {/* control for max iterations */}
      <div>
        <label>Max Iterations: {maxIterations}</label>
        <input
          type="range"
          min="10"
          max="1000"
          value={maxIterations}
          onChange={(e) => setMaxIterations(Number(e.target.value))}
        />
      </div>

      {/* control for escape radius */}
      <div>
        <label>Esccape Radius: {escapeRadius.toFixed(2)}</label>
        <input
          type="range"
          min="2"
          max="10"
          step="0.1"
          value={escapeRadius}
          onChange={(e) => setEscapeRadius(Number(e.target.value))}
        />
      </div>

      {/* control for color scale */}
      <div>
        <label>Color Scale: {colorScale.toFixed(2)}</label>
        <input
          type="range"
          min="1"
          max="20"
          step="0.1"
          value={colorScale}
          onChange={(e) => setColorScale(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default Controls;
