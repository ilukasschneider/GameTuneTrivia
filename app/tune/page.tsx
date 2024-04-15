"use client";

import React from "react";
import ReactPlayer from "react-player";

// Render a YouTube video player

// Component displaying today's tune with an animated canvas reveal effect.
export default function Tune() {
  return (
    <div className="bg-background py-20 flex flex-col lg:flex-row items-center justify-center  w-full gap-4 mx-auto px-12">
      <div className="md:clip-path-inset py-20 flex flex-col lg:flex-row items-center justify-center  w-full gap-4 mx-auto px-12">
        <ReactPlayer
          url="https://www.youtube.com/watch?v=13U4oqAZy8U"
          controls={false}
          config={{
            soundcloud: {
              options: {
                buying: false,
                sharing: false,
                download: false,
                show_artwork: false,
                show_user: false,
              },
            },
            youtube: {
              playerVars: { showinfo: 1 },
            },
          }}
        />
      </div>
    </div>
  );
}
