"use client";
import React, { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import { Game, getAllGames, getGameIDByName } from "@/lib/db/db-utils"; // Import utility functions for game data fetching

import { Button } from "@/components/ui/button"; // Import Button component for UI
// Import components for building the command interface
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

import { useMediaQuery } from "@react-hook/media-query"; // Hook for responsive design

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; // Components for popover UI
import Image from "next/image"; // Next.js optimized image component

export default function GameSearchbar({ setGameID }: any) {
  // State for the list of games
  const [allGames, setAllGames] = useState<Game[]>([]);
  // State for popover visibility
  const [open, setOpen] = useState(false);
  // State for selected game's name
  const [value, setValue] = useState("");

  useEffect(() => {
    // Async function to fetch games
    const loadGames = async () => {
      const gamesData = getAllGames(); // Fetch games data
      setAllGames(gamesData); // Update state with fetched data
    };
    loadGames();
  }, []); // Effect runs once on mount

  // Adding the named function declaration for handling selection
  function handleSelect(currentValue: string) {
    // This follows your request for a "function" not a "const"
    setValue(currentValue === value ? "" : currentValue);
    if (isDesktop) {
      // You might want to close the popover only on desktop, as your original logic suggests
      setOpen(false); // Closing the popover for desktop layout
    }
    setGameID(getGameIDByName(currentValue));
  }

  const isDesktop = useMediaQuery("(min-width: 768px)"); // Check for desktop screen size

  if (!isDesktop) {
    // Mobile layout with Drawer
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
              ? allGames.find((game) => game.name === value)?.name // Display selected game name
              : "Select a game..."}{" "}
          </Button>
        </DrawerTrigger>
        <DrawerContent className="mt-4 border-t">
          <Command>
            <CommandInput placeholder="Search games..." className="pr-6" />
            {allGames.length === 0 && (
              <CommandEmpty>No games found.</CommandEmpty> // Display if no games are found
            )}
            <CommandList className="scrollbar-none">
              <CommandGroup>
                {allGames.map((game) => (
                  <CommandItem
                    key={game.id} // Unique key for React list
                    value={game.name}
                    onSelect={handleSelect}
                  >
                    <Image
                      src={game.coverUrl} // Game cover image URL
                      width={60}
                      height={60}
                      unoptimized // Disable optimization
                      alt={game.name} // Alt text for image
                      className="h-8 w-8 mr-2 rounded-md" // Image styling
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

  // Desktop layout with Popover
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
              ? allGames.find((game) => game.name === value)?.name // Display selected game name
              : "Select a game..."}{" "}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0">
          <Command>
            <CommandInput placeholder="Search games..." className="pr-6" />
            {allGames.length === 0 && (
              <CommandEmpty>No games found.</CommandEmpty> // Display if no games are found
            )}
            <CommandList className="scrollbar-none">
              <CommandGroup>
                {allGames.map((game) => (
                  <CommandItem
                    key={game.id} // Unique key for React list
                    value={game.name}
                    onSelect={handleSelect}
                  >
                    <Image
                      src={game.coverUrl} // Game cover image URL
                      width={60}
                      height={60}
                      unoptimized // Disable optimization
                      alt={game.name} // Alt text for image
                      className="h-8 w-8 mr-2 rounded-md" // Image styling
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
