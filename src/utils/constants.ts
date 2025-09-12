import "../style.scss";
import { getCssVar } from "./helpers";

export const FONT_FAMILY = "VT323";

export const MENU_CONFIG = {
  title: {
    text: "Infinity Bomb",
    fontSize: "32px",
    color: getCssVar("--text-color"),
    position: { xRatio: 0.5, yRatio: 0.1 },
  },
  button: {
    fontSize: "24px",
    color: getCssVar("--primary-text-light"),
    letterSpacing: 1,
    padding: { x: 20, y: 10 },
    position: { xRatio: 0.5, yRatio: 0.25 },
    spacing: 0.12,
    align: "center",
  },
};

export const GAME_CONFIG = {};
