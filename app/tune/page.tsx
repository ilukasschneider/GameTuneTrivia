import { TunePlayer } from "@/components/ui/audio-player/tune-player"; // Import TunePlayer component for playing tunes
// Import Search component for searching games
import React from "react";
import GameSearchbar from "@/components/ui/game-ui/game-searchbar";

// and that's it...
export default function Tune() {
  return (
    <>
      {/* Audio player component to play game tunes */}
      <TunePlayer />
      <GameSearchbar />
    </>
  );
}
