"use client";

import * as React from "react";
import { ModeToggle } from "./mode-toggle";
// Utility function for conditional class names
import { cn } from "@/lib/utils";
// Importing custom icons component
import { useState, useEffect } from "react";
// Importing components and styles from navigation-menu for building a navigation UI
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "./ui/button";
import { HomeIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import data from "@/lib/trivia-linking.json";

// Get the current date
const currentDate = new Date();

// Extract day, month, and year from the current date
const day = String(currentDate.getDate()).padStart(2, "0"); // Pad with leading zero if needed
const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
const year = currentDate.getFullYear(); // Full year (4 digits)

// Format the date as dd-mm-yyyy
const formattedDate = `${day}-${month}-${year}`;

// Data for the components section of the navigation menu
const components: { title: string; href: string; description: string }[] = [
  {
    title: "About",
    href: "/about",
    description: "This is about Game Tune Trivia.",
  },
  {
    title: "Legal",
    href: "/legal",
    description: "Perfect harmony with regulations and rights.",
  },
];

// Compute the number of days since October 16, 2024
const startDate = new Date("2025-01-22");
const today = new Date();
// Calculate the difference in time
const diffTime = today.getTime() - startDate.getTime();
// Convert time difference to days
const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
// Ensure we don't request more items than available
const currentGameTuneList = data.slice(0, Math.min(diffDays, data.length));
const todaysTune = currentGameTuneList[currentGameTuneList.length - 1];
const todaysTuneLink = todaysTune.link;

// Define the reset function to clear localStorage
const handleReset = () => {
  localStorage.clear();
};

export function Navbar() {
  const [randomTuneLink, setRandomTuneLink] = useState<any>(
    "/randomTune/" +
      data[Math.floor(Math.random() * data.length)].link.substring(6),
  );
  return (
    <header className="fixed top-0 z-50 w-full bg-background">
      <NavigationMenu className="sticky top-0 object-centermax-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavigationMenuList>
          <Link href="/today">
            <Button variant="ghost" size="icon">
              <HomeIcon />
              <span className="sr-only">Home</span>
            </Button>
          </Link>
          {/* Navigation item for the "Tune Selection" section */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Tune Selection</NavigationMenuTrigger>
            <NavigationMenuContent>
              {/* Grid layout for better organization of the content */}
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                {/* Special list item for today's tune */}
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-secondary hover:bg-accent  from-primary to-destructive p-6 no-underline outline-none focus:shadow-md"
                      href={todaysTuneLink}
                    >
                      <div className="mb-2 mt-4 text-lg font-medium text-white">
                        Todays Tune
                      </div>
                      <p className="text-sm leading-tight text-white">
                        {formattedDate}
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                {/* List items for different sections under "Tune Selection" */}
                <ListItem href="/archive" title="Tune Archive">
                  Your chic sanctuary for game music aficionados.
                </ListItem>
                <ListItem href={randomTuneLink} title="Random Tune">
                  Where serendipity meets unlimited melodies.
                </ListItem>
                <ListItem
                  href="/today"
                  title="Reset Progress"
                  onClick={handleReset}
                >
                  Begin your musical journey anew.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {/* Navigation item for the "About" section */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>About</NavigationMenuTrigger>
            <NavigationMenuContent>
              {/* Grid layout adjusted for different screen sizes */}
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] ">
                {/* Mapping through the components array to display each as a list item */}
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {/* Link to the Documentation page */}
          <NavigationMenuItem></NavigationMenuItem>
          <ModeToggle />
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}

// ListItem component with detailed comments
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(
  // Function component receiving props and ref
  ({ className, title, children, ...props }, ref) => {
    return (
      // List item container
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            // Applying utility classes and any custom className passed as props
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props} // Spreading other props to the anchor element
          >
            {/* Title of the list item */}
            <div className="text-sm font-medium leading-none">{title}</div>
            {/* Description or children of the list item */}
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = "ListItem"; // Setting display name for debugging purposes
