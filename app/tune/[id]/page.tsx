"use client";
import GameSearchbar from "@/components/ui/game-ui/game-searchbar";
import SoundVisualizer from "@/components/ui/game-ui/sound-visualizer";
import { Button } from "@/components/ui/button";
import { getTuneData } from "@/lib/db/db-utils";
import { Suspense, useEffect, useState } from "react";
import { YTPlayer } from "@/components/ui/audio-player/yt-player";
import { ConfettiCanvas } from "@/components/ui/game-ui/confetti/confettiCanvas";
import { Progress } from "@/components/ui/progress";

export default function Tune({ params }: { params: { id: string } }) {
  // State to track the user's progress, initializing from localStorage if available
  const [progress, setProgress] = useState<string>(
    typeof window !== "undefined"
      ? localStorage.getItem(`levelProgression: ${params.id}`) || "5"
      : "5",
  );

  // State to track the user's guess history, initializing from localStorage if available
  const [guessHistory, setGuessHistory] = useState<string>(
    typeof window !== "undefined"
      ? localStorage.getItem(`guessCount: ${params.id}`) || ""
      : "",
  );

  // State to track the colors of the circles indicating guess status
  const [progressIndicator, setProgressIndicator] = useState<string[]>([
    "bg-accent",
    "bg-accent",
    "bg-accent",
  ]);

  const [confetti, setConfetti] = useState<boolean>(false);

  // Effect to initialize localStorage values if they are not already set
  useEffect(() => {
    if (!localStorage.getItem(`levelProgression: ${params.id}`)) {
      localStorage.setItem(`levelProgression: ${params.id}`, "5");
    }
    if (!localStorage.getItem(`guessCount: ${params.id}`)) {
      localStorage.setItem(`guessCount: ${params.id}`, "");
    }
  }, [params.id]);

  // Effect to update localStorage whenever progress or guessHistory changes
  useEffect(() => {
    if (progress && guessHistory !== null) {
      localStorage.setItem(`levelProgression: ${params.id}`, progress);
      localStorage.setItem(`guessCount: ${params.id}`, guessHistory);
    }

    // Update circle colors based on the guess history
    switch (guessHistory) {
      case "wrong guess":
        setProgressIndicator(["bg-red-500", "bg-accent", "bg-accent"]);
        break;
      case "correct guess":
        setProgressIndicator(["bg-green-500", "bg-accent", "bg-accent"]);
        setConfetti(true);
        break;
      case "wrong guess,wrong guess":
        setProgressIndicator(["bg-red-500", "bg-red-500", "bg-accent"]);
        break;
      case "wrong guess,correct guess":
        setProgressIndicator(["bg-red-500", "bg-green-500", "bg-accent"]);
        setConfetti(true);
        break;
      case "wrong guess,wrong guess,wrong guess":
        setProgressIndicator(["bg-red-500", "bg-red-500", "bg-red-500"]);
        break;
      case "wrong guess,wrong guess,correct guess":
        setProgressIndicator(["bg-red-500", "bg-red-500", "bg-green-500"]);
        setConfetti(true);
        break;
      default:
        setProgressIndicator(["bg-accent", "bg-accent", "bg-accent"]);
        break;
    }
  }, [progress, params.id, guessHistory]);

  // Fetching the tune data based on the id
  const tuneData = getTuneData(params.id)!;
  const correctGameIDs = tuneData.game_ids;
  const audio = `/static/audio/${tuneData.id}/audio.mp3`;
  const [selectedGameID, setSelectedGameID] = useState(-1);

  // Function to check the user's guess
  function checkGuess() {
    if (selectedGameID !== -1) {
      if (correctGameIDs.includes(selectedGameID) && progress !== "failed") {
        // Update progress and guess history if the guess is correct
        setProgress("passed");
        setGuessHistory((prevHistory) =>
          prevHistory ? `${prevHistory},correct guess` : "correct guess",
        );
      } else {
        // Update progress and guess history if the guess is incorrect
        switch (progress) {
          case "5":
            setProgress("10");
            setGuessHistory((prevHistory) =>
              prevHistory ? `${prevHistory},wrong guess` : "wrong guess",
            );
            break;
          case "10":
            setProgress("15");
            setGuessHistory((prevHistory) =>
              prevHistory ? `${prevHistory},wrong guess` : "wrong guess",
            );
            break;
          case "15":
            setProgress("failed");
            setGuessHistory((prevHistory) =>
              prevHistory ? `${prevHistory},wrong guess` : "wrong guess",
            );
            break;
        }
      }
    }
    // Reset the selected game id after checking the guess
    setSelectedGameID(-1);
  }

  return (
    <>
      <ConfettiCanvas active={confetti} fadingMode="OFF" stopAfterMs={10000} />

      {progress !== "passed" && progress !== "failed" ? (
        <div className="grid place-content-center gap-4 transform -translate-y-5 pt-2">
          <div className="relative">
            <Suspense fallback={<div>Loading...</div>}>
              <SoundVisualizer audio={audio} length={parseInt(progress)} />
            </Suspense>
          </div>

          <div className="grid place-content-center gap-4 mt-4 sm:mt-6 lg:mt-8 xl:mt-10">
            <div className="flex justify-center gap-3 sm:gap-4 lg:gap-5">
              <div className={`h-8 w-8 rounded-lg ${progressIndicator[0]}`} />
              <div className={`h-8 w-8 rounded-lg ${progressIndicator[1]}`} />
              <div className={`h-8 w-8 rounded-lg ${progressIndicator[2]}`} />
            </div>
            <GameSearchbar setGameID={setSelectedGameID} />
            <Button variant={"secondary"} onClick={checkGuess}>
              Guess
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="grid place-content-center gap-4 pt-2">
            <YTPlayer video_id={tuneData.video_id} />
          </div>
          <div className="flex justify-center gap-3 sm:gap-4 lg:gap-5 p-20">
            <div className={`h-8 w-8 rounded-lg ${progressIndicator[0]}`} />
            <div className={`h-8 w-8 rounded-lg ${progressIndicator[1]}`} />
            <div className={`h-8 w-8 rounded-lg ${progressIndicator[2]}`} />
          </div>
        </div>
      )}
    </>
  );
}
