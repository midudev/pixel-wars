import { COLORS } from "./constants.ts";

export type Color = typeof COLORS[number];

export interface Grid {
  tiles: Color[];
  versionstamps: string[];
}
