import { type Signal } from "@preact/signals";
import { COLORS, COLORS_KEYBOARD_MAP } from "../shared/constants.ts";
import { Color } from "../shared/types.ts";
import { useCallback, useEffect } from "preact/hooks";

export function ColorPicker({
  selected,
}: {
  selected: Signal<Color>;
}) {
  const shortcutsHandler = useCallback((e: KeyboardEvent) => {
    const { code } = e;
    selected.value =
      COLORS_KEYBOARD_MAP[code as keyof typeof COLORS_KEYBOARD_MAP] ||
      selected.value;
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", shortcutsHandler);
    return () => {
      document.removeEventListener("keydown", shortcutsHandler);
    };
  }, []);

  return (
    <footer class="flex gap-8">
      <div class="flex fixed bottom-4 justify-center left-0 right-0 gap-x-1">
        {COLORS.map((color, idx) => (
          <div class="relative flex items-center justify-center flex-col">
            <button
              class={`
              w-8 h-8 border-4
              ${selected.value === color ? "border-white" : "border-gray-800"}
              `}
              style={`background-color: ${color};`}
              onClick={() => {
                selected.value = color;
              }}
            />
            <span class="text-xs">{idx + 1}</span>
          </div>
        ))}
      </div>
    </footer>
  );
}
