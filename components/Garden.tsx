import styled from "@emotion/styled";
import { useState } from "react";
import Flower from "./Flower";

interface FlowerData {
  id: string;
  term: string;
  position: { x: number; y: number };
}

const GardenContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #fafafa;
  overflow: hidden;
`;

export default function Garden() {
  const [flowers, setFlowers] = useState<FlowerData[]>([
    {
      id: "root",
      term: "Central Idea",
      position: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    },
  ]);

  const handlePedalClick = (
    parentTerm: string,
    position: { x: number; y: number }
  ) => {
    const newFlower: FlowerData = {
      id: Math.random().toString(36).substr(2, 9),
      term: parentTerm,
      position,
    };

    setFlowers((prev) => [...prev, newFlower]);
  };

  return (
    <GardenContainer>
      {flowers.map((flower) => (
        <Flower
          key={flower.id}
          centerTerm={flower.term}
          position={flower.position}
          onPedalClick={handlePedalClick}
        />
      ))}
    </GardenContainer>
  );
}
