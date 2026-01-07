export function HeadCoach() {
  const agents = [
    { name: "Research", color: "bg-blue-500/20 border-blue-500/50" },
    { name: "Strategy", color: "bg-purple-500/20 border-purple-500/50" },
    { name: "Operations", color: "bg-green-500/20 border-green-500/50" },
    { name: "Legal", color: "bg-orange-500/20 border-orange-500/50" },
    { name: "Finance", color: "bg-cyan-500/20 border-cyan-500/50" },
  ];

  return (
    <section className="bg-secondary/30 py-24">
      <div className="container mx-auto px-4">
        {/* Headline */}
        <h2 className="mb-12 text-center text-3xl font-semibold text-foreground sm:text-4xl">
          ZEUS doesn't do everything. ZEUS coordinates everything.
        </h2>

        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left: Body Copy */}
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                Think of a football head coach. The HC doesn't play. Doesn't
                coach every position. The HC sets the game plan, monitors
                practice, adjusts from feedback, and makes halftime corrections.
              </p>

              <p className="font-medium text-foreground">
                ZEUS is the head coach of your AI system.
              </p>

              <p>
                Under ZEUS: specialized agents built for your mission. Research.
                Strategy. Operations. Legal. Finance. Whatever your business
                needs.
              </p>

              <p>
                ZEUS sets the plan. The agents execute. User feedback is game
                day. And unlike football—there's no final whistle. Infinite
                cycles. Always adapting.
              </p>
            </div>

            {/* Right: Agent Architecture Visual */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md">
                {/* ZEUS (Head Coach) */}
                <div className="mb-8 flex justify-center">
                  <div className="glass-card w-full max-w-xs rounded-lg border-2 border-trust-cyan bg-trust-cyan/10 p-6 text-center">
                    <div className="mb-2 text-2xl font-bold text-trust-cyan">
                      ZEUS
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Head Coach
                    </div>
                  </div>
                </div>

                {/* Connection Lines */}
                <div className="relative mb-6 h-8">
                  <div className="absolute left-1/2 top-0 h-full w-0.5 bg-border" />
                  <div className="absolute left-0 top-1/2 h-0.5 w-full bg-border" />
                </div>

                {/* Agents */}
                <div className="grid grid-cols-3 gap-3">
                  {agents.map((agent, index) => (
                    <div
                      key={agent.name}
                      className={`rounded-lg border p-4 text-center ${agent.color}`}
                    >
                      <div className="text-sm font-medium text-foreground">
                        {agent.name}
                      </div>
                      {index === 0 && (
                        <div className="mt-1 text-xs text-muted-foreground">
                          Agent
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="flex items-center justify-center rounded-lg border border-dashed border-border p-4 text-center">
                    <div className="text-xs text-muted-foreground">+ More</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
