import React from "react";
import { cn } from "~/utils";
import Player, { PlayerProps } from "./Player";

interface TileProps {
  index: number;
  className?: string;
  isCorner?: boolean;
  onClick?: () => void;
  players?: PlayerProps[];
}

const Tile: React.FC<TileProps> = ({
  index,
  className,
  isCorner = false,
  onClick,
  players = [],
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

      {/* Display players */}
      {players.length > 0 && (
        <div
          className={cn(
            "absolute flex flex-wrap gap-1.5 justify-center items-center",
            players.length === 1
              ? "inset-0"
              : players.length <= 4
              ? "inset-1"
              : "inset-0.5 gap-1"
          )}
        >
          {players.map((player) => (
            <Player
              key={player.id}
              id={player.id}
              name={player.name}
              className={cn(
                players.length === 1
                  ? "w-10 h-10"
                  : players.length <= 4
                  ? "w-8 h-8"
                  : "w-6 h-6"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tile;
