import { ColorPicker } from "../components/ColorPicker.tsx";
import { Tiles } from "../components/Tiles.tsx";
import { COLORS } from "../shared/constants.ts";
import type { Color, Grid } from "../shared/types.ts";
import { useSignal } from "@preact/signals";

export function Game(
  { initialGrid }: { initialGrid: Grid },
) {
  const selected = useSignal<Color>(COLORS[0]);
  const grid = useSignal<Grid>(initialGrid);

  return (
    <>
      <Tiles grid={grid} selectedColor={selected.value} />
      <ColorPicker selected={selected} />
    </>
  );
}
