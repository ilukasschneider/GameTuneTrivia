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
    description: string;
    link: string;
  }[];
  className?: string;
}) => {
  // State to keep track of the current hovered item index
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-3 md:grid-cols-4  lg:grid-cols-6  py-10",
        className,
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={item?.link}
          key={item?.link}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)} // Set the hovered index on mouse enter
          onMouseLeave={() => setHoveredIndex(null)} // Reset the hovered index on mouse leave
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              // Conditional rendering of hover effect based on the hovered index
              <motion.span
                className="absolute inset-0 h-full w-full bg-accent dark:bg-accent block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }} // Initial animation state
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.4 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.title}</CardTitle>
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
  // Card component for displaying each item
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-1 overflow-hidden bg-white border border-black/[0.2] group-hover:border-black/[0.8] dark:bg-background dark:border-white/[0.2] dark:group-hover:border-white/[0.8] relative z-20",
        className,
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
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
  // Component for rendering the title of each card
  return (
    <h4 className={cn("text-zinc font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
