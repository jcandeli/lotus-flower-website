import styled from "@emotion/styled";
import { useState } from "react";
import Pedal from "@/components/Pedal";

interface FlowerProps {
  centerTerm: string;
  position?: { x: number; y: number };
  onPedalClick: (term: string, position: { x: number; y: number }) => void;
}

interface FlowerContainerProps {
  x?: number;
  y?: number;
}

const FlowerContainer = styled.div<FlowerContainerProps>`
  position: absolute;
  left: ${(props) => (props.x ? `${props.x}px` : "50%")};
  top: ${(props) => (props.y ? `${props.y}px` : "50%")};
  transform: ${(props) => (props.x ? "none" : "translate(-50%, -50%)")};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Center = styled.div`
  width: 100px;
  height: 100px;
  background-color: #f0f0f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 10px;
  z-index: 1;
`;

const PedalsContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
`;

export default function Flower({
  centerTerm,
  position,
  onPedalClick,
}: FlowerProps) {
  const [pedals, setPedals] = useState<string[]>(Array(4).fill(""));

  const handlePedalChange = (index: number, value: string) => {
    const newPedals = [...pedals];
    newPedals[index] = value;
    setPedals(newPedals);
  };

  const handlePedalClick = (index: number) => {
    if (pedals[index]) {
      const offset = 400; // Distance between flowers
      let newPosition = { x: 0, y: 0 };

      switch (index) {
        case 0: // Top
          newPosition = {
            x: position?.x || window.innerWidth / 2,
            y: (position?.y || window.innerHeight / 2) - offset,
          };
          break;
        case 1: // Right
          newPosition = {
            x: (position?.x || window.innerWidth / 2) + offset,
            y: position?.y || window.innerHeight / 2,
          };
          break;
        case 2: // Bottom
          newPosition = {
            x: position?.x || window.innerWidth / 2,
            y: (position?.y || window.innerHeight / 2) + offset,
          };
          break;
        case 3: // Left
          newPosition = {
            x: (position?.x || window.innerWidth / 2) - offset,
            y: position?.y || window.innerHeight / 2,
          };
          break;
      }

      onPedalClick(pedals[index], newPosition);
    }
  };

  return (
    <FlowerContainer x={position?.x} y={position?.y}>
      <PedalsContainer>
        {/* Top Pedal */}
        <Pedal
          position="top"
          value={pedals[0]}
          onChange={(value: string) => handlePedalChange(0, value)}
          onClick={() => handlePedalClick(0)}
        />
        {/* Right Pedal */}
        <Pedal
          position="right"
          value={pedals[1]}
          onChange={(value: string) => handlePedalChange(1, value)}
          onClick={() => handlePedalClick(1)}
        />
        {/* Bottom Pedal */}
        <Pedal
          position="bottom"
          value={pedals[2]}
          onChange={(value: string) => handlePedalChange(2, value)}
          onClick={() => handlePedalClick(2)}
        />
        {/* Left Pedal */}
        <Pedal
          position="left"
          value={pedals[3]}
          onChange={(value: string) => handlePedalChange(3, value)}
          onClick={() => handlePedalClick(3)}
        />
        <Center>{centerTerm}</Center>
      </PedalsContainer>
    </FlowerContainer>
  );
}
