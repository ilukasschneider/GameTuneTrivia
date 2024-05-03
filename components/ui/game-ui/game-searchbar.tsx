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
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";

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

  useEffect(() => {
    const loadGames = async () => {
      const gamesData = await getAllGames();
      setAllGames(gamesData); // Assuming gamesData is immediately usable or adapt as needed
    };
    loadGames();
  }, []); // Load games once on component mount

  return (
    <>
      <div className="className=outline-8 outline-white justify-items-center grid gap-3 p-6 ">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[400px] justify-between"
            >
              {value
                ? allGames.find((game) => game.name === value)?.name
                : "Select a game..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0">
            <Command>
              <CommandInput placeholder="Search games..." />
              {allGames.length === 0 && (
                <CommandEmpty>No games found.</CommandEmpty>
              )}
              <CommandList className="scrollbar-none">
                <CommandGroup>
                  {allGames.map((game) => (
                    <CommandItem
                      key={game.id}
                      value={game.name}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Image
                        src={game.coverUrl}
                        width={60}
                        height={60}
                        alt={game.name}
                        className="h-8 w-8 mr-2 rounded-md"
                      />
                      {game.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
