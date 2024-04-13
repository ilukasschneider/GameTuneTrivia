import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <div className="sticky top-0 flex flex-col min-h-[15dvh]">
      {/* Header section containing the navigation */}
      <header className=" px-4 lg:px-6 h-28 flex items-center justify-center gap-4 sm:gap-6">
        {/* Navigation with links and mode toggle */}
        <nav className="flex gap-4 sm:gap-6">
          {/* Navigation Link for Features */}
          <Button variant="ghost" asChild>
            <Link href="/">Todays Tune</Link>
          </Button>

          {/* Navigation Link for Pricing */}
          <Button variant="ghost" asChild>
            <Link href="/archive">Archive</Link>
          </Button>
          {/* Navigation Link for About */}
          <Button variant="ghost">Coffee</Button>
          {/* Navigation Link for Contact */}
          <Button variant="ghost">About</Button>
        </nav>
        <ModeToggle />
      </header>
    </div>
  );
}
