import Link from "next/link";
import CustomImage from "@/components/ui/game-ui/custom-image";
import api from "@/api/igdb";

export default async function Search(searchParams: any) {
  const searchGame = {
    name: "Kingdom Hearts",
  };
  const games = await api.search(searchGame);

  return (
    <div className="px-4 xl:px-40">
      {/* Check if any games were found */}
      {games.length ? (
        <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-y-6 gap-x-2">
          {/* Map over the array of games and display each game */}
          {games.map((game: any) => (
            // Use the Link component for navigation. Key is required for list items in React for unique identification.
            <Link key={game.id} href={`/games/${game.id}`}>
              {/* Figure tag used for semantic markup of image (CustomImage) and caption */}
              <figure>
                <div className="relative aspect-[3/4] rounded-xl c-bg-dark-blue transition md:hover:brightness-110">
                  {/* CustomImage component displays the game's image. Props are spread from the game object. */}
                  <CustomImage {...game} />
                </div>

                {/* Figcaption displays the game's name. Text size and margin adjustments for responsive design. */}
                <figcaption className="mt-2.5 text-xs	sm:mt-3 sm:text-base font-bold text-center line-clamp-3">
                  {game.name}
                </figcaption>
              </figure>
            </Link>
          ))}
        </div>
      ) : (
        // Display a message if no games were found
        <h2 className="mt-4">No games found</h2>
      )}
    </div>
  );
}
