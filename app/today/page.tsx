"use client";
import { GlareCard } from "@/components/ui/glare-card";
import Link from "next/link";
import data from "@/lib/trivia-linking.json";

// Compute the number of days since October 13, 2024
const startDate = new Date("2024-10-13");
const today = new Date();
// Calculate the difference in time
const diffTime = today.getTime() - startDate.getTime();
// Convert time difference to days
const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
// Ensure we don't request more items than available
const currentGameTuneList = data.slice(0, Math.min(diffDays, data.length));
const todaysTune = currentGameTuneList[currentGameTuneList.length - 1];
const todaysTuneLink = todaysTune.link;

const currentDate = new Date();

// Extract day, month, and year
const day = String(currentDate.getDate()).padStart(2, "0"); // Pad with leading zero if needed
const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
const year = currentDate.getFullYear(); // Full year (4 digits)

// Format the date as dd-mm-yyyy
const formattedDate = `${day}-${month}-${year}`;

export default function Page() {
  return (
    <div className="overflow-hidden">
      <div className="place-content-center grid gap-3 mt-40">
        <Link href={todaysTuneLink}>
          <GlareCard className="flex flex-col items-start justify-end py-8 px-6">
            <p className="font-bold text-lg"> {formattedDate}</p>
            <p className="font-normal mt-4">
              Test your music knowledge and conquer today’s tune!
            </p>
          </GlareCard>
        </Link>
      </div>
    </div>
  );
}
