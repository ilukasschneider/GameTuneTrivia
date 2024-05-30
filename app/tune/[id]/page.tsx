"use client";
import GameSearchbar from "@/components/ui/game-ui/game-searchbar";
import SoundVisualizer from "@/components/ui/game-ui/sound-visualizer";
import { Button } from "@/components/ui/button";
import { getTuneData } from "@/lib/db/db-utils";
import { Suspense, useEffect, useState } from "react";
import { YTPlayer } from "@/components/ui/audio-player/yt-player";

export default function Tune({ params }: { params: { id: string } }) {
  // State to track the user's progress
  const [progess, setProgress] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem(`levelProgression: ${params.id}`) || "5"
      : "5",
  );

  // Effect to initialize the progress in local storage
  useEffect(() => {
    localStorage.setItem(`levelProgression: ${params.id}`, "5");
  }, []);

  // Effect to update the progress in local storage whenever it changes
  useEffect(() => {
    localStorage.setItem(`levelProgression: ${params.id}`, progess);

    console.log("PROGESS-LVEVL", progess);
  }, [progess, params.id]);

  // Fetching the tune data based on the id
  const tuneData = getTuneData(params.id)!;
  const correctGameIDs = tuneData.game_ids;
  const audio = `/static/audio/${tuneData.id}/audio.mp3`;
  const [selectedGameID, setSelectedGameID] = useState(-1);

  // Function to check the user's guess
  function checkGuess() {
    if (selectedGameID !== -1) {
      if (correctGameIDs.includes(selectedGameID) && progess !== "failed") {
        setProgress("passed");
      } else {
        switch (progess) {
          case "5":
            setProgress("10");
            break;
          case "10":
            setProgress("15");
            break;
          case "15":
            setProgress("failed");
            break;
        }
      }
    }
  }

  return (
    <>
      <div className="place-content-center grid gap-3">
        {progess !== "passed" && progess !== "failed" ? (
          <Suspense fallback={<div>Loading...</div>}>
            <SoundVisualizer audio={audio} length={parseInt(progess)} />
          </Suspense>
        ) : (
          <YTPlayer video_id={tuneData.video_id} />
        )}
      </div>

      <div className="place-content-center grid gap-3">
        <div className="flex justify-center gap-10 mb-8 -mt-4">
          <div className="w-8 h-8 bg-secondary rounded-full" />
          <div className="w-8 h-8 bg-secondary rounded-full" />
          <div className="w-8 h-8 bg-secondary rounded-full" />
        </div>
        <GameSearchbar setGameID={setSelectedGameID} />
        <Button variant={"secondary"} onClick={checkGuess}>
          Guess
        </Button>
      </div>
    </>
  );
}
