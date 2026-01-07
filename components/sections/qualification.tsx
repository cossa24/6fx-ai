import { CheckCircle2 } from "lucide-react";

export function Qualification() {
  const checklistItems = [
    "Does an existing product already solve this?",
    "Is this something genuinely new?",
    "Are you ready to define a 5-year vision?",
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          {/* Headline */}
          <h2 className="mb-8 text-3xl font-semibold text-foreground sm:text-4xl">
            We don't solve every problem.
          </h2>

          {/* Body Copy */}
          <div className="mb-12 space-y-6 text-lg text-muted-foreground">
            <p>
              If an existing solution solves your need, we'll tell you. We'll
              point you to it.
            </p>

            <p>
              6fx is for companies building what doesn't exist yet. Projects
              that are interesting. Solutions that make significant impact by
              doing something completely different.
            </p>

            <p className="font-medium text-foreground">
              We're selective. Not because we can't help—because we want to
              build things that matter.
            </p>
          </div>

          {/* Checklist */}
          <div className="glass-card mx-auto max-w-2xl rounded-lg p-8">
            <h3 className="mb-6 text-xl font-semibold text-foreground">
              Before you reach out, ask yourself:
            </h3>

            <div className="space-y-4 text-left">
              {checklistItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-trust-cyan" />
                  <div className="flex-1">
                    <p className="text-muted-foreground">{item}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-border pt-6">
              <p className="text-lg text-muted-foreground">
                If you answered{" "}
                <span className="font-semibold text-foreground">
                  no, yes, and yes
                </span>
                —let's talk.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
