import React from "react";
import { cn } from "~/utils";
import Image from "next/image";

export interface PlayerProps {
  id: string;
  name?: string;
  className?: string;
}

const Player: React.FC<PlayerProps> = ({ id, name, className }) => {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center flex-col gap-1",
        className
      )}
      title={name || `Player ${id}`}
    >
      <Image
        src="/pfp.svg"
        alt={name || `Player ${id}`}
        width={24}
        height={24}
        className="object-cover"
      />
      <span className="text-[8px] font-medium whitespace-nowrap">{name}</span>
    </div>
  );
};

export default Player;
