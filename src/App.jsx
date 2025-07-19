import { useState } from "react";
import PuzzlePanel from "./components/PuzzlePanel";
import levels from "./data/levels";

function App() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [showPanel, setShowPanel] = useState(true);

  const handleMatch = () => {
    setShowPanel(false); // trigger panel slide-out
    setTimeout(() => {
      setLevelIndex((prev) => prev + 1);
      setShowPanel(true); // fade/slide new one in
    }, 1000); // match this with exit animation duration
  };

  const level = levels[levelIndex];
  if (!level) return <h1 className="center">🎉 You did it!</h1>;

  return (
    <>
      {showPanel && (
        <PuzzlePanel key={level.id} level={level} onMatch={handleMatch} />
      )}
    </>
  );
}

export default App;
