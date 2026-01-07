import { createAdminClient } from "./server";

/**
 * Audit log action types
 */
type AuditAction =
  | "lead_created"
  | "lead_enriched"
  | "crm_synced"
  | "rate_limit_exceeded"
  | "validation_failed"
  | "error";

/**
 * Audit log entry structure
 */
interface AuditLogEntry {
  action: AuditAction;
  ip_hash: string;
  payload: Record<string, unknown>;
  success: boolean;
  error_message?: string | null;
}

/**
 * Create an audit log entry in Supabase
 * Uses admin client to bypass RLS
 *
 * @param action - Type of action being logged
 * @param ipHash - SHA-256 hash of user IP address
 * @param payload - Additional data to log (will be JSON stringified)
 * @param success - Whether the action succeeded
 * @param errorMessage - Optional error message if action failed
 * @returns Promise<void>
 */
export async function createAuditLog(
  action: AuditAction,
  ipHash: string,
  payload: Record<string, unknown>,
  success: boolean,
  errorMessage?: string
): Promise<void> {
  const supabase = createAdminClient();

  const logEntry: AuditLogEntry = {
    action,
    ip_hash: ipHash,
    payload,
    success,
    error_message: errorMessage || null,
  };

  const { error } = await supabase.from("audit_logs").insert(logEntry);

  if (error) {
    // Log to console but don't throw - audit failures shouldn't break the main flow
    console.error("Failed to create audit log:", error);
  }
}

/**
 * Query filters for getAuditLogs
 */
interface AuditLogFilters {
  action?: AuditAction;
  success?: boolean;
  limit?: number;
}

/**
 * Retrieve audit logs with optional filters
 * Uses admin client to bypass RLS
 *
 * @param filters - Optional filters (action, success, limit)
 * @returns Promise<AuditLogEntry[]>
 */
export async function getAuditLogs(
  filters: AuditLogFilters = {}
): Promise<AuditLogEntry[]> {
  const supabase = createAdminClient();
  const { action, success, limit = 100 } = filters;

  let query = supabase
    .from("audit_logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (action) {
    query = query.eq("action", action);
  }

  if (success !== undefined) {
    query = query.eq("success", success);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Failed to retrieve audit logs:", error);
    return [];
  }

  return data as AuditLogEntry[];
}
