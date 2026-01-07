"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Layer {
  number: number;
  name: string;
  tagline: string;
  description: string;
  color: string;
}

const layers: Layer[] = [
  {
    number: 1,
    name: "Remember",
    tagline: "What it knows.",
    description:
      "Persistent memory across sessions. Not just a context window—real recall that grows with you.",
    color: "hsl(var(--trust-midnight))",
  },
  {
    number: 2,
    name: "Understand",
    tagline: "What it means.",
    description:
      "Intent recognition, semantic parsing. ZEUS understands what you're asking, not just the words you used.",
    color: "hsl(var(--trust-midnight) / 0.9)",
  },
  {
    number: 3,
    name: "Apply",
    tagline: "What to do.",
    description:
      "Execution, tool use, workflow automation. ZEUS doesn't just answer—it acts.",
    color: "hsl(var(--trust-midnight) / 0.8)",
  },
  {
    number: 4,
    name: "Analyze",
    tagline: "What's different.",
    description:
      "Pattern detection, comparison, root cause identification. ZEUS finds what you'd miss.",
    color: "hsl(var(--trust-midnight) / 0.7)",
  },
  {
    number: 5,
    name: "Evaluate",
    tagline: "What's right.",
    description:
      "Judgment, risk assessment, quality scoring. ZEUS will tell you when you're wrong—with receipts.",
    color: "hsl(var(--trust-midnight) / 0.6)",
  },
  {
    number: 6,
    name: "Create",
    tagline: "What's new.",
    description:
      "Synthesis, novel solutions, original output. ZEUS doesn't remix—it reasons through to something new.",
    color: "hsl(var(--trust-cyan))",
  },
];

export function CognitiveStack() {
  const [activeLayer, setActiveLayer] = useState<number>(6);

  return (
    <section id="cognitive-stack" className="bg-secondary/30 py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-semibold text-foreground sm:text-4xl">
            Six effects. That's where the name comes from.
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Most AI operates at layers 1 and 2—retrieve and classify. ZEUS
            activates all six.
          </p>
        </div>

        {/* Interactive Stack */}
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left: Layer Stack */}
            <div className="space-y-2">
              {[...layers].reverse().map((layer) => (
                <motion.button
                  key={layer.number}
                  onClick={() => setActiveLayer(layer.number)}
                  className={`relative w-full rounded-lg border p-6 text-left transition-all ${
                    activeLayer === layer.number
                      ? "border-trust-cyan bg-trust-cyan/10"
                      : "border-border bg-background/50 hover:border-trust-cyan/50"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-semibold ${
                        activeLayer === layer.number
                          ? "bg-trust-cyan text-trust-midnight"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {layer.number}
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`mb-1 text-xl font-semibold ${
                          activeLayer === layer.number
                            ? "text-trust-cyan"
                            : "text-foreground"
                        }`}
                      >
                        {layer.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {layer.tagline}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Right: Active Layer Description */}
            <div className="flex items-center lg:min-h-[400px]">
              <AnimatePresence mode="wait">
                {layers
                  .filter((layer) => layer.number === activeLayer)
                  .map((layer) => (
                    <motion.div
                      key={layer.number}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="glass-card w-full p-8"
                    >
                      <div className="mb-4 flex items-center gap-4">
                        <div
                          className="flex h-16 w-16 items-center justify-center rounded-full bg-trust-cyan text-2xl font-bold text-trust-midnight"
                          style={{
                            backgroundColor:
                              layer.number === 6
                                ? "hsl(var(--trust-cyan))"
                                : undefined,
                          }}
                        >
                          {layer.number}
                        </div>
                        <div>
                          <h3 className="text-2xl font-semibold text-foreground">
                            {layer.name}
                          </h3>
                          <p className="text-sm text-trust-cyan">
                            {layer.tagline}
                          </p>
                        </div>
                      </div>
                      <p className="text-lg leading-relaxed text-muted-foreground">
                        {layer.description}
                      </p>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <div className="mx-auto mt-12 max-w-3xl text-center">
          <p className="text-sm italic text-muted-foreground">
            The learning cycle flows backward through the stack. Create →
            Evaluate → Analyze. You don't label data. You just use it. Your use
            becomes the training signal.
          </p>
        </div>
      </div>
    </section>
  );
}
