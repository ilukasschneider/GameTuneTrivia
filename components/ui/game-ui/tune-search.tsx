import { TunePlayer } from "@/components/ui/audio-player/tune-player";
import Search from "@/components/ui/game-ui/search";
import { Input } from "@/components/ui/input";

export async function TuneSearch() {
  // State to hold the search term

  const searchGame = {
    name: "Kingdom Hearts",
  };
  return (
    <>
      <div className="flex  place-content-center place-items-center lg:flex-row gap-8 sm:gap-6  m-auto max-w-80">
        {/* Search input field */}
        <Input type="search" placeholder="search your game" />
      </div>
      <div className="outline-8 outline-white justify-items-center grid gap-3 p-6">
        {/* Suspense wrapper for -loaded Search component */}
        {/* Search component with search parameters */}
        <Search searchParams={searchGame} />
      </div>
    </>
  );
}
