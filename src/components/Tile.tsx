import React from "react";
import { cn } from "~/utils";

interface TileProps {
  index: number;
  className?: string;
  isCorner?: boolean;
  onClick?: () => void;
}

const Tile: React.FC<TileProps> = ({
  index,
  className,
  isCorner = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        className,
        isCorner ? "bg-gray-50" : "bg-white",
        "w-20 h-20",
        `m-0.5
        border border-neutral-300
        text-neutral-800
        font-mono
        shadow-[inset_0_1px_0_rgba(255,255,255,1),_1px_1px_0_rgba(0,0,0,0.1)]
        hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.8),_0px_0px_0_rgba(0,0,0,0.05)]
        hover:translate-y-[1px]
        hover:brightness-95
        transition-all
        duration-100
        flex
        items-center
        justify-center
        cursor-pointer
        select-none
        relative
        text-xs
      `
      )}
    >
      <span className="absolute top-1 left-1 text-neutral-400 text-[10px]">
        {index}
      </span>
      {isCorner && (
        <div className="text-center text-[10px] text-neutral-600">
          {index === 1
            ? "START"
            : index === 10
            ? "JAIL"
            : index === 20
            ? "FREE"
            : "END"}
        </div>
      )}
    </div>
  );
};

export default Tile;
