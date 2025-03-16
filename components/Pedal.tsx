import styled from "@emotion/styled";

interface PedalProps {
  position: "top" | "right" | "bottom" | "left";
  value: string;
  onChange: (value: string) => void;
  onClick: () => void;
}

const getPedalPosition = (position: PedalProps["position"]) => {
  switch (position) {
    case "top":
      return `
        top: 0;
        left: 50%;
        transform: translate(-50%, -50%);
      `;
    case "right":
      return `
        top: 50%;
        right: 0;
        transform: translate(50%, -50%);
      `;
    case "bottom":
      return `
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 50%);
      `;
    case "left":
      return `
        top: 50%;
        left: 0;
        transform: translate(-50%, -50%);
      `;
  }
};

const PedalContainer = styled.div<{ position: PedalProps["position"] }>`
  position: absolute;
  width: 80px;
  height: 80px;
  ${(props) => getPedalPosition(props.position)}
`;

const PedalInput = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 40px;
  border: 2px solid #ccc;
  padding: 10px;
  text-align: center;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #999;
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
    border-color: #666;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
`;

export default function Pedal({
  position,
  value,
  onChange,
  onClick,
}: PedalProps) {
  return (
    <PedalContainer position={position}>
      <PedalInput
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onClick={() => value && onClick()}
        placeholder="Enter term"
      />
    </PedalContainer>
  );
}
