import tuneData from "@/lib/db/tune-data.json";
import data from "@/lib/db/game-data.json";

export interface Game {
  id: string;
  name: string;
  coverUrl: string;
  company: string;
  releaseYear: number;
  genres: Array<string>;
}

/**
 * Searches for a game by name, returning the ID of the game that exactly matches the search string.
 * @param searchString The exact name of the game to search for.
 * @returns The id of the game that exactly matches the search name, if found; otherwise, an empty string.
 */
export function getGameIDByName(searchString: string): number {
  // Convert the games object into an array for easier manipulation
  const gamesArray = Object.values(data.games);

  // Find the game that exactly matches the search string
  const matchingGame = gamesArray.find(
    (game) => game.name.toLowerCase() === searchString.toLowerCase(),
  );

  // Return the ID of the matching game if found, otherwise return an empty string
  return matchingGame ? matchingGame.id : -1;
}

/**
 * Retrieves all games with detailed information.
 * @returns An array of all games with their detailed information.
 */
export function getAllGames(): Array<{
  id: string;
  name: string;
  coverUrl: string;
  company: string;
  releaseYear: number;
  genres: Array<string>;
}> {
  // Convert the games object into an array for easier manipulation
  const gamesArray = Object.values(data.games);

  // Format the games to include all required details
  const formattedGames = gamesArray.map((game) => ({
    id: `${game.id}`,
    name: game.name,
    coverUrl: game.cover ? `https://${game.cover.url}` : "No cover available",
    company: game.involvedCompanies.map((ic) => ic.company.name).join(", "),
    releaseYear: new Date(game.releaseYear * 1000).getFullYear(),
    genres: game.genres.map((genre) => genre.name),
  }));

  return formattedGames;
}

// Placeholder for a future searchGameID function
export function searchGameID() {
  return null;
}

/**
 * Retrieves tune data for a given ID.
 * @param id The ID of the tune to retrieve.
 * @returns The tune data if found, otherwise returns a default empty tune object.
 */
export function getTuneData(id: string) {
  // Attempt to find the tune by ID
  let tune = tuneData.find((tuneItem) => tuneItem.id === id);
  // Provide a default empty object if the tune isn't found
  if (!tune) {
    tune = {
      id: "",
      title: "",
      folder_path: "",
      url: "",
      video_id: "",
      start_time: 0,
      game_ids: [],
    };
  }
  return tune;
}

// write two functions to get and write game statistics
export function getGameStatisticByID() {}

export function setGameStatisticByID() {}
