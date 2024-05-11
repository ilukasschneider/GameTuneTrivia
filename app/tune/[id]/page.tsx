"use client";
import GameSearchbar from "@/components/ui/game-ui/game-searchbar";
import SoundVisualizer from "@/components/ui/game-ui/sound-visualizer";
import { Button } from "@/components/ui/button";
import { getTuneData } from "@/lib/utils";
import { Suspense } from "react";

// and that's it...
export default function Tune({ params }: { params: { id: string } }) {
  const tuneData = getTuneData(params.id);
  const time = 5;
  const audio = `/static/audio/${tuneData.id}/audio_${time}.mp3`;
  return (
    <>
      <div className="place-content-center grid gap-3">
        <Suspense fallback={<div className="h-80" />}>
          <SoundVisualizer audio={audio} />
        </Suspense>
      </div>
      <div className="place-content-center grid gap-3">
        <GameSearchbar />
        <Button variant={"secondary"}>Guess</Button>
      </div>
    </>
  );
}
