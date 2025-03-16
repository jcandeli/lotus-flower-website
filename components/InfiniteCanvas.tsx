"use client";

import { useRef, useState } from "react";
import { useGesture } from "@use-gesture/react";

interface InfiniteCanvasProps {
  children?: React.ReactNode;
}

export function InfiniteCanvas({ children }: InfiniteCanvasProps) {
  const [transform, setTransform] = useState({
    scale: 1,
    x: 0,
    y: 0,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useGesture(
    {
      onDrag: ({ movement: [mx, my], first, memo }) => {
        if (first) {
          memo = { x: transform.x, y: transform.y };
        }
        setTransform((prev) => ({
          ...prev,
          x: memo.x + mx,
          y: memo.y + my,
        }));
        return memo;
      },
      onPinch: ({ offset: [scale] }) => {
        scale = Math.min(Math.max(0.5, scale), 5);
        setTransform((prev) => ({
          ...prev,
          scale,
        }));
      },
      onWheel: ({ delta: [, dy] }) => {
        setTransform((prev) => ({
          ...prev,
          scale: Math.min(Math.max(0.5, prev.scale * (1 - dy / 500)), 5),
        }));
      },
    },
    {
      target: containerRef,
      drag: { from: () => [transform.x, transform.y] },
      pinch: { scaleBounds: { min: 0.5, max: 5 } },
    }
  );

  return (
    <div className="infinite-canvas-container" ref={containerRef}>
      <div
        className="infinite-canvas"
        style={{
          transform: `translate(-50%, -50%) translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
