"use client";
import React from "react";
import { useEffect, useState } from "react";
import { Game, getAllGames } from "./igdb-db-utils"; // Importing utility functions for game data fetching

import { Button } from "@/components/ui/button"; // Button component for UI
// Importing various components for building the command interface
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

import { useMediaQuery } from "@react-hook/media-query"; // Hook for media query

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; // Components for creating a popover UI
import Image from "next/image"; // Next.js Image component for optimized image rendering

export default function GameSearchbar() {
  // State for storing the list of all games fetched from the API
  const [allGames, setAllGames] = useState<Game[]>([]);
  // State to control the visibility of the popover
  const [open, setOpen] = useState(false);
  // State for storing the currently selected game's name
  const [value, setValue] = useState("");

  useEffect(() => {
    // Function to load games from the API
    const loadGames = async () => {
      const gamesData = await getAllGames(); // Fetching games data
      setAllGames(gamesData); // Setting the fetched data to state
    };
    loadGames(); // Invoking the loadGames function to fetch games data
  }, []); // Empty dependency array means this effect runs once on mount

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (!isDesktop) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="lg:w-[400px] md:w-[300px] sm:w-[200px] justify-between overflow-x-hidden"
          >
            {value
              ? allGames.find((game) => game.name === value)?.name // Displaying the selected game's name
              : "Select a game..."}{" "}
          </Button>
        </DrawerTrigger>
        <DrawerContent className="mt-4 border-t">
          <Command>
            <CommandInput placeholder="Search games..." className="pr-6" />
            {allGames.length === 0 && (
              <CommandEmpty>No games found.</CommandEmpty> // Displayed when no games data is available
            )}
            <CommandList className="scrollbar-none">
              <CommandGroup>
                {allGames.map((game) => (
                  <CommandItem
                    key={game.id} // Unique key for each item
                    value={game.name}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue); // Updating the selected value or clearing it if the same value is selected
                    }}
                  >
                    <Image
                      src={game.coverUrl} // Game cover image URL
                      width={60}
                      height={60}
                      unoptimized // Disabling optimization for demonstration purposes
                      alt={game.name} // Alt text for the image
                      className="h-8 w-8 mr-2 rounded-md" // Styling for the image
                    />
                    {game.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="lg:w-[400px] md:w-[300px] sm:w-[200px] justify-between overflow-x-hidden"
          >
            {value
              ? allGames.find((game) => game.name === value)?.name // Displaying the selected game's name
              : "Select a game..."}{" "}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0">
          <Command>
            <CommandInput placeholder="Search games..." className="pr-6" />
            {allGames.length === 0 && (
              <CommandEmpty>No games found.</CommandEmpty> // Displayed when no games data is available
            )}
            <CommandList className="scrollbar-none">
              <CommandGroup>
                {allGames.map((game) => (
                  <CommandItem
                    key={game.id} // Unique key for each item
                    value={game.name}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue); // Updating the selected value or clearing it if the same value is selected
                      setOpen(false); // Closing the popover after selection
                    }}
                  >
                    <Image
                      src={game.coverUrl} // Game cover image URL
                      width={60}
                      height={60}
                      unoptimized // Disabling optimization for demonstration purposes
                      alt={game.name} // Alt text for the image
                      className="h-8 w-8 mr-2 rounded-md" // Styling for the image
                    />
                    {game.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
