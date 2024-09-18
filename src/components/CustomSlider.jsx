import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const CustomSliderWithTicks = ({ min, max, value, onChange, step = 1, tickCount = 10 }) => {
  const [sliderValue, setSliderValue] = useState(value);

  const handleSliderChange = (e) => {
    const newValue = Math.min(Math.max(min, e.target.value), max);
    setSliderValue(newValue);
    onChange(newValue);
  };

  // Generate an array for tick marks based on the number of divisions
  const ticks = Array.from({ length: tickCount + 1 }, (_, index) => min + (index * (max - min)) / tickCount);

  return (
    <div className="relative w-full">
      {/* Custom Slider with Ticks */}
      <div className="relative w-full h-2 bg-transparent backdrop-blur-sm rounded-lg">
        {/* The filled part of the slider */}
        <div
          className="absolute h-2 bg-purple-600 rounded-lg"
          style={{ width: `${((sliderValue - min) / (max - min)) * 100}%` }}
        ></div>

        {/* Tick marks */}
        <div className="absolute w-full flex justify-between h-4">
          {ticks.map((tick, index) => (
            <div key={index} className="relative flex justify-center">
              <div className="absolute h-2 w-px bg-gray-400 top-0"></div>
              <span className="absolute top-4 text-xs text-violet-500">{Math.round(tick)}</span>
            </div>
          ))}
        </div>

        {/* Invisible input range slider */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={sliderValue}
          onChange={handleSliderChange}
          className="absolute w-full h-full appearance-none cursor-pointer"
          style={{
            zIndex: 10, // Ensure the slider is above other elements
            opacity: 0, // Hide the default slider appearance
          }}
        />

        {/* Custom thumb */}
        <div
          className="absolute top-1 h-4 w-4 bg-purple-600 rounded-full transform -translate-y-1/2 cursor-pointer"
          style={{ left: `${((sliderValue - min) / (max - min)) * 100}%`, zIndex: 20 }}
        ></div>
      </div>
    </div>
  );
};

export default CustomSliderWithTicks;
