"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { usePreferences, Color } from "@/lib/hooks/usePreferences";

type ColorSelectionProps = {
  colors: Color[];
  onColorChange?: (color: Color) => void;
};

const ColorSelection = ({ colors, onColorChange }: ColorSelectionProps) => {
  const { selectedColor, setSelectedColor } = usePreferences();

  const handleColorSelect = (color: Color) => {
    setSelectedColor(color);
    onColorChange?.(color);
  };

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-medium">Couleur</h3>
      <div className="flex gap-2">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => handleColorSelect(color)}
            className={cn(
              "w-8 h-8 rounded-full border-2 transition-all",
              color.code,
              selectedColor.name === color.name
                ? "border-black scale-110"
                : "border-gray-300 hover:border-gray-400"
            )}
            title={color.name}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorSelection;
