export default function About() {
  return (
    <main className="px-4 py-12 md:px-6 md:py-16 lg:py-24">
      <div className="container mx-auto max-w-3xl">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Legal Disclaimer
          </h1>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Use of YouTube Videos as Music Source
          </h2>
          <div className="prose prose-lg dark:prose-invert">
            <p>
              Game Tune Trivia utilizes YouTube videos as a source of music for
              its gaming experience. We acknowledge that the content provided
              through these videos is the property of their respective creators
              and/or copyright holders. Game Tune Trivia does not claim
              ownership of any music or audiovisual content sourced from
              YouTube.
            </p>
            <p>
              Users of Game Tune Trivia should be aware that accessing and
              streaming music via YouTube is subject to YouTube&apos;s Terms of
              Service and the respective copyright laws governing the use of
              third-party content. We encourage users to comply with all
              applicable laws and regulations when using our platform.
            </p>

            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Use of YouTube Videos as Music Source
            </h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                Game Tune Trivia incorporates the IGDB (Internet Game Database)
                API to provide information about video games featured in our
                trivia game. We respect the terms and conditions set forth by
                IGDB and utilize their API in accordance with their guidelines.
              </p>
              <p>
                Please note that while Game Tune Trivia strives to provide
                accurate and up-to-date information about video games, we cannot
                guarantee the completeness or correctness of the data obtained
                from the IGDB API. Users should use the information provided on
                our platform for entertainment purposes only and verify any
                critical details from official sources.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
