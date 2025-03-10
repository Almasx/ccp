import React, { useEffect, useState } from "react";

interface KeyButtonProps {
  onClick: () => void;
  keyCode: string | string[];
  children: React.ReactNode;
  className?: string;
}

export const KeyButton: React.FC<KeyButtonProps> = ({
  onClick,
  keyCode,
  children,
  className = "",
}) => {
  const [isPressed, setIsPressed] = useState(false);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (Array.isArray(keyCode)) {
        if (keyCode.includes(e.code)) {
          setIsPressed(true);
        }
      } else if (e.code === keyCode) {
        setIsPressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (Array.isArray(keyCode)) {
        if (keyCode.includes(e.code)) {
          setIsPressed(false);
          onClick();
        }
      } else if (e.code === keyCode) {
        setIsPressed(false);
        onClick();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [keyCode, onClick]);

  // Handle mouse events
  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleMouseLeave = () => {
    if (isPressed) {
      setIsPressed(false);
    }
  };

  return (
    <button
      className={`
        flex items-center gap-1 
        bg-white 
        shadow-[0px_1px_0_var(--color-neutral-300)] 
        px-1 py-0.5 
        text-xs 
        rounded 
        border border-neutral-300 
        hover:bg-gray-50 
        transition-colors
        ${isPressed ? "bg-gray-200 transform translate-y-px shadow-none" : ""}
        ${className}
      `}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
};
