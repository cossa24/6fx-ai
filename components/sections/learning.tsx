export function Learning() {
  return (
    <section id="learning" className="py-24">
      <div className="container mx-auto px-4">
        {/* Headline */}
        <h2 className="mb-12 text-center text-3xl font-semibold text-foreground sm:text-4xl">
          Your co-founder, not your yes-man.
        </h2>

        {/* Two-column layout */}
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left: Body Copy */}
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                ZEUS uses STaSC—Self-Taught Self-Correction. It learns from its
                own outputs, validated against real-time knowledge graphs and
                source verification.
              </p>

              <p>
                Nothing is absolute in ZEUS's memory. Every piece of knowledge
                stays open to revision.
              </p>

              <p>
                When you say X, and new data proves Y, ZEUS doesn't defer to
                you. It arbitrates. Validates. And tells you when you're
                wrong—with proof.
              </p>

              <p className="font-medium text-foreground">
                That's not a chatbot. That's a partner.
              </p>
            </div>

            {/* Right: Pull Quote */}
            <div className="flex items-center">
              <blockquote className="glass-card border-l-4 border-trust-cyan p-8">
                <p className="mb-4 text-lg italic text-foreground">
                  "That's a bold statement. Where's the proof?"
                </p>
                <p className="text-base text-muted-foreground">
                  The first question we heard when demonstrating ZEUS. And ZEUS
                  answered—with sources.
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
