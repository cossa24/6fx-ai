"use server";

import { headers } from "next/headers";
import { leadFormSchema, ActionResponse, ErrorCode } from "@/types/schemas";
import { createServerClient } from "@/lib/supabase/server";
import { createAuditLog } from "@/lib/supabase/audit";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { sanitizeProblemStatement } from "@/lib/security/sanitize";
import { hashString } from "@/lib/utils";
import { syncLeadToCRM } from "@/lib/crm/twenty";

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
    console.log("[submitLead] Starting submission...");

    // Get IP address from headers
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const realIp = headersList.get("x-real-ip");
    const ip = forwardedFor?.split(",")[0] || realIp || "unknown";
    console.log("[submitLead] IP:", ip);

    // Hash IP address for privacy
    const ipHash = await hashString(ip);
    console.log("[submitLead] IP hashed successfully");

    // Check rate limit
    console.log("[submitLead] Checking rate limit...");
    const rateLimitResult = await checkRateLimit(ipHash);
    console.log("[submitLead] Rate limit result:", rateLimitResult);
    if (!rateLimitResult.success) {
      await createAuditLog("rate_limit_exceeded", ipHash, {}, false);

      return {
        success: false,
        error: `Rate limit exceeded. Try again in ${Math.ceil((rateLimitResult.reset - Date.now()) / 1000)} seconds.`,
        code: ErrorCode.RATE_LIMITED,
      };
    }

    // Validate form data
    console.log("[submitLead] Validating form data...");
    const validationResult = leadFormSchema.safeParse(formData);
    if (!validationResult.success) {
      console.error("[submitLead] Validation failed:", validationResult.error.errors);
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
    console.log("[submitLead] Validation passed");

    // Sanitize problem statement
    console.log("[submitLead] Sanitizing problem statement...");
    const sanitizationResult = sanitizeProblemStatement(
      validatedData.problemStatement
    );
    console.log("[submitLead] Sanitization result:", { flagged: sanitizationResult.flagged });

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
    console.log("[submitLead] Connecting to Supabase...");
    const supabase = await createServerClient();

    console.log("[submitLead] Inserting lead into database...");
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
      console.error("[submitLead] Database error:", dbError);
      await createAuditLog(
        "error",
        ipHash,
        { error: dbError?.message || "Unknown database error" },
        false,
        dbError?.message
      );

      // Check for duplicate email error
      if (dbError?.message?.includes("duplicate key value violates unique constraint") &&
          dbError?.message?.includes("leads_email_key")) {
        return {
          success: false,
          error: "This email address has already been submitted. If you need to update your information, please contact us.",
          code: ErrorCode.VALIDATION_ERROR,
        };
      }

      return {
        success: false,
        error: "Failed to save your submission. Please try again.",
        code: ErrorCode.DATABASE_ERROR,
      };
    }

    console.log("[submitLead] Lead saved successfully:", leadData.id);

    // Sync to CRM (non-blocking)
    let crmResult = { companyId: null as string | null, personId: null as string | null, noteId: null as string | null };
    try {
      console.log("[submitLead] Syncing to TwentyCRM...");
      crmResult = await syncLeadToCRM({
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        phone: validatedData.phone,
        companyName: validatedData.companyName,
        companySize: validatedData.companySize,
        industry: validatedData.industry,
        problemStatement: sanitizationResult.sanitized,
        zeusInterest: validatedData.zeusInterest,
      });

      // Update lead with CRM ID if sync succeeded
      if (crmResult.personId) {
        console.log("[submitLead] CRM sync successful, updating lead record...");
        try {
          await supabase
            .from("leads")
            .update({ crm_synced: true, crm_id: crmResult.personId })
            .eq("id", leadData.id);
        } catch (updateError) {
          console.warn("[submitLead] Could not update lead with CRM ID:", updateError);
          // Continue - CRM sync succeeded even if we couldn't update the tracking fields
        }
      }

      // Audit CRM sync
      if (crmResult.personId) {
        await createAuditLog("crm_synced", ipHash, {
          leadId: leadData.id,
          crmPersonId: crmResult.personId,
          crmCompanyId: crmResult.companyId,
          crmNoteId: crmResult.noteId
        }, true);
        console.log("[submitLead] CRM sync completed successfully");
      } else {
        console.warn("[submitLead] CRM sync returned no person ID");
      }
    } catch (crmError) {
      console.error("[submitLead] CRM sync failed:", crmError);
      // Don't fail the lead submission if CRM sync fails
      await createAuditLog("error", ipHash, {
        leadId: leadData.id,
        error: crmError instanceof Error ? crmError.message : "CRM sync failed"
      }, false);
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
    console.error("[submitLead] Unexpected error caught:", error);
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
