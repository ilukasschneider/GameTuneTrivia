import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import tuneData from "@/lib/db/tune-data.json";
import { lazy } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTuneData(id: string) {
  let tune = tuneData.find((tuneItem) => tuneItem.id === id);
  if (!tune) {
    tune = {
      id: "",
      title: "",
      folder_path: "",
      url: "",
      start_time: 0,
      game_ids: [],
    };
  }
  return tune;
}
