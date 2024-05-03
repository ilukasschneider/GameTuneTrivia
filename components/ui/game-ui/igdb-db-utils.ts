import data from "@/lib/igdb/igdb-data.json";

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
