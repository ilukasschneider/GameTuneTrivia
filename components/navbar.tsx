"use client";

import * as React from "react";
import { ModeToggle } from "./mode-toggle";
// Utility function for conditional class names
import { cn } from "@/lib/utils";
// Importing custom icons component

// Importing components and styles from navigation-menu for building a navigation UI
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "./ui/button";
import { HomeIcon } from "@radix-ui/react-icons";
import Link from "next/link";

// Data for the components section of the navigation menu
const components: { title: string; href: string; description: string }[] = [
  {
    title: "About Game Tune Trivia",
    href: "/about",
    description: "Discover the Symphony Behind the Scenes",
  },
  {
    title: "Legal",
    href: "/legal",
    description: "Perfect harmony with regulations and rights.",
  },
];

export function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full bg-transparent">
      <NavigationMenu className="sticky top-0 object-centermax-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavigationMenuList>
          <Link href="/today">
            <Button variant="ghost" size="icon">
              <HomeIcon />
              <span className="sr-only">Home</span>
            </Button>
          </Link>
          {/* Navigation item for the "Getting started" section */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Tune Selection</NavigationMenuTrigger>
            <NavigationMenuContent>
              {/* Grid layout for better organization of the content */}
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                {/* Special list item for the project logo and introduction */}
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-secondary hover:bg-accent  from-primary to-destructive p-6 no-underline outline-none focus:shadow-md"
                      href="/tune"
                    >
                      {/* Project logo */}
                      {/* Project name */}
                      <div className="mb-2 mt-4 text-lg font-medium text-white">
                        Today&apos;s Tune
                      </div>
                      {/* Project description */}
                      <p className="text-sm leading-tight text-white">
                        Embark on a captivating journey of sonic exploration as
                        you endeavor to unlock the melodic enigma woven within
                        today&apos;s Game Tune.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                {/* List items for different sections under "Getting started" */}
                <ListItem href="/archive" title="Tune Archive">
                  Your chic sanctuary for game music aficionados.
                </ListItem>
                <ListItem href="/tune" title="Random Tune">
                  Where serendipity meets melody.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {/* Navigation item for the "Components" section */}
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
