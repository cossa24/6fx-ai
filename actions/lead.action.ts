"use server";

import { headers } from "next/headers";
import { leadFormSchema, ActionResponse, ErrorCode } from "@/types/schemas";
import { createServerClient } from "@/lib/supabase/server";
import { createAuditLog } from "@/lib/supabase/audit";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { sanitizeProblemStatement } from "@/lib/security/sanitize";
import { hashString } from "@/lib/utils";

/**
 * Submit lead form data
 * Server action with rate limiting, validation, sanitization, and audit logging
 *
 * @param formData - Raw form data from client
 * @returns ActionResponse with lead ID or error
 */
export async function submitLead(
  formData: unknown
): Promise<ActionResponse<{ id: string }>> {
  try {
    // Get IP address from headers
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const realIp = headersList.get("x-real-ip");
    const ip = forwardedFor?.split(",")[0] || realIp || "unknown";

    // Hash IP address for privacy
    const ipHash = await hashString(ip);

    // Check rate limit
    const rateLimitResult = await checkRateLimit(ipHash);
    if (!rateLimitResult.success) {
      await createAuditLog("rate_limit_exceeded", ipHash, {}, false);

      return {
        success: false,
        error: `Rate limit exceeded. Try again in ${Math.ceil((rateLimitResult.reset - Date.now()) / 1000)} seconds.`,
        code: ErrorCode.RATE_LIMITED,
      };
    }

    // Validate form data
    const validationResult = leadFormSchema.safeParse(formData);
    if (!validationResult.success) {
      await createAuditLog(
        "validation_failed",
        ipHash,
        { errors: validationResult.error.errors },
        false
      );

      return {
        success: false,
        error: "Validation failed. Please check your input.",
        code: ErrorCode.VALIDATION_ERROR,
      };
    }

    const validatedData = validationResult.data;

    // Sanitize problem statement
    const sanitizationResult = sanitizeProblemStatement(
      validatedData.problemStatement
    );

    if (sanitizationResult.flagged) {
      await createAuditLog(
        "validation_failed",
        ipHash,
        {
          reason: "unsafe_content",
          flags: sanitizationResult.flags,
        },
        false
      );

      return {
        success: false,
        error: "Your submission contains potentially unsafe content. Please revise and try again.",
        code: ErrorCode.VALIDATION_ERROR,
      };
    }

    // Save lead to Supabase
    const supabase = await createServerClient();

    const { data: leadData, error: dbError } = await supabase
      .from("leads")
      .insert({
        first_name: validatedData.firstName,
        last_name: validatedData.lastName,
        email: validatedData.email,
        phone: validatedData.phone || null,
        company_name: validatedData.companyName,
        company_size: validatedData.companySize,
        industry: validatedData.industry,
        problem_statement: sanitizationResult.sanitized,
        zeus_interest: validatedData.zeusInterest,
        ip_hash: ipHash,
        consent_given: validatedData.consent,
      })
      .select("id")
      .single();

    if (dbError || !leadData) {
      await createAuditLog(
        "error",
        ipHash,
        { error: dbError?.message || "Unknown database error" },
        false,
        dbError?.message
      );

      return {
        success: false,
        error: "Failed to save your submission. Please try again.",
        code: ErrorCode.DATABASE_ERROR,
      };
    }

    // Create successful audit log
    await createAuditLog(
      "lead_created",
      ipHash,
      {
        lead_id: leadData.id,
        company: validatedData.companyName,
        industry: validatedData.industry,
      },
      true
    );

    return {
      success: true,
      data: { id: leadData.id },
    };
  } catch (error) {
    // Get IP hash for audit log (best effort)
    let ipHash = "unknown";
    try {
      const headersList = await headers();
      const forwardedFor = headersList.get("x-forwarded-for");
      const realIp = headersList.get("x-real-ip");
      const ip = forwardedFor?.split(",")[0] || realIp || "unknown";
      ipHash = await hashString(ip);
    } catch {
      // Ignore errors getting IP hash
    }

    // Log unexpected error
    await createAuditLog(
      "error",
      ipHash,
      { error: error instanceof Error ? error.message : "Unknown error" },
      false,
      error instanceof Error ? error.message : "Unknown error"
    );

    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
      code: ErrorCode.UNKNOWN_ERROR,
    };
  }
}
