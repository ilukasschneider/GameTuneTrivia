// Import Search component for searching games
import React from "react";
import GameSearchbar from "@/components/ui/game-ui/game-searchbar";
import SoundVisualizer from "@/components/ui/game-ui/sound-visualizer";
import audio from "@/assets/gameTunes/Grandma.mp3";
import { getMainColorsOfGameCover } from "@/components/ui/game-ui/igdb-db-utils";

const tune = {
  id: "342",
  correspondingGames: [""],
  audioSrc: "/audio/tune.mp3",
};

const gameID = 1221;
const color = getMainColorsOfGameCover(gameID);

// and that's it...
export default function Tune() {
  return (
    <>
      <SoundVisualizer audio={audio} />
      <GameSearchbar />
    </>
  );
}
