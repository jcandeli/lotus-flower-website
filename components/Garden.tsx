import styled from "@emotion/styled";
import Flower from "./Flower";
import { useGarden } from "./GardenContext";

const GardenContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

export default function Garden() {
  const { flowers, addFlower } = useGarden();

  const handlePedalClick = (
    parentTerm: string,
    position: { x: number; y: number }
  ) => {
    addFlower(position.x, position.y, parentTerm);
  };

  return (
    <GardenContainer>
      {flowers.map((flower) => (
        <Flower
          key={flower.id}
          centerTerm={flower.term || "Central Idea"}
          position={{ x: flower.x, y: flower.y }}
          onPedalClick={handlePedalClick}
        />
      ))}
    </GardenContainer>
  );
}
