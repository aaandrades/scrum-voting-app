import { useMemo, useState } from "react";
import "./styles.css";

const COLORS = [
  "#2563eb", // main blue
  "#0d6e6e", // primary-100
  "#4a9d9c", // primary-200
  "#afffff", // primary-300
  "#ff3d3d", // accent-100
  "#ffe0c8", // accent-200
  "#1d2e3d", // bg-200
  "#354656"  // bg-300
];

function getContrastColor(hex: string) {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16) / 255;
  const g = parseInt(c.substring(2, 4), 16) / 255;
  const b = parseInt(c.substring(4, 6), 16) / 255;

  const [R, G, B] = [r, g, b].map((v) => {
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  const luminance = 0.2126 * R + 0.7152 * G + 0.0722 * B;
  return luminance > 0.5 ? "#000000" : "#ffffff";
}

const ColorCycleButton = () => {
  const [index, setIndex] = useState(0);
  const bg = COLORS[index];
  const fg = useMemo(() => getContrastColor(bg), [bg]);

  return (
    <button
      type="button"
      className="color-cycle-btn"
      style={{ backgroundColor: bg, color: fg }}
      onClick={() => setIndex((i) => (i + 1) % COLORS.length)}
      aria-label="Change button color"
      title="Change color"
    >
      Change color
    </button>
  );
};

export default ColorCycleButton;
