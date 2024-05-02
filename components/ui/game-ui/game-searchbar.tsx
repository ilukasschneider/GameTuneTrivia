"use client";
import { useEffect, useState } from "react";
import { searchGameName, searchGameID } from "./igdb-db-utils"; // Import search functions from utils
import Autocomplete from "@mui/joy/Autocomplete"; // Import Autocomplete component from MUI Joy
import AutocompleteOption from "@mui/joy/AutocompleteOption"; // Import AutocompleteOption component from MUI Joy
import ListItemDecorator from "@mui/joy/ListItemDecorator"; // Import ListItemDecorator component from MUI Joy
import ListItemContent from "@mui/joy/ListItemContent"; // Import ListItemContent component from MUI Joy
import Image from "next/image"; // Import Image component from Next.js for optimised images

interface Game {
  id: string;
  name: string;
  coverUrl: string; // Define Game interface with id, name, and coverUrl
}

export default function GameSearchbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null); // New state for tracking the selected game

  useEffect(() => {
    if (searchTerm) {
      const gamesResult = searchGameName(searchTerm);
      setGames(gamesResult);
    } else {
      setGames([]);
    }
  }, [searchTerm]);

  return (
    <div className="outline-8 outline-white justify-items-center grid gap-3 p-6 ">
      <div className="game-search-container">
        <Autocomplete
          variant="outlined"
          slotProps={{
            root: {
              className: "bg-background dark:text-white",
            },
            listbox: {
              className: "scrollbar-none bg-background",
            },
            option: {
              className: "hover:none dark:hover:none",
            },
          }}
          freeSolo
          value={searchTerm}
          onChange={(event, newValue) => {
            if (typeof newValue === "object" && newValue !== null) {
              setSelectedGame(newValue); // Update selected game when a game is selected
            } else {
              setSelectedGame(null); // Clear selection if input is cleared or not a game object
            }
          }}
          onInputChange={(event, newInputValue) => {
            setSearchTerm(newInputValue);
          }}
          options={games}
          getOptionLabel={(option) =>
            typeof option === "string" ? option : option.name || ""
          }
          renderOption={(props, option) => (
            <AutocompleteOption
              {...props}
              key={option.id}
              slotProps={{
                root: {
                  className: "bg-background dark:text-white",
                },
              }}
            >
              <ListItemDecorator
                slotProps={{
                  root: {
                    className: "bg-background dark:text-white",
                  },
                }}
              >
                <div className="rounded-md">
                  <Image
                    width="40"
                    height="40"
                    src={option.coverUrl}
                    alt={option.name}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = "path/to/default/image";
                    }}
                  />
                </div>
              </ListItemDecorator>
              <ListItemContent
                slotProps={{
                  root: {
                    className: "pl-4",
                  },
                }}
              >
                {option.name}
              </ListItemContent>
            </AutocompleteOption>
          )}
          sx={{ width: 300 }}
        />
      </div>
      <div className="outline-8 outline-white justify-items-center grid gap-3 p-6">
        {" "}
        {/* Display the selected game's name if a game is selected */}
        {selectedGame && <p>Selected Game: {selectedGame.name}</p>}
      </div>
    </div>
  );
}
