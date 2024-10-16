export default function About() {
  return (
    <main className="px-4 py-12 md:px-6 md:py-16 lg:py-24 mt-20">
      <div className="container mx-auto max-w-3xl">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Game Tune Trivia
          </h1>
          <div className="prose prose-lg dark:prose-invert">
            <p>
              This is a project born from my first journey into Next.js and
              full-stack development. This is my first attempt at creating a web
              app, blending my passion for video game soundtracks with the
              thrill of learning something new.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
