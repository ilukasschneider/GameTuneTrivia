"use client";
import { Suspense, useState } from "react"; // Import useState hook from React for state management
import { TunePlayer } from "@/components/ui/audio-player/tune-player"; // Import TunePlayer component for playing tunes
// Import Search component for searching games
import { Input } from "@/components/ui/input"; // Import Input component for receiving user input
import React from "react";
const Search = React.lazy(() => import("@/components/ui/game-ui/search"));
import { Button } from "@/components/ui/button";

// and that's it...
export default function Tune() {
  // State to hold the search term
  const [searchGame, setSearchGame] = useState({
    name: "", // Initial state with a default search term
  });

  const [inputValue, setInputValue] = useState(""); // State to hold input value before search

  return (
    <>
      {/* Audio player component to play game tunes */}
      <TunePlayer />
      <div className="flex  place-content-center place-items-center lg:flex-row gap-8 sm:gap-6  m-auto max-w-80">
        {/* Search input field for entering game search terms */}
        <Input
          type="search"
          placeholder="search your game"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value); // Update input value on change
          }}
        />
        <Button
          onClick={() => {
            setSearchGame({ name: inputValue }); // Update search term with input value
          }}
        >
          Search
        </Button>
      </div>
      <div className="outline-8 outline-white justify-items-center grid gap-3 p-6">
        {/* Displaying the current search term */}
        <p>Searching for {searchGame.name}</p>
        <Suspense fallback={<p>Loading...</p>}>
          {/* Search component with search parameters passed as props */}
          <Search searchParams={searchGame} />
          <pre>{JSON.stringify(searchGame, null, 2)}</pre>
        </Suspense>
      </div>
    </>
  );
}
