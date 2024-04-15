import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <div className="bg-white sticky top-0 pt-5  flex flex-col min-h-[12dvh] dark:bg-background justify-center items-center z-50 sm:pb-2">
      <nav className="flex flex-col lg:flex-row gap-8 sm:gap-6 items-center lg:items-start">
        <Button variant="ghost" asChild>
          <Link href="/today">Todays Tune</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/archive">Archive</Link>
        </Button>
        <Button variant="ghost">About</Button>
        <ModeToggle />
      </nav>
    </div>
  );
}
