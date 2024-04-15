"use client";
import React from "react";
import { Canvas } from "./canvas";
import { CanvasRevealEffect } from "@/components/ui/todays-tune/canvas-reveal-effect";

// Component displaying today's tune with an animated canvas reveal effect.
export function TodaysTune() {
  return (
    <>
      <div className="py-20 flex flex-col lg:flex-row items-center justify-center  w-full gap-4 mx-auto px-8">
        {/* Card component wrapping the CanvasRevealEffect */}
        <Canvas title="♫">
          <CanvasRevealEffect
            animationSpeed={2} // Speed of the canvas animation
            containerClassName="bg-white dark:bg-black" // Styling for light/dark mode
            colors={[
              // Color scheme for the canvas dots
              [244, 109, 66],
            ]}
            dotSize={22} // Size of the dots in the canvas animation
          />
        </Canvas>
      </div>
    </>
  );
}
