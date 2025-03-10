import GameBoard from "../components/GameBoard";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <GameBoard size={10} />
    </div>
  );
}
