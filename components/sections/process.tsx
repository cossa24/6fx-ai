export function Process() {
  const steps = [
    {
      number: 1,
      title: "Vision",
      description:
        "Define the 5-year destination. What would your ideal system do? Why does it matter?",
    },
    {
      number: 2,
      title: "Discovery",
      description:
        "Map the real company—not the org chart. C-level vision. Middle-management reality. End-user workflows. Warts and all.",
    },
    {
      number: 3,
      title: "Architecture",
      description:
        "Design the ZEUS configuration. Which agents? What capabilities? Build or buy decisions made with you.",
    },
    {
      number: 4,
      title: "Deployment",
      description:
        "From simple single-pane interfaces to full agentic systems. Scoped to your actual need.",
    },
    {
      number: 5,
      title: "Evolution",
      description:
        "You grow, ZEUS grows. New agents, adapted capabilities, continuous learning.",
    },
  ];

  return (
    <section className="bg-secondary/30 py-24">
      <div className="container mx-auto px-4">
        {/* Headline */}
        <h2 className="mb-12 text-center text-3xl font-semibold text-foreground sm:text-4xl">
          We start with your 5-year vision.
        </h2>

        {/* Body Copy */}
        <div className="mx-auto mb-16 max-w-3xl space-y-6 text-center text-lg text-muted-foreground">
          <p>
            Most vendors ask "what's your problem today?"
          </p>

          <p className="font-medium text-foreground">
            We ask: "What does success look like in five years? And why?"
          </p>

          <p>Then we work backward to zero.</p>

          <p>
            We spend more time understanding your company than ZEUS spends
            building the application. The application is the easy part. Mapping
            the vision—across C-suite, middle management, and end users—that's
            where we invest.
          </p>

          <p>
            Because ZEUS isn't the engine that replaces your company. ZEUS is
            the flywheel that accelerates where you're already going.
          </p>
        </div>

        {/* Process Steps */}
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`glass-card rounded-lg p-6 ${
                  step.number === 5 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-trust-cyan text-2xl font-bold text-trust-midnight">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                </div>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
