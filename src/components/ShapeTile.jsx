import { useState } from "react";
import { motion } from "framer-motion";
import { playSound } from "../utils/sfx";

const shapeOptions = ["pill", "circle", "square"];

function ShapeTile({ initialShape = "pill", isInteractive = false, onChange }) {
  const [shape, setShape] = useState(initialShape);

  const handleClick = () => {
    if (!isInteractive) return;

    const nextIndex = (shapeOptions.indexOf(shape) + 1) % shapeOptions.length;
    const nextShape = shapeOptions[nextIndex];
    setShape(nextShape);
    playSound("/sounds/tap.mp3", 0.4);
    if (window.navigator.vibrate) navigator.vibrate(10);
    onChange?.(nextShape);
  };

  return (
    <div className="shape-tile" onClick={handleClick}>
      <div className={`shape-inner ${shape}`} />
    </div>
  );
}

export default ShapeTile;
