import { TOTAL_COLORS } from "../consts/noteColors.js";

export const getRandomColorIndex = () => {
  return Math.floor(
    Math.random() * TOTAL_COLORS
  );
}