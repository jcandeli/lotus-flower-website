declare module "./Pedal" {
  interface PedalProps {
    position: "top" | "right" | "bottom" | "left";
    value: string;
    onChange: (value: string) => void;
    onClick: () => void;
  }

  const Pedal: React.FC<PedalProps>;
  export default Pedal;
}
