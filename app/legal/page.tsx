export default function About() {
  return (
    <main className="px-4 py-12 md:px-6 md:py-16 lg:py-24 overflow-hidden">
      <div className="container mx-auto max-w-3xl mt-20">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Legal Disclaimer
          </h1>
          <div className="prose prose-lg dark:prose-invert">
            <p>
              Game Tune Trivia utilizes YouTube videos as a source of music. We
              acknowledge that the content provided through these videos is the
              property of their respective creators and/or copyright holders.
              Game Tune Trivia does not claim ownership of any music or
              audiovisual content sourced from YouTube.
            </p>
            <p>
              Users of Game Tune Trivia should be aware that accessing and
              streaming music via YouTube is subject to YouTube&apos;s Terms of
              Service and the respective copyright laws governing the use of
              third-party content.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
