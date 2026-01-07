export function Founders() {
  const founders = [
    {
      id: "founder-1",
      bio: "30+ years engineering custom government solutions—from zero-trust communications to weapon-mounted systems. Serial entrepreneur in GovCon. Built hundreds of AI applications before hitting the ceiling of commercial LLMs. Spent a year building what didn't exist.",
      tagline: "ZEUS started as a personal tool. A call sign turned code.",
    },
    {
      id: "founder-2",
      bio: "Former government intel operations and pilot. Serial entrepreneur in GovCon consulting and AI flight training systems. PenFed VEP graduate. Didn't just build The Forge for veteran founders—was one.",
      tagline: null,
    },
  ];

  return (
    <section id="founders" className="bg-secondary/30 py-24">
      <div className="container mx-auto px-4">
        {/* Headline */}
        <h2 className="mb-16 text-center text-3xl font-semibold text-foreground sm:text-4xl">
          Built by people who've built before.
        </h2>

        {/* Founder Cards */}
        <div className="mx-auto mb-16 max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2">
            {founders.map((founder) => (
              <div key={founder.id} className="glass-card rounded-lg p-8">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-trust-cyan/20 text-2xl font-bold text-trust-cyan">
                  {founder.id === "founder-1" ? "1" : "2"}
                </div>
                <p className="mb-4 text-lg text-muted-foreground">
                  {founder.bio}
                </p>
                {founder.tagline && (
                  <p className="italic text-foreground">{founder.tagline}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Origin Story */}
        <div className="mx-auto max-w-3xl text-center">
          <h3 className="mb-6 text-2xl font-semibold text-foreground">
            The Origin
          </h3>
          <div className="space-y-6 text-lg text-muted-foreground">
            <p>
              We didn't start with a thesis about AI. We started with a
              limitation.
            </p>

            <p>
              Commercial LLMs have ceilings. Token limits. Capability
              restrictions. They can't adapt to individual users. Can't learn
              and correct themselves. Can't reason across six cognitive layers.
            </p>

            <p className="font-medium text-foreground">
              So we built what they couldn't do. A year in a closed environment.
              Then bigger projects. Then founding 6fx to take ZEUS enterprise.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
