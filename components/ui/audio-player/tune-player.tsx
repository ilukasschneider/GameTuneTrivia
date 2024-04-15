import "@/styles/video-container.css";

export function TunePlayer() {
  return (
    <div className="video-container mb-40 mt-12 flex flex-col lg:flex-row items-center justify-center relative top-20 w-full gap-4 mx-auto px-14">
      <iframe
        src="https://www.youtube.com/embed/13U4oqAZy8U?controls=0&showinfo=0&rel=0"
        title="Kingdom Hearts 2 Main Title Theme"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
}
