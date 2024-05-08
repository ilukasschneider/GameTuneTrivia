"use client";
import React, { Suspense, useState } from "react";
import GameSearchbar from "@/components/ui/game-ui/game-searchbar";
import SoundVisualizer from "@/components/ui/game-ui/sound-visualizer";
import audio from "/public/static/audio/Grandma.mp3";
import { Button } from "@/components/ui/button";

const tune = {
  id: "342",
  correspondingGames: [""],
  audioSrc: "/audio/tune.mp3",
};

const gameID = 1221;
const value = Button;
// and that's it...
export default function Tune() {
  return (
    <>
      <div className="place-content-center grid gap-3">
        <Suspense fallback={<div className="h-80" />}>
          <SoundVisualizer audio={audio} duration={120} />
        </Suspense>
      </div>
      <div className="place-content-center grid gap-3">
        <GameSearchbar />
        <Button variant={"secondary"}>Guess</Button>
      </div>
    </>
  );
}
