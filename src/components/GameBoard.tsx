"use client";

import React, {
  useMemo,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import Tile from "./Tile";
import { PlayerProps } from "./Player";
import { KeyButton } from "./KeyButton";
import SituationCard, { SituationData } from "./SituationCard";
import { generateSituationData } from "../data/situationData";

interface GameBoardProps {
  size?: number;
}

const renderBoard = (size: number) => {
  // Create an array of tile positions and properties
  const tilePositions = [];
  let tileIndex = 1;
  const totalTiles = size * 4 - 4; // Total tiles around the board

  // Top row: left to right
  for (let i = 0; i < size; i++) {
    tilePositions.push({
      position: { row: 1, col: i + 1 },
      index: tileIndex++,
      isCorner: i === 0 || i === size - 1,
    });
  }

  // Right column: top to bottom (excluding corners)
  for (let i = 1; i < size - 1; i++) {
    tilePositions.push({
      position: { row: i + 1, col: size },
      index: tileIndex++,
      isCorner: false,
    });
  }

  // Bottom row: right to left
  for (let i = size - 1; i >= 0; i--) {
    tilePositions.push({
      position: { row: size, col: i + 1 },
      index: tileIndex++,
      isCorner: i === 0 || i === size - 1,
    });
  }

  // Left column: bottom to top (excluding corners)
  for (let i = size - 2; i > 0; i--) {
    tilePositions.push({
      position: { row: i + 1, col: 1 },
      index: tileIndex++,
      isCorner: false,
    });
  }

  return { tilePositions, totalTiles };
};

const GameBoard: React.FC<GameBoardProps> = ({ size = 10 }) => {
  // Sample players with vibrant colors
  const [players] = useState<PlayerProps[]>([{ id: "p1", name: "Player 1" }]);

  // Track player positions
  const [playerPositions, setPlayerPositions] = useState<
    Record<string, number>
  >({ p1: 1 });

  // Dice state
  const [status, setStatus] = useState<"idle" | "rolling" | "direction">(
    "idle"
  );
  const [diceValue, setDiceValue] = useState<number | null>(null);

  const { tilePositions, totalTiles } = useMemo(
    () => renderBoard(size),
    [size]
  );

  // Tile refs for positioning animations
  const tileRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Situation cards state
  const [situations, setSituations] = useState<Record<number, SituationData>>(
    {}
  );
  const [activeSituation, setActiveSituation] = useState<SituationData | null>(
    null
  );
  const [activeTilePosition, setActiveTilePosition] = useState<
    { x: number; y: number } | undefined
  >(undefined);
  const [activeTileIndex, setActiveTileIndex] = useState<number | null>(null);

  // Initialize situation data
  useEffect(() => {
    const situationData = generateSituationData(totalTiles);
    setSituations(situationData);
  }, [totalTiles]);

  // Calculate tile position for animation
  const calculateTilePosition = useCallback((tileIndex: number) => {
    const tileElement = tileRefs.current[tileIndex];
    if (!tileElement) return undefined;

    const rect = tileElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate position relative to the viewport center
    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;

    return {
      x: centerX - viewportCenterX,
      y: centerY - viewportCenterY,
    };
  }, []);

  // Show situation card for a specific tile
  const showSituationCard = useCallback(
    (tileIndex: number) => {
      const tilePosition = calculateTilePosition(tileIndex);
      setActiveTilePosition(tilePosition);
      setActiveSituation(situations[tileIndex] || null);
      setActiveTileIndex(tileIndex);
    },
    [situations, calculateTilePosition]
  );

  // Close situation card
  const closeSituationCard = useCallback(() => {
    setActiveSituation(null);
    setActiveTileIndex(null);
  }, []);

  // Get players at a specific tile index
  const getPlayersAtTile = (tileIndex: number): PlayerProps[] => {
    return players.filter((player) => playerPositions[player.id] === tileIndex);
  };

  const rollDice = () => {
    if (status !== "idle") return;

    setStatus("rolling");

    // Animation effect
    const rollInterval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
    }, 60);

    setTimeout(() => {
      clearInterval(rollInterval);
      const finalValue = Math.floor(Math.random() * 6) + 1;
      setDiceValue(finalValue);
      setStatus("direction");
    }, 1000);
  };

  const movePlayer = useCallback(
    (direction: "left" | "right") => {
      if (!diceValue) return;

      if (status !== "direction") return;

      setPlayerPositions((prev) => {
        const currentPosition = prev.p1;
        let newPosition;

        if (direction === "right") {
          // Move clockwise
          newPosition = (currentPosition + diceValue) % totalTiles;
          if (newPosition === 0) newPosition = totalTiles;
        } else {
          // Move counter-clockwise
          newPosition = (currentPosition - diceValue) % totalTiles;
          if (newPosition <= 0) newPosition = totalTiles + newPosition;
        }

        // Show situation card after moving
        setTimeout(() => {
          showSituationCard(newPosition);
        }, 500);

        return { ...prev, p1: newPosition };
      });

      setStatus("idle");
      setDiceValue(null);
    },
    [diceValue, totalTiles, status, showSituationCard]
  );

  const handleTileClick = useCallback(
    (tileIndex: number) => {
      showSituationCard(tileIndex);
    },
    [showSituationCard]
  );

  const board = useMemo(() => {
    // Map tile positions to JSX elements
    return tilePositions.map(({ position, index, isCorner }) => (
      <div
        key={`tile-${index}`}
        style={{ gridRow: position.row, gridColumn: position.col }}
        ref={(el) => {
          tileRefs.current[index] = el;
        }}
      >
        <Tile
          index={index}
          isCorner={isCorner}
          onClick={() => handleTileClick(index)}
          players={getPlayersAtTile(index)}
          hasSituation={!!situations[index]}
          activeTile={activeTileIndex === index}
        />
      </div>
    ));
  }, [
    tilePositions,
    playerPositions,
    situations,
    activeTileIndex,
    handleTileClick,
  ]);

  const controlPanel = useMemo(() => {
    switch (status) {
      case "idle":
        return (
          <div className="text-neutral-600  text-xs  ">
            Press
            <KeyButton
              onClick={rollDice}
              keyCode="Space"
              className="inline-block mx-1"
            >
              SPACE
            </KeyButton>
            to roll dice
          </div>
        );

      case "rolling":
        return (
          <div className=" text-sm flex gap-1 items-center">
            You rolled a {diceValue}
            <div className="animate-[spin_0.6s_ease-in-out_infinite] w-6 h-6 flex items-center justify-center ">
              {["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"][Math.floor(Math.random() * 6)]}
            </div>
          </div>
        );

      case "direction":
        return (
          <div className="flex flex-col items-center">
            <div className="text-sm mb-2">You rolled a {diceValue}!</div>
            <div className="flex gap-3">
              <KeyButton
                onClick={() => movePlayer("left")}
                keyCode={["ArrowLeft", "KeyA"]}
                className="pl-1.5"
              >
                <span className="text-sm leading-none">←</span> Left
              </KeyButton>
              <KeyButton
                onClick={() => movePlayer("right")}
                keyCode={["ArrowRight", "KeyD"]}
                className="pr-1.5"
              >
                Right <span className="text-sm leading-none">→</span>
              </KeyButton>
            </div>
          </div>
        );
    }
  }, [diceValue, status]);

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div
        className="grid p-8 bg-gray-100 border border-neutral-300 relative"
        style={{
          gridTemplateRows: `repeat(${size}, minmax(0, 1fr))`,
          gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
        }}
      >
        {board}
        <div className="absolute inset-[70px] flex flex-col items-center justify-center">
          {controlPanel}
        </div>
      </div>

      {/* Situation Card Portal */}
      <SituationCard
        situation={activeSituation}
        onClose={closeSituationCard}
        tilePosition={activeTilePosition}
      />
    </div>
  );
};

export default GameBoard;
