"use client";
import GameSearchbar from "@/components/ui/game-ui/game-searchbar";
import SoundVisualizer from "@/components/ui/game-ui/sound-visualizer";
import { Button } from "@/components/ui/button";
import { getTuneData } from "@/lib/db/db-utils";
import { Suspense, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { YTPlayer } from "@/components/ui/audio-player/yt-player";

export default function Tune({ params }: { params: { id: string } }) {
  // State to track the user's progress
  const [progess, setProgress] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem(`levelProgression: ${params.id}`) || "0"
      : "0",
  );

  // State to track the current audio time
  const [audioTime, setAudioTime] = useState(updateAudioTime());

  // Effect to initialize the progress in local storage
  useEffect(() => {
    localStorage.setItem(`levelProgression: ${params.id}`, "0");
  }, []);

  // Effect to update the progress in local storage whenever it changes
  useEffect(() => {
    localStorage.setItem(`levelProgression: ${params.id}`, progess);
  }, [progess, params.id]);

  // Fetching the tune data based on the id
  const tuneData = getTuneData(params.id)!;
  const correctGameIDs = tuneData.game_ids;
  const audio = `/static/audio/${tuneData.id}/audio.mp3`;
  const [selectedGameID, setSelectedGameID] = useState(-1);

  // Function to update the audio time based on the progress
  function updateAudioTime(): string {
    const progressionMap: { [key: string]: string } = {
      "0": "5",
      "1": "10",
      "2": "15",
      "3": "15",
      "4": "15",
    };

    return progressionMap[progess] || "5";
  }

  // Function to check the user's guess
  function checkGuess() {
    const currentProgression = progess;
    if (selectedGameID != -1) {
      if (
        correctGameIDs.includes(selectedGameID) &&
        currentProgression !== "3"
      ) {
        setProgress("4");
      } else {
        const nextProgression = Math.min(
          parseInt(currentProgression) + 1,
          3,
        ).toString();
        setProgress(currentProgression === "4" ? "4" : nextProgression);
      }
      setAudioTime(updateAudioTime());
    }
  }

  return (
    <>
      <div className="place-content-center grid gap-3">
        {progess !== "3" && progess !== "4" ? (
          <Suspense fallback={<div>Loading...</div>}>
            <SoundVisualizer audio={audio} length={parseInt(audioTime)} />
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
