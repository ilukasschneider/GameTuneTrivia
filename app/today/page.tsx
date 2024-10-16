"use client";
import { GlareCard } from "@/components/ui/glare-card";
import Link from "next/link";
import data from "@/lib/trivia-linking.json";

const todaysTune = data[data.length - 1];
const todaysTuneLink = todaysTune.link;

export default function Page() {
  return (
    <div className="mt-40">
      <div className="place-content-center grid gap-3 mt-40">
        <Link href={todaysTuneLink}>
          <GlareCard className="flex flex-col items-start justify-end py-8 px-6">
            <p className="font-bold text-lg">Todays Tune</p>
            <p className="font-normal mt-4">
              Test your music knowledge and conquer today’s tune!
            </p>
          </GlareCard>
        </Link>
      </div>
    </div>
  );
}
