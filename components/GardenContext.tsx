"use client";

import React, { createContext, useContext, useState } from "react";

interface FlowerPosition {
  x: number;
  y: number;
  id: string;
  term?: string;
}

interface GardenContextType {
  flowers: FlowerPosition[];
  addFlower: (x: number, y: number, term?: string) => void;
}

const GardenContext = createContext<GardenContextType | null>(null);

export function GardenProvider({ children }: { children: React.ReactNode }) {
  const [flowers, setFlowers] = useState<FlowerPosition[]>([
    {
      x: 0,
      y: 0,
      id: "root",
      term: "Central Idea",
    },
  ]);

  const checkOverlap = (x: number, y: number): boolean => {
    const FLOWER_SIZE = 400; // Adjust based on your flower size
    const MIN_DISTANCE = FLOWER_SIZE * 0.8; // Allow some overlap but not too much

    return flowers.some((flower) => {
      const distance = Math.sqrt(
        Math.pow(flower.x - x, 2) + Math.pow(flower.y - y, 2)
      );
      return distance < MIN_DISTANCE;
    });
  };

  const findValidPosition = (
    initialX: number,
    initialY: number
  ): [number, number] => {
    if (!checkOverlap(initialX, initialY)) {
      return [initialX, initialY];
    }

    // Spiral out to find the nearest valid position
    const STEP = 50; // Adjust step size as needed
    let angle = 0;
    let radius = STEP;

    while (radius < 1000) {
      // Prevent infinite loops
      const newX = initialX + radius * Math.cos(angle);
      const newY = initialY + radius * Math.sin(angle);

      if (!checkOverlap(newX, newY)) {
        return [newX, newY];
      }

      angle += Math.PI / 4; // 45-degree increments
      if (angle >= Math.PI * 2) {
        angle = 0;
        radius += STEP;
      }
    }

    return [initialX, initialY]; // Fallback if no position found
  };

  const addFlower = (x: number, y: number, term?: string) => {
    const [validX, validY] = findValidPosition(x, y);
    setFlowers((prev) => [
      ...prev,
      {
        x: validX,
        y: validY,
        id: Math.random().toString(36).substr(2, 9),
        term,
      },
    ]);
  };

  return (
    <GardenContext.Provider value={{ flowers, addFlower }}>
      {children}
    </GardenContext.Provider>
  );
}

export const useGarden = () => {
  const context = useContext(GardenContext);
  if (!context) {
    throw new Error("useGarden must be used within a GardenProvider");
  }
  return context;
};
