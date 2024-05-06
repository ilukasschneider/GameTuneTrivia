"use client";
import React, { Suspense, useState } from "react";
import GameSearchbar from "@/components/ui/game-ui/game-searchbar";
import SoundVisualizer from "@/components/ui/game-ui/sound-visualizer";
import audio from "/public/static/audio/Grandma.mp3";

const tune = {
  id: "342",
  correspondingGames: [""],
  audioSrc: "/audio/tune.mp3",
};

const gameID = 1221;

// and that's it...
export default function Tune() {
  // Initialize a state `showVisualizer` to control the rendering of SoundVisualizer
  const [showVisualizer, setShowVisualizer] = useState(false);

  // Define a function to toggle the `showVisualizer` state
  const handleClick = () => {
    setShowVisualizer(!showVisualizer);
  };
  return (
    <>
      <Suspense fallback={<div className="h-80" />}>
        <SoundVisualizer audio={audio} />
      </Suspense>
      <GameSearchbar />
    </>
  );
}
