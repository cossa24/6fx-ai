import { MultiStepForm } from "@/components/forms/multi-step-form";

export default function DemoFormPage() {
  return (
    <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-semibold text-foreground">
          Get Started with ZEUS
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Tell us about your AI needs and we'll get back to you within 24 hours
          with a customized solution.
        </p>
      </div>

      {/* Multi-Step Form */}
      <MultiStepForm />
    </main>
  );
}
