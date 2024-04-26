import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    link: string;
  }[];
  className?: string;
}) => {
  // Initialize state to track the index of the currently hovered item. Initially, no item is hovered so it's set to null.
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      // Utilize the `cn` function to dynamically generate a class string that combines both predefined classes and any className prop passed to HoverEffect.
      className={cn(
        "grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 py-10",
        className,
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={item?.link} // Use the link associated with the current item for navigation.
          key={item?.link} // Unique key for React's rendering system, using the item's link.
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)} // When mouse enters, set the hoveredIndex to the current item's index.
          onMouseLeave={() => setHoveredIndex(null)} // When mouse leaves, reset hoveredIndex to null.
        >
          <AnimatePresence>
            {hoveredIndex === idx && ( // Render the hover effect only if the current item's index matches hoveredIndex.
              <motion.span
                className="absolute inset-0 h-full w-full bg-accent dark:bg-accent block rounded-3xl"
                layoutId="hoverBackground" // A unique identifier for the motion element to enable shared layout animations.
                initial={{ opacity: 0 }} // Initial animation state before the component mounts.
                animate={{
                  // Animate to these properties once the component has mounted.
                  opacity: 1,
                  transition: { duration: 0.15 }, // Transition duration for the animation.
                }}
                exit={{
                  // Animation properties when the component unmounts.
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.4 }, // Delay the exit animation to ensure smooth transition.
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.title}</CardTitle>
            {/* Display the title of the current item. */}
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  // This component represents a card that displays each item. It accepts children to render inside it.
  return (
    <div
      // Dynamically generate class string with `cn`. It combines predefined styles with any className prop passed to Card.
      className={cn(
        "rounded-2xl h-full w-full p-1 overflow-hidden bg-white border border-black/[0.2] group-hover:border-primary dark:bg-background dark:border-accent dark:group-hover:border-primary relative z-20",
        className,
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
        {/* Render the children passed to Card, typically content or other components. */}
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  // This component is used for rendering the title of each card. It can accept additional className props for styling.
  return (
    <h4 // Render the children within an h4 element, applying additional styles as needed.
      className={cn(
        "text-zinc font-regular tracking-wide text-center",
        className,
      )}
    >
      {children}
    </h4>
  );
};
