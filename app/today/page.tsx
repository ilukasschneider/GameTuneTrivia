import { TodaysTune } from "@/components/ui/todays-tune/todays-tune";
import Link from "next/link";
export default function Page() {
  return (
    <div className="max-w-5xl relative top-12 mx-auto px-20">
      <Link href="/tune">
        <TodaysTune />
      </Link>
    </div>
  );
}
