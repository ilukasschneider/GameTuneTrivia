import { TunePlayer } from "@/components/ui/audio-player/tune-player"; // Import TunePlayer component for playing tunes
// Import Search component for searching games
import React from "react";
import GameSearchbar from "@/components/ui/game-ui/game-searchbar";
import SoundVisualizer from "@/components/ui/game-ui/sound-visualizer";

const tune = {
  id: "342",
  correspondingGames: [""],
  audioSrc: "/audio/tune.mp3",
};

// and that's it...
export default function Tune() {
  return (
    <>
      <SoundVisualizer />
      <GameSearchbar />
    </>
  );
}
