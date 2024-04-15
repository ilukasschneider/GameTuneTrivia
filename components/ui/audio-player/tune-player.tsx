import "@/styles/video-container.css";

export function TunePlayer() {
  return (
    <div className="video-container mb-40 mt-12 flex flex-col lg:flex-row items-center justify-center relative top-20 w-full gap-4 mx-auto px-14">
      <iframe
        src="https://www.youtube.com/embed/CXLLbY3otes?controls=0&showinfo=0&rel=0"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
}
