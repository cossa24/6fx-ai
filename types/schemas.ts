import { z } from "zod";

/**
 * Lead Form Schema - Multi-step form validation
 * Matches the structure in components/forms/multi-step-form.tsx
 */
export const leadFormSchema = z.object({
  // Step 1: Contact Information
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters")
    .trim(),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters")
    .trim(),
  email: z
    .string()
    .email("Invalid email address")
    .toLowerCase()
    .trim(),
  phone: z
    .string()
    .optional()
    .transform((val) => val?.trim()),

  // Step 2: Company Details
  companyName: z
    .string()
    .min(1, "Company name is required")
    .max(100, "Company name must be less than 100 characters")
    .trim(),
  companySize: z.enum(["1-10", "11-50", "51-200", "201-500", "500+"], {
    required_error: "Please select company size",
    invalid_type_error: "Invalid company size",
  }),
  industry: z
    .string()
    .min(1, "Industry is required")
    .max(50, "Industry must be less than 50 characters")
    .trim(),

  // Step 3: Problem Statement
  problemStatement: z
    .string()
    .min(20, "Problem statement must be at least 20 characters")
    .max(1000, "Problem statement must be less than 1000 characters")
    .trim(),
  zeusInterest: z
    .array(z.string())
    .min(1, "Please select at least one area of interest")
    .max(10, "Too many interests selected"),
  consent: z.boolean().refine((val) => val === true, {
    message: "Consent required to proceed",
  }),
});

/**
 * LLM Summarization Schema - ZEUS response validation
 * Used for AI-powered lead enrichment and analysis
 */
export const llmSummarizationSchema = z.object({
  summary: z
    .string()
    .min(10, "Summary too short")
    .max(500, "Summary too long"),
  sentiment: z.enum(["positive", "neutral", "negative"], {
    required_error: "Sentiment analysis required",
  }),
  urgency: z.enum(["low", "medium", "high"], {
    required_error: "Urgency assessment required",
  }),
  keywords: z
    .array(z.string())
    .min(1, "At least one keyword required")
    .max(10, "Too many keywords"),
  suggestedNextStep: z
    .string()
    .min(10, "Suggested next step too short")
    .max(200, "Suggested next step too long"),
});

/**
 * Audit Log Entry Schema - Compliance and debugging
 * Tracks all critical actions in the lead pipeline
 */
export const auditLogEntrySchema = z.object({
  id: z.string().uuid("Invalid UUID format"),
  timestamp: z.string().datetime("Invalid ISO 8601 datetime"),
  action: z.enum(
    ["lead_created", "lead_enriched", "crm_synced", "error"],
    {
      required_error: "Action type required",
    }
  ),
  ipHash: z
    .string()
    .length(64, "IP hash must be SHA-256 (64 chars)")
    .regex(/^[a-f0-9]{64}$/, "Invalid SHA-256 hash format"),
  payload: z.record(z.unknown()).default({}),
  success: z.boolean(),
  errorMessage: z.string().optional(),
});

/**
 * Inferred TypeScript Types
 * Use these for type-safe function signatures and state management
 */
export type LeadFormData = z.infer<typeof leadFormSchema>;
export type LLMSummarization = z.infer<typeof llmSummarizationSchema>;
export type AuditLogEntry = z.infer<typeof auditLogEntrySchema>;

/**
 * Error Code Enum
 * Standardized error codes for consistent error handling
 */
export const ErrorCode = {
  VALIDATION_ERROR: "VALIDATION_ERROR",
  RATE_LIMITED: "RATE_LIMITED",
  LLM_ERROR: "LLM_ERROR",
  CRM_ERROR: "CRM_ERROR",
  DATABASE_ERROR: "DATABASE_ERROR",
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
} as const;

export type ErrorCodeType = (typeof ErrorCode)[keyof typeof ErrorCode];

/**
 * Generic Action Response Type
 * Discriminated union for type-safe success/error handling
 *
 * @example
 * const result: ActionResponse<LeadFormData> = await submitLead(data);
 * if (result.success) {
 *   console.log(result.data); // TypeScript knows this exists
 * } else {
 *   console.error(result.error, result.code); // TypeScript knows these exist
 * }
 */
export type ActionResponse<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
      code: ErrorCodeType;
    };

/**
 * Extended schemas for specific use cases
 */

// Partial schema for draft saving (all fields optional except email)
export const leadDraftSchema = leadFormSchema
  .partial()
  .required({ email: true });

// Schema for rate limiting metadata
export const rateLimitMetadataSchema = z.object({
  limit: z.number().int().positive(),
  remaining: z.number().int().nonnegative(),
  reset: z.number().int().positive(),
  ipHash: z.string().length(64),
});

export type LeadDraft = z.infer<typeof leadDraftSchema>;
export type RateLimitMetadata = z.infer<typeof rateLimitMetadataSchema>;
