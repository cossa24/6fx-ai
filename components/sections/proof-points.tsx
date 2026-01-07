export function ProofPoints() {
  const products = [
    {
      name: "The Forge",
      description:
        "Every agent a founder needs—from research to legal to bizdev—in one voice-enabled interface.",
    },
    {
      name: "H12",
      description: "Government contract and congressional consulting.",
    },
    {
      name: "Dodona",
      description: "GovCon bids and proposals.",
    },
    {
      name: "SamSearch",
      description: "AI-powered RFP/RFI/Sources Sought identification.",
    },
  ];

  return (
    <section id="proof-points" className="py-24">
      <div className="container mx-auto px-4">
        {/* Headline */}
        <h2 className="mb-16 text-center text-3xl font-semibold text-foreground sm:text-4xl">
          ZEUS in production.
        </h2>

        {/* Featured Case: PenFed Foundation */}
        <div className="mx-auto mb-16 max-w-4xl">
          <div className="glass-card rounded-lg p-8 md:p-12">
            <div className="mb-6 inline-block rounded-full bg-trust-cyan/10 px-4 py-1.5 text-sm font-medium text-trust-cyan">
              Featured: PenFed Foundation
            </div>

            <div className="space-y-6 text-lg">
              <div>
                <h3 className="mb-3 font-semibold text-foreground">
                  The Challenge
                </h3>
                <p className="text-muted-foreground">
                  The PenFed Foundation runs a national veteran entrepreneur
                  program. Veterans building businesses are busy—too busy to
                  type commands and fill forms.
                </p>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-foreground">
                  The Solution
                </h3>
                <p className="text-muted-foreground">
                  The Forge—a ZEUS-powered application giving solo founders an
                  entire AI team through one interface. Twenty agents (research,
                  strategy, legal, finance, marketing...) accessible through a
                  single Executive Assistant.
                </p>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-foreground">
                  The Innovation
                </h3>
                <p className="text-muted-foreground">
                  Jarvis-enabled voice interaction. The program president
                  watched founders struggle with typing and asked: "Can they
                  just talk to it?"
                </p>
                <p className="mt-3 font-medium text-trust-cyan">
                  Now they can.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Portfolio */}
        <div className="mx-auto max-w-5xl">
          <h3 className="mb-8 text-center text-2xl font-semibold text-foreground">
            Portfolio
          </h3>

          <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <div
                key={product.name}
                className="rounded-lg border border-border bg-background/50 p-6 transition-colors hover:border-trust-cyan/50"
              >
                <h4 className="mb-3 text-lg font-semibold text-foreground">
                  {product.name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {product.description}
                </p>
              </div>
            ))}
          </div>

          <p className="text-center text-sm italic text-muted-foreground">
            Plus internal and customer-specific builds across government
            contracting, lobbying, sports betting, and personal finance.
          </p>
        </div>
      </div>
    </section>
  );
}
