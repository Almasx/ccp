"use client";

import React from "react";
import Tile from "./Tile";

interface GameBoardProps {
  size?: number;
}

const GameBoard: React.FC<GameBoardProps> = ({ size = 10 }) => {
  const renderBoard = () => {
    const tiles = [];
    let tileIndex = 1;

    // Top row
    for (let i = 0; i < size; i++) {
      const isCorner = i === 0 || i === size - 1;
      tiles.push(
        <div key={`top-${i}`} style={{ gridRow: 1, gridColumn: i + 1 }}>
          <Tile
            index={tileIndex++}
            isCorner={isCorner}
            onClick={() => handleTileClick(tileIndex - 1)}
          />
        </div>
      );
    }

    // Right column
    for (let i = 1; i < size - 1; i++) {
      tiles.push(
        <div key={`right-${i}`} style={{ gridRow: i + 1, gridColumn: size }}>
          <Tile
            index={tileIndex++}
            onClick={() => handleTileClick(tileIndex - 1)}
          />
        </div>
      );
    }

    // Bottom row (reversed)
    for (let i = size - 1; i >= 0; i--) {
      const isCorner = i === 0 || i === size - 1;
      tiles.push(
        <div key={`bottom-${i}`} style={{ gridRow: size, gridColumn: i + 1 }}>
          <Tile
            index={tileIndex++}
            isCorner={isCorner}
            onClick={() => handleTileClick(tileIndex - 1)}
          />
        </div>
      );
    }

    // Left column (reversed)
    for (let i = size - 2; i > 0; i--) {
      tiles.push(
        <div key={`left-${i}`} style={{ gridRow: i + 1, gridColumn: 1 }}>
          <Tile
            index={tileIndex++}
            onClick={() => handleTileClick(tileIndex - 1)}
          />
        </div>
      );
    }

    return tiles;
  };

  const handleTileClick = (index: number) => {
    console.log(`Tile ${index} clicked`);
    // Add game logic here later
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div
        className="
          grid 
          bg-gray-100
          p-8
          border border-neutral-300

          relative
        "
        style={{
          gridTemplateRows: `repeat(${size}, minmax(0, 1fr))`,
          gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
        }}
      >
        {renderBoard()}
        <div className="absolute inset-[70px] flex items-center justify-center">
          <div className="text-neutral-600 font-mono text-sm text-center">
            <div className="text-xl mb-2 text-neutral-700">TERMINAL GAME</div>
            <div className="text-xs opacity-70">
              Use keyboard shortcuts to play
            </div>
            <div className="mt-4 text-xs">
              <span className="bg-white px-2 py-1 rounded border border-neutral-300">
                ↑
              </span>
              <span className="bg-white px-2 py-1 rounded border border-neutral-300 mx-1">
                ↓
              </span>
              <span className="bg-white px-2 py-1 rounded border border-neutral-300">
                →
              </span>
              <span className="bg-white px-2 py-1 rounded border border-neutral-300 ml-1">
                ←
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 text-neutral-600 font-mono text-xs">
        Press{" "}
        <span className="bg-white px-1 rounded border border-neutral-300">
          SPACE
        </span>{" "}
        to roll dice
      </div>
    </div>
  );
};

export default GameBoard;
