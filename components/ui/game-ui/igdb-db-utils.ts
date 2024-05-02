import data from "@/lib/igdb/igdb-data.json";

// Function to search for games by name containing a specific string
export function searchGameName(
  searchString: string,
): Array<{ id: string; name: string; coverUrl: string }> {
  // Convert the games object into an array of its values (the individual games)
  const gamesArray = Object.values(data.games);

  // Filter the array to find games where the game name includes the searchString
  const filteredGames = gamesArray.filter((game) =>
    game.name.toLowerCase().includes(searchString.toLowerCase()),
  );

  // Map the filtered games to the requested format
  const formattedGames = filteredGames.map((game) => ({
    id: `${game.id}`, // Convert ID to string, if necessary
    name: game.name,
    coverUrl: game.cover ? `https://${game.cover.url}` : "No cover available",
  }));

  return formattedGames;
}

export function searchGameID() {
  // Function to search for a game by its unique identifier

  return null;
}
