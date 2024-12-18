import "@/styles/video-container.css";

export function YTPlayer({ video_id }: { video_id: string }) {
  return (
    <div className="video-container mb-40 mt-12 flex flex-col lg:flex-row items-center justify-center relative top-20 w-full gap-4 mx-auto px-14">
      <iframe
        src={`https://www.youtube.com/embed/${video_id}?controls=1&showinfo=0&rel=0&autoplay=1&playsinline=1&volume=70`}
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
}
