import data from "@/lib/igdb/igdb-data.json";
import ColorThief from "colorthief";

export interface Game {
  id: string;
  name: string;
  coverUrl: string;
  company: string;
  releaseYear: number;
  genres: Array<string>;
}

export function searchGameName(
  searchString: string,
): Array<{ id: string; name: string; coverUrl: string }> {
  const gamesArray = Object.values(data.games);

  const filteredGames = gamesArray.filter((game) =>
    game.name.toLowerCase().includes(searchString.toLowerCase()),
  );

  const formattedGames = filteredGames.map((game) => ({
    id: `${game.id}`,
    name: game.name,
    coverUrl: game.cover ? `https://${game.cover.url}` : "No cover available",
  }));

  return formattedGames;
}

export function getAllGames(): Array<{
  id: string;
  name: string;
  coverUrl: string;
  company: string;
  releaseYear: number;
  genres: Array<string>;
}> {
  const gamesArray = Object.values(data.games);

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

export function searchGameID() {
  return null;
}

export async function getMainColorsOfGameCover(gameId: Number) {
  const game = Object.values(data.games).find((g) => g.id === gameId);
  if (!game || !game.cover) {
    console.log(`Game with ID ${gameId} not found or has no cover.`);
    return null;
  }

  const coverUrl = `https://${game.cover.url}`;

  try {
    // Use node-fetch to retrieve the image
    const response = await fetch(coverUrl);
    if (!response.ok) throw new Error("Cover image could not be fetched.");

    // Convert response to Blob since ColorThief works with Blobs on the browser, or use buffer for servers
    const buffer = await response.arrayBuffer();

    // Instantiate ColorThief and get the palette
    const colorThief = new ColorThief();
    const img = new Image();
    img.src = coverUrl;
    const palette = colorThief.getColor(img);

    // Assuming the palette provides an RGB array for the top color
    // Convert RGB to HEX
    const mainColorHex = `#${palette[0].toString(16).padStart(2, "0")}${palette[1].toString(16).padStart(2, "0")}${palette[2].toString(16).padStart(2, "0")}`;
    console.log(`Main color of the cover is ${mainColorHex}`);
    // Return as desired, here's an example assuming just one color is needed
    return [mainColorHex];
  } catch (error) {
    console.error("Failed to process the image", error);
    return null;
  }
}
