import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [levelStatuses, setLevelStatuses] = useState<{ [key: string]: string }>(
    {},
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const statuses: { [key: string]: string } = {};
      items.forEach((item) => {
        const status = localStorage.getItem(
          `levelProgression: ${item.link.substring(6)}`,
        );
        if (status) {
          statuses[item.link] = status;
        }
      });
      setLevelStatuses(statuses);
    }
  }, [items]);

  return (
    <div
      className={cn(
        "grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 py-10",
        className,
      )}
    >
      {items.map((item, idx) => {
        const status = levelStatuses[item.link];

        return (
          <Link
            href={item.link}
            key={item.link}
            className="relative group block p-2 h-full w-full"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-accent dark:bg-accent block rounded-3xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
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

            <Card
              className={cn(
                "bg-background border-black dark:border-white dark:group-hover:border-white hover:border-inherit",
                status === "passed"
                  ? "border-green-600 dark:border-green-600"
                  : status === "failed"
                    ? "border-red-600 dark:border-red-600"
                    : "",
              )}
            >
              <CardTitle>{item.title}</CardTitle>
            </Card>
          </Link>
        );
      })}
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
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-1 overflow-hidden bg-white border border-black group-hover:border-primary dark:bg-background dark:border-accent relative z-20",
        className,
      )}
    >
      <div className="relative z-45">
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
  return (
    <h4
      className={cn(
        "text-zinc font-regular tracking-wide text-center",
        className,
      )}
    >
      {children}
    </h4>
  );
};
