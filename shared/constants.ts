export const WIDTH = 64;
export const HEIGHT = 64;

export const PIXEL_SIZE = 32;

export const COLORS_NAMES = {
  red: "#FF0000",
  green: "#00FF00",
  blue: "#0000FF",
  yellow: "#FFFF00",
  brightBlue: "#00FFFF",
  pink: "#FF00FF",
  white: "#FFFFFF",
  black: "#000000",
} as const;

export const COLORS = Object.values(COLORS_NAMES);

export const KEYS = {
  tiles: "tiles",
} as const;

export const CHANNELS = {
  PIXEL_UPDATE: "pixel-update",
};

export const COLORS_KEYBOARD_MAP = {
  Digit1: COLORS_NAMES.red,
  Digit2: COLORS_NAMES.green,
  Digit3: COLORS_NAMES.blue,
  Digit4: COLORS_NAMES.yellow,
  Digit5: COLORS_NAMES.brightBlue,
  Digit6: COLORS_NAMES.pink,
  Digit7: COLORS_NAMES.white,
  Digit8: COLORS_NAMES.black,
};
