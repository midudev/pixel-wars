import { ColorPicker } from "../components/ColorPicker.tsx";
import { Tiles } from "../components/Tiles.tsx";
import { COLORS } from "../shared/constants.ts";
import { Color, Grid as GridType } from "../shared/types.ts";
import { useSignal } from "@preact/signals";

export function Game(
  { initialTiles }: { initialTiles: Color[] },
) {
  const selected = useSignal<Color>(COLORS[0]);
  const grid = useSignal<Color[]>(initialTiles);

  return (
    <>
      <Tiles grid={grid} selectedColor={selected.value} />
      <ColorPicker selected={selected} />
    </>
  );
}
