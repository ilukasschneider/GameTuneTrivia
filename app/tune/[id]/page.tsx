"use client";
import GameSearchbar from "@/components/ui/game-ui/game-searchbar";
import SoundVisualizer from "@/components/ui/game-ui/sound-visualizer";
import { Button } from "@/components/ui/button";
import { getTuneData } from "@/lib/db/db-utils";
import { Suspense, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import YouTube from "react-youtube";

const opts = {
  playerVars: {
    autoplay: 1,
  },
};

export default function Tune({ params }: { params: { id: string } }) {
  // State for tracking the audio time based on user progression
  const [audioTime, setAudioTime] = useState(updateAudioTime());
  // Initialize user level progression in localStorage if not present
  if (!localStorage.getItem(`levelProgression: ${params.id}`)) {
    localStorage.setItem(`levelProgression: ${params.id}`, "0");
  }
  // Fetch tune data from the database
  const tuneData = getTuneData(params.id)!;
  const correctGameIDs = tuneData.game_ids; // IDs of games that are correct answers
  const audio = `/static/audio/${tuneData.id}/audio.mp3`; // Path to the tune audio file
  // State to track the user's selected game ID
  const [selectedGameID, setSelectedGameID] = useState(-1);

  // Function to update the audio time based on the user's current progression
  function updateAudioTime(): string {
    const progressionMap: { [key: string]: string } = {
      "0": "5",
      "1": "10",
      "2": "15",
      "3": "15",
      "4": "15",
    };
    const currentProgression =
      localStorage.getItem(`levelProgression: ${params.id}`) || "0";
    return progressionMap[currentProgression] || "5";
  }

  // Function to check the user's guess and update their progression
  function checkGuess() {
    const currentProgression =
      localStorage.getItem(`levelProgression: ${params.id}`) || "0";
    if (selectedGameID != -1) {
      if (
        correctGameIDs.includes(selectedGameID) &&
        currentProgression !== "3"
      ) {
        // If guess is correct and not at max progression, set to completed
        localStorage.setItem(`levelProgression: ${params.id}`, "4");
      } else {
        // Otherwise, increment progression or set to 'done' if already completed
        const nextProgression = Math.min(
          parseInt(currentProgression) + 1,
          3,
        ).toString();
        localStorage.setItem(
          `levelProgression: ${params.id}`,
          currentProgression === "done" ? "done" : nextProgression,
        );
      }
      // Update the audio time based on new progression
      setAudioTime(updateAudioTime());
    }
  }

  return (
    <>
      <div className="place-content-center grid gap-3">
        {localStorage.getItem(`levelProgression: ${params.id}`) !== "3" &&
        localStorage.getItem(`levelProgression: ${params.id}`) !== "4" ? (
          <Suspense fallback={<div>Loading...</div>}>
            {/* Sound visualizer component with dynamic audio length */}
            <SoundVisualizer audio={audio} length={parseInt(audioTime)} />
          </Suspense>
        ) : (
          <div className="w-full h-64 sm:h-72 md:h-96 lg:h-[500px] p-4">
            <YouTube
              className="w-full h-full"
              videoId={tuneData.video_id}
              opts={opts}
            />
          </div>
        )}
      </div>

      <div className="place-content-center grid gap-3">
        <div className="flex justify-center gap-10 mb-8 -mt-4">
          {/* Example avatars */}
          <Avatar className="outline-inherit">
            <AvatarImage />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <GameSearchbar setGameID={setSelectedGameID} />
        <Button variant={"secondary"} onClick={checkGuess}>
          Guess
        </Button>
        <p>selected game: {selectedGameID}</p>
        <p>current time: {audioTime}</p>
      </div>
    </>
  );
}
