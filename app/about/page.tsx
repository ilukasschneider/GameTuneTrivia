export default function About() {
  return (
    <main className="px-4 py-12 md:px-6 md:py-16 lg:py-24 overflow-hidden">
      <div className="container mx-auto max-w-3xl mt-20">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Game Tune Trivia
          </h1>
          <div className="prose prose-lg dark:prose-invert">
            <p>
              This is a project born from my first journey into Next.js and
              full-stack development. This is my first attempt at creating a web
              app, blending my passion for video game soundtracks with the
              thrill of learning something new. I would also like to give credit
              to{" "}
              <a href="https://www.maxemitchell.com/code_art/unknown_lines">
                Max E. Mitchell
              </a>{" "}
              for his audio visualizer, Unknown Lines which I used in my
              project. Thank you for this amazing tool!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
