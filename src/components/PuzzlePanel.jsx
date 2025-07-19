import { useEffect, useState } from "react";
import ShapeTile from "./ShapeTile";
import { motion } from "framer-motion";
import { playSound } from "../utils/sfx";

const transition = {
  type: "spring",
  stiffness: 60,
  damping: 20,
  mass: 1.3,
};

function PuzzlePanel({ level, onMatch }) {
  const [currentConfig, setCurrentConfig] = useState(level.initial);
  const [matched, setMatched] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleShapeChange = (index, newShape) => {
    const updated = [...currentConfig];
    updated[index] = newShape;
    setCurrentConfig(updated);
  };

  const isMatch = currentConfig.every((shape, i) => shape === level.target[i]);

  console.log("target:", level.target);
  console.log("current:", currentConfig);

  useEffect(() => {
    if (isMatch) {
      playSound("/sounds/success.mp3");
      if (window.navigator.vibrate) {
        window.navigator.vibrate([30, 100, 30]);
      }

      setShowToast(true);

      // Show "Match!" message briefly, then slide panels
      setTimeout(() => {
        setMatched(true); // trigger split animation
        setShowToast(false);
      }, 1500); // how long toast is visible

      // Then trigger level change
      setTimeout(() => {
        onMatch();
      }, 2500); // match this with slide-out duration
    }
  }, [isMatch, onMatch]);

  return (
    <motion.div
      className="puzzle-panel"
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        position: "relative",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Match Toast */}
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          style={{
            position: "absolute",
            top: "5%",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#fff",
            color: "#d66",
            padding: "1rem 2rem",
            borderRadius: "1rem",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            fontSize: "2rem",
            fontWeight: "bold",
            zIndex: 10,
          }}
        >
          Match!
        </motion.div>
      )}

      {/* Left side */}
      <motion.div
        className="panel-column solution"
        animate={{ x: matched ? "-100vw" : 0 }}
        transition={transition}
      >
        <div className="shape-grid">
          {level.target.map((shape, i) => (
            <ShapeTile key={`target-${i}`} initialShape={shape} />
          ))}
        </div>
      </motion.div>

      {/* Right side */}
      <motion.div
        className="panel-column interactive"
        animate={{ x: matched ? "100vw" : 0 }}
        transition={transition}
      >
        <div className="shape-grid">
          {currentConfig.map((shape, i) => (
            <ShapeTile
              key={`user-${i}`}
              initialShape={shape}
              isInteractive={!matched}
              onChange={(newShape) => handleShapeChange(i, newShape)}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default PuzzlePanel;
