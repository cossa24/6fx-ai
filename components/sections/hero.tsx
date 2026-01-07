import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const trustIndicators = [
    { label: "SOC2 Type II" },
    { label: "Zero-Trust Architecture" },
    { label: "PenFed Foundation Partner" },
  ];

  return (
    <section className="hero-gradient flex min-h-[80vh] items-center">
      <div className="container mx-auto max-w-4xl px-4 text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex animate-fade-in">
          <div className="glass-card flex items-center gap-2 rounded-full px-4 py-1.5">
            <Sparkles className="h-4 w-4 text-trust-cyan" />
            <span className="text-sm font-medium text-foreground">
              The 6fx Cognitive Stack
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="mb-6 animate-slide-up text-4xl font-semibold text-foreground sm:text-5xl md:text-6xl">
          LLMs predict. ZEUS reasons.
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mb-8 max-w-2xl animate-slide-up text-lg text-muted-foreground">
          Six cognitive layers working in sequence—from memory to creation. Not
          a chatbot. Not a copilot. A reasoning engine that becomes your
          mini-me.
        </p>

        {/* Dual CTA Buttons */}
        <div className="mb-12 flex flex-col items-center justify-center gap-4 animate-slide-up sm:flex-row">
          <Button size="lg" asChild>
            <Link href="#contact">Tell Us Your Vision</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#cognitive-stack">See How ZEUS Thinks</Link>
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 animate-fade-in text-sm text-muted-foreground">
          {trustIndicators.map((indicator) => (
            <div key={indicator.label} className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>{indicator.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
