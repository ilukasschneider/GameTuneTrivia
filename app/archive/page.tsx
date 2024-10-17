"use client";
import { HoverEffect } from "@/components/ui/archive/card-hover-effect";
import data from "@/lib/trivia-linking.json";

// Compute the number of days since October 13, 2024
const startDate = new Date("2024-10-16");
const today = new Date();

// Calculate the difference in time
const diffTime = today.getTime() - startDate.getTime();

// Convert time difference to days
const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

// Ensure we don't request more items than available
const currentGameTuneList = data.slice(0, Math.min(diffDays, data.length));
console.log(currentGameTuneList);
export default function Page() {
  return (
    <div className="max-w-5xl relative mx-auto mt-10 px-20">
      <HoverEffect items={currentGameTuneList} />
    </div>
  );
}
