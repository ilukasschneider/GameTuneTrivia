import Image from "next/image";
import GuessingUI from "@/components/guessingUI";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main style={{ visibility: "visible" }}>
      <div>
        <GuessingUI />
        <Button>Click me</Button>
      </div>
    </main>
  );
}
