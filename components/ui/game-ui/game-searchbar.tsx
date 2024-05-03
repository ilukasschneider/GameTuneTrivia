"use client";
import React from "react";
import { useEffect, useState } from "react";
import { getAllGames } from "./igdb-db-utils"; // Import search functions from utils

import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Game {
  id: string;
  name: string;
  coverUrl: string;
  company: string;
  releaseYear: number;
  genres: Array<string>;
}

export default function GameSearchbar() {
  const [allGames, setAllGames] = useState<Game[]>([]); // Use state to hold games
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const loadGames = async () => {
    try {
      const gamesData = await getAllGames();
      // Ensure gamesData is an array before setting state
      if (Array.isArray(gamesData)) {
        setAllGames(gamesData);
      } else {
        console.error("Fetched data is not an array:", gamesData);
        setAllGames([]); // Fallback to an empty array in case of error
      }
    } catch (error) {
      console.error("Error fetching games:", error);
      setAllGames([]); // Ensuring allGames remains an array, even in case of error
    }
  };

  loadGames(); // Load games once on component mount

  return (
    <>
      <div className="className=outline-8 outline-white justify-items-center grid gap-3 p-6 ">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {value
                ? allGames.find((game) => game.name === value)?.name
                : "Select a game..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search games..." />
              {allGames.length === 0 && (
                <CommandEmpty>No games found.</CommandEmpty>
              )}
              <CommandGroup>
                {" "}
                {allGames.map((game) => (
                  <CommandItem
                    key={game.id}
                    value={game.name}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={`mr-2 h-4 w-4 ${value === game.name ? "opacity-100" : "opacity-0"}`}
                    />
                    {game.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div>
        {allGames.map((game) => (
          <p key={game.id}>{game.name}</p>
        ))}
      </div>
    </>
  );
}
