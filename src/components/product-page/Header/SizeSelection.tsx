"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { usePreferences } from "@/lib/hooks/usePreferences";

type SizeSelectionProps = {
  sizes: string[];
  onSizeChange?: (size: string) => void;
};

const SizeSelection = ({ sizes, onSizeChange }: SizeSelectionProps) => {
  const { selectedSize, setSelectedSize } = usePreferences();

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    onSizeChange?.(size);
  };

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-medium">Taille</h3>
      <div className="flex gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => handleSizeSelect(size)}
            className={cn(
              "px-4 py-2 border rounded-md transition-all text-sm",
              selectedSize === size
                ? "border-black bg-black text-white"
                : "border-gray-300 hover:border-gray-400"
            )}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelection;
