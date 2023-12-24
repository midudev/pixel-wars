import { Signal } from "@preact/signals";
import { PIXEL_SIZE, WIDTH } from "../shared/constants.ts";
import type { Color, Grid } from "../shared/types.ts";
import { useEffect } from "preact/hooks";

export function Tiles({
  grid,
  selectedColor,
}: {
  grid: Signal<Grid>;
  selectedColor: Color;
}) {
  useEffect(() => {
    const eventSource = new EventSource("/api/listen");

    eventSource.onmessage = (event) => {
      const { index, color } = JSON.parse(event.data);
      const gridValue = grid.value.tiles;
      const gridTimestamps = grid.value.versionstamps;
      grid.value = {
        tiles: gridValue.with(index, color),
        versionstamps: gridTimestamps,
      }
    };

    return () => eventSource.close();
  }, []);

  const updateGrid = async (index: number, selectedColor: Color) => {
    const response = await fetch("/api/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ index, color: selectedColor }),
    });

    if (!response.ok) {
      console.error("Failed to update grid");
      return;
    }

    const gridValue = grid.value.tiles;
    const gridTimestamps = grid.value.versionstamps;

    const { versionstamp } = await response.json();

    // TODO: only update if versionstamp is newer

    grid.value = {
      tiles: gridValue.with(index, selectedColor),
      versionstamps: gridTimestamps.with(index, versionstamp),
    };
  };

  return (
    <div
      className="grid"
      style={`
        width: ${WIDTH * PIXEL_SIZE}px;
        grid-template-columns: repeat(${WIDTH}, 1fr);
      `}
    >
      {grid.value.tiles.map((color, index) => (
        <div
          style={{
            width: PIXEL_SIZE,
            height: PIXEL_SIZE,
            backgroundColor: color,
          }}
          onClick={() => {
            updateGrid(index, selectedColor);
          }}
        >
        </div>
      ))}
    </div>
  );
}
