import React from "react";
import { TunePlayer } from "@/components/ui/audio-player/tune-player";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// Render a YouTube video player

// Component displaying today's tune with an animated canvas reveal effect.
export default function Tune() {
  return (
    <>
      <TunePlayer />
      <div className="flex  place-content-center place-items-center lg:flex-row gap-8 sm:gap-6  m-auto max-w-80">
        <Input type="tune in your guess" placeholder="tune in your guess" />
        <Button type="submit">Guess</Button>
      </div>
    </>
  );
}
