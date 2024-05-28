import "@/styles/video-container.css";

export function YTPlayer({ video_id }: { video_id: string }) {
  return (
    <div className="video-container mb-40 mt-12 flex flex-col lg:flex-row items-center justify-center relative top-20 w-full gap-4 mx-auto px-14">
      <iframe
        src={`https://www.youtube.com/embed/${video_id}`}
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
}
