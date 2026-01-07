export function Inversion() {
  const comparisons = [
    {
      traditional: "You adapt to the product",
      sixfx: "The product adapts to you",
    },
    {
      traditional: "Locked feature set",
      sixfx: "Agents built for your mission",
    },
    {
      traditional: "Static after purchase",
      sixfx: "Evolves as you grow",
    },
    {
      traditional: "Designed for average",
      sixfx: (
        <>
          Designed for <em>you</em>
        </>
      ),
    },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        {/* Headline */}
        <h2 className="mb-12 text-center text-3xl font-semibold text-foreground sm:text-4xl">
          Software asks you to conform. We conform to you.
        </h2>

        {/* Body Copy */}
        <div className="mx-auto mb-12 max-w-3xl space-y-6 text-center text-lg text-muted-foreground">
          <p>
            Every SaaS company asks the same question: how do we get users to
            fit our product?
          </p>

          <p className="font-medium text-foreground">
            6fx asks the opposite: how do we fit the product to your mission?
          </p>

          <p>
            We don't build one-size-fits-all. We build one-size-fits-
            <em className="text-foreground">one</em>. ZEUS and its agents are
            configured—or built from scratch—around your specific objectives,
            your workflows, your people.
          </p>

          <p>
            And because you'll grow and change, so does ZEUS. New agents.
            Adapted capabilities. The application evolves with you.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="mx-auto max-w-3xl">
          <div className="glass-card overflow-hidden rounded-lg">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-4 text-left text-sm font-semibold text-muted-foreground">
                    Traditional SaaS
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-trust-cyan">
                    6fx
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-border last:border-0"
                  >
                    <td className="p-4 text-muted-foreground">
                      {row.traditional}
                    </td>
                    <td className="p-4 font-medium text-trust-cyan">
                      {row.sixfx}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
