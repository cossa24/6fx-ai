"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { submitLead } from "@/actions/lead.action";
import { useToast } from "@/hooks/use-toast";

// Form schema with step-by-step validation (matches leadFormSchema)
const formSchema = z.object({
  // Step 1: Contact
  firstName: z.string().min(1, "First name is required").max(50).trim(),
  lastName: z.string().min(1, "Last name is required").max(50).trim(),
  email: z.string().email("Invalid email address").toLowerCase().trim(),
  phone: z.string().optional().transform((val) => val?.trim()),

  // Step 2: Company
  companyName: z.string().min(1, "Company name is required").max(100).trim(),
  companySize: z.enum(["1-10", "11-50", "51-200", "201-500", "500+"], {
    required_error: "Please select company size",
  }),
  industry: z.string().min(1, "Industry is required").max(50).trim(),

  // Step 3: Problem
  problemStatement: z
    .string()
    .min(20, "Problem statement must be at least 20 characters")
    .max(1000, "Problem statement must be less than 1000 characters")
    .trim(),
  zeusInterest: z
    .array(z.string())
    .min(1, "Please select at least one area of interest")
    .max(10),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Consent required to proceed" }),
  }),
});

type FormData = z.infer<typeof formSchema>;

const STEPS = [
  { number: 1, title: "Contact Info", description: "Let's start with the basics" },
  { number: 2, title: "Company Details", description: "Tell us about your organization" },
  { number: 3, title: "Your Challenge", description: "What problem can we help solve?" },
];

const ZEUS_INTERESTS = [
  { id: "custom-llms", label: "Custom LLMs" },
  { id: "ai-agents", label: "AI Agents" },
  { id: "compliance", label: "SOC2/GDPR Compliance" },
  { id: "integrations", label: "System Integrations" },
  { id: "consulting", label: "AI Strategy Consulting" },
];

/**
 * Get user-friendly error message based on error code
 */
function getErrorMessage(code: string): string {
  switch (code) {
    case "RATE_LIMITED":
      return "Too many requests. Please wait a minute and try again.";
    case "VALIDATION_ERROR":
      return "Please check your form inputs and try again.";
    case "DATABASE_ERROR":
      return "Something went wrong saving your submission. Please try again.";
    case "UNKNOWN_ERROR":
    default:
      return "An unexpected error occurred. Please try again later.";
  }
}

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      companyName: "",
      companySize: undefined,
      industry: "",
      problemStatement: "",
      zeusInterest: [],
      consent: undefined,
    },
  });

  // Step-specific field validation
  const validateStep = async (step: number): Promise<boolean> => {
    let fieldsToValidate: (keyof FormData)[] = [];

    if (step === 1) {
      fieldsToValidate = ["firstName", "lastName", "email", "phone"];
    } else if (step === 2) {
      fieldsToValidate = ["companyName", "companySize", "industry"];
    } else if (step === 3) {
      fieldsToValidate = ["problemStatement", "zeusInterest", "consent"];
    }

    const result = await form.trigger(fieldsToValidate);
    return result;
  };

  const handleNext = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const result = await submitLead(data);

      if (result.success) {
        // Show success toast
        toast({
          title: "Success!",
          description: "Your submission has been received. We'll be in touch within 24 hours.",
        });
        // Reset form after successful submission
        form.reset();
        // Return to first step
        setCurrentStep(1);
      } else {
        // Show error toast
        toast({
          title: "Submission failed",
          description: getErrorMessage(result.code),
          variant: "destructive",
        });
        setIsSubmitting(false);
      }
    } catch {
      // Handle unexpected errors
      toast({
        title: "Submission failed",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Step Indicators */}
      <div className="mb-8 flex items-center justify-between">
        {STEPS.map((step, idx) => (
          <div key={step.number} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              {/* Step Circle */}
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all",
                  currentStep > step.number
                    ? "border-trust-cyan bg-trust-cyan text-trust-midnight"
                    : currentStep === step.number
                    ? "border-trust-cyan bg-trust-cyan/10 text-trust-cyan"
                    : "border-border bg-background text-muted-foreground"
                )}
              >
                {currentStep > step.number ? (
                  <Check className="h-5 w-5" />
                ) : (
                  step.number
                )}
              </div>
              {/* Step Label */}
              <div className="mt-2 hidden text-center sm:block">
                <p
                  className={cn(
                    "text-sm font-medium",
                    currentStep >= step.number
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {step.title}
                </p>
              </div>
            </div>
            {/* Connector Line */}
            {idx < STEPS.length - 1 && (
              <div
                className={cn(
                  "mx-2 h-0.5 flex-1 transition-all",
                  currentStep > step.number
                    ? "bg-trust-cyan"
                    : "bg-border"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form Card */}
      <div className="glass-card rounded-2xl p-6 sm:p-8">
        {/* Current Step Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-foreground">
            {STEPS[currentStep - 1]?.title}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {STEPS[currentStep - 1]?.description}
          </p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Step 1: Contact Info */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john.doe@company.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Phone <span className="text-muted-foreground">(Optional)</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        We'll only use this for important updates
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 2: Company Details */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Acme Corp" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companySize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Size</FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                        >
                          <option value="">Select company size</option>
                          <option value="1-10">1-10 employees</option>
                          <option value="11-50">11-50 employees</option>
                          <option value="51-200">51-200 employees</option>
                          <option value="201-500">201-500 employees</option>
                          <option value="500+">500+ employees</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., FinTech, Healthcare, E-commerce"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 3: Problem Statement */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="problemStatement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What problem are you trying to solve?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your AI challenges, goals, or use cases..."
                          className="min-h-[120px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {field.value.length}/1000 characters
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zeusInterest"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>What ZEUS services interest you?</FormLabel>
                        <FormDescription>
                          Select all that apply
                        </FormDescription>
                      </div>
                      {ZEUS_INTERESTS.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="zeusInterest"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, item.id])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="consent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I agree to be contacted by the 6fx.ai team
                        </FormLabel>
                        <FormDescription>
                          We'll reach out within 24 hours to discuss your needs
                        </FormDescription>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1 || isSubmitting}
                className={cn(
                  "gap-2",
                  currentStep === 1 && "invisible"
                )}
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>

              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="gap-2"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4" />
                      Submit
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
