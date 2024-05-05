"use client";
import React from "react";
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
  return (
    <>
      <SoundVisualizer audio={audio} />

      <GameSearchbar />
    </>
  );
}
