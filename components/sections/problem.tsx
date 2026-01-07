export function Problem() {
  return (
    <section className="py-24">
      <div className="container mx-auto max-w-3xl px-4 text-center">
        {/* Headline */}
        <h2 className="mb-8 text-3xl font-semibold text-foreground sm:text-4xl">
          AI that works for everyone works for no one.
        </h2>

        {/* Body Copy */}
        <div className="space-y-6 text-lg text-muted-foreground">
          <p>
            Commercial LLMs are trained on the masses. They predict the most
            probable response—not the right one for you.
          </p>

          <p>
            They hit ceilings. Token limits. Context windows. Capability
            restrictions. They can't learn your business. They can't adapt to
            how you work. They certainly can't push back when you're wrong.
          </p>

          <p>
            You don't need another tool optimized for average. You need
            intelligence that fits{" "}
            <span className="font-medium text-foreground">you</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
