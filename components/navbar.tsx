import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <div className="bg-white sticky top-12 bottom-12 flex flex-col min-h-[12dvh] dark:bg-background justify-center items-center">
      <nav className="flex flex-col lg:flex-row gap-8 sm:gap-6  items-center lg:items-start">
        <Button variant="ghost" asChild>
          <Link href="/today">Todays Tune</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/archive">Archive</Link>
        </Button>
        <Button variant="ghost">Coffee</Button>
        <Button variant="ghost">About</Button>
        <ModeToggle />
      </nav>
    </div>
  );
}
