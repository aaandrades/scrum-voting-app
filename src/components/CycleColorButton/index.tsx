import { useState } from "react";

interface CycleColorButtonProps {
  colors?: string[];
  label?: string;
  className?: string;
}

const defaultColors = [
  "var(--main-btn)",
  "var(--main-btn-hover)",
  "var(--bg-300)"
];

export default function CycleColorButton({
  colors = defaultColors,
  label = "Click to change color",
  className = ""
}: CycleColorButtonProps) {
  const [index, setIndex] = useState(0);

  const handleClick = () => {
    setIndex((i) => (i + 1) % colors.length);
  };

  return (
    <button
      type="button"
      className={`button-container ${className}`.trim()}
      style={{ backgroundColor: colors[index] }}
      onClick={handleClick}
      aria-label="Cycle button color"
    >
      {label}
    </button>
  );
}
