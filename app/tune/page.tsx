import { TunePlayer } from "@/components/ui/audio-player/tune-player";
import Search from "@/components/ui/game-ui/search";
import { Input } from "@/components/ui/input";
import { TuneSearch } from "@/components/ui/game-ui/tune-search";

const x = {
  name: "Kingdom Hearts",
};
export default function Tune() {
  return (
    <>
      {/* Audio player component */}
      <TunePlayer />
      <TuneSearch />
      {/* Search component */}
    </>
  );
}
