import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <div className="sticky top-0 flex flex-col min-h-[25dvh] bg-white dark:bg-background">
      {/* Header section containing the navigation */}
      <header className="px-4 lg:px-6 h-40 flex flex-col lg:flex-row items-center justify-center lg:justify-between">
        {/* Navigation with links and mode toggle */}
        <nav className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-center lg:items-start">
          {/* Navigation Link for Features */}
          <Button variant="ghost" asChild>
            <Link href="/today">Todays Tune</Link>
          </Button>

          {/* Navigation Link for Pricing */}
          <Button variant="ghost" asChild>
            <Link href="/archive">Archive</Link>
          </Button>
          {/* Navigation Link for About */}
          <Button variant="ghost">Coffee</Button>
          {/* Navigation Link for Contact */}
          <Button variant="ghost">About</Button>
          {/* Empty div for spacing */}
        </nav>
        <ModeToggle />
      </header>
    </div>
  );
}
