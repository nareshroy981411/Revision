import React, { useState } from "react";

const ColorChangeWithCounter = () => {
  const [count, setCount] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState("skyblue");

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
    const hue = ((count + 4) * 10) % 360;
    const newBackgroundColor = `hsl(${hue}, 70%, 80%)`;
    setBackgroundColor(newBackgroundColor);
  };

  const handleDecrement = () => {
    if (count !== 0) {
      setCount((prevCount) => prevCount - 1);
      setCount((prevCount) => prevCount - 1);
      setCount((prevCount) => prevCount - 1);
      const hue = ((count - 3) * 10) % 360;
      const newBackgroundColor = `hsl(${hue}, 70%, 80%)`;
      setBackgroundColor(newBackgroundColor);
    } else {
      alert("Count cannot be less than zero!");
    }
  };

  return (
    <div style={{ backgroundColor }}>
      <h1>Counter: {count}</h1>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
      <h2>ColorChangeWithCounter</h2>
    </div>
  );
};

export default ColorChangeWithCounter;
