import { MultiStepForm } from "@/components/forms/multi-step-form";

export function CTASection() {
  return (
    <section id="contact" className="hero-gradient py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-semibold text-foreground sm:text-4xl">
            Anything is possible.
          </h2>
          <p className="mx-auto mb-4 max-w-2xl text-lg text-muted-foreground">
            Tell us your vision. We'll tell you if we're the right fit.
          </p>
          <p className="mx-auto max-w-2xl text-sm italic text-muted-foreground">
            This isn't a sales form. It's a mutual qualification. We'll ask
            about your vision, your timeline, and what doesn't exist yet. If
            there's a fit, we'll schedule a discovery call.
          </p>
        </div>

        {/* Multi-Step Lead Form */}
        <MultiStepForm />
      </div>
    </section>
  );
}
