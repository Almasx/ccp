import { SituationData } from "../components/SituationCard";

// Generate situation cards for each tile index
export const generateSituationData = (
  totalTiles: number
): Record<number, SituationData> => {
  const situations: Record<number, SituationData> = {};

  // Sample images - in a real app, you'd have more variety
  const sampleImages = ["/card1.svg", "/card2.svg", "/card3.svg", "/card4.svg"];

  // Sample titles and descriptions
  const sampleTitles = [
    "Unexpected Discovery",
    "Challenging Decision",
    "Lucky Encounter",
    "Strategic Opportunity",
    "Mysterious Event",
    "Sudden Twist",
    "Hidden Treasure",
    "Difficult Choice",
  ];

  const sampleDescriptions = [
    "You found something valuable but risky to obtain. What will you do?",
    "A difficult choice stands before you, each option with its own consequences.",
    "A lucky break! Something fortunate has happened in your journey.",
    "An opportunity presents itself, but requires careful planning.",
    "Something strange and unexplainable has occurred. Proceed with caution.",
    "The situation has suddenly changed in an unexpected way.",
    "You have discovered something of great value hidden away.",
    "You must choose between two paths, each with unknown outcomes.",
  ];

  // Create a situation for each tile
  for (let i = 1; i <= totalTiles; i++) {
    const titleIndex = (i - 1) % sampleTitles.length;
    const descIndex = (i - 1) % sampleDescriptions.length;
    const imageIndex = (i - 1) % sampleImages.length;

    situations[i] = {
      id: `situation-${i}`,
      title: sampleTitles[titleIndex],
      description: sampleDescriptions[descIndex],
      imageUrl: sampleImages[imageIndex],
    };
  }

  return situations;
};
