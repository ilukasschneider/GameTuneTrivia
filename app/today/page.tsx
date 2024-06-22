import { TodaysTune } from "@/components/ui/todays-tune/todays-tune";

export default function Page() {
  return (
    <div className="mt-40">
      <div className="place-content-center grid gap-3 mt-40">
        <iframe
          className="scrollbar-none"
          src="http://127.0.0.1:4000/docs/cloudAdmin/news/de/#release-highlights---version-21"
          width="400"
          height="400"
        ></iframe>
      </div>

      <div className="place-content-center grid gap-3 mt-40">test</div>
    </div>
  );
}
