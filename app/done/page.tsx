export default function Done() {
  return (
    <main className="px-4 py-12 md:px-6 md:py-16 lg:py-24 overflow-hidden">
      <div className="container mx-auto max-w-3xl mt-20">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            100% Completion
          </h1>
          <div className="prose prose-lg dark:prose-invert">
            <p>
              You managed to solve all the tunes - maybe reset and go again?
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
