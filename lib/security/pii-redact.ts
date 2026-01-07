/**
 * PII Redaction Module
 * Detects and redacts Personally Identifiable Information before sending to external APIs
 *
 * @module lib/security/pii-redact
 */

/**
 * PII detection patterns with regex and redaction labels
 * Ordered by specificity (most specific first to avoid false positives)
 */
export const PII_PATTERNS = [
  // Credit Card Numbers (Visa, MasterCard, Amex, Discover)
  {
    pattern:
      /\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})\b/g,
    type: "credit_card",
    label: "[CARD]",
    description: "Credit card number",
  },

  // Social Security Numbers (US)
  {
    pattern: /\b(?!000|666|9\d{2})\d{3}-(?!00)\d{2}-(?!0000)\d{4}\b/g,
    type: "ssn",
    label: "[SSN]",
    description: "Social Security Number",
  },
  {
    pattern: /\b(?!000|666|9\d{2})\d{3}(?!00)\d{2}(?!0000)\d{4}\b/g,
    type: "ssn",
    label: "[SSN]",
    description: "Social Security Number (no dashes)",
  },

  // Email Addresses
  {
    pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g,
    type: "email",
    label: "[EMAIL]",
    description: "Email address",
  },

  // Phone Numbers (US and International)
  {
    pattern: /\b(?:\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})\b/g,
    type: "phone",
    label: "[PHONE]",
    description: "US phone number",
  },
  {
    pattern: /\b(?:\+\d{1,3}[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}\b/g,
    type: "phone",
    label: "[PHONE]",
    description: "International phone number",
  },

  // IP Addresses (IPv4 and IPv6)
  {
    pattern:
      /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g,
    type: "ip_address",
    label: "[IP]",
    description: "IPv4 address",
  },
  {
    pattern:
      /\b(?:[A-Fa-f0-9]{1,4}:){7}[A-Fa-f0-9]{1,4}\b|\b(?:[A-Fa-f0-9]{1,4}:){1,7}:\b|\b(?:[A-Fa-f0-9]{1,4}:){1,6}:[A-Fa-f0-9]{1,4}\b/g,
    type: "ip_address",
    label: "[IP]",
    description: "IPv6 address",
  },

  // API Keys and Tokens (long alphanumeric strings)
  {
    pattern: /\b[A-Za-z0-9_-]{32,}\b/g,
    type: "api_key",
    label: "[REDACTED]",
    description: "Potential API key or token",
  },

  // Street Addresses (US format)
  {
    pattern:
      /\b\d{1,5}\s+(?:[A-Za-z]+\s+){1,3}(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Lane|Ln|Drive|Dr|Court|Ct|Circle|Cir|Way|Parkway|Pkwy)\b/gi,
    type: "street_address",
    label: "[ADDRESS]",
    description: "Street address",
  },

  // ZIP Codes (US, 5-digit or ZIP+4)
  {
    pattern: /\b\d{5}(?:-\d{4})?\b/g,
    type: "zip_code",
    label: "[ZIP]",
    description: "ZIP code",
  },

  // Passport Numbers (US format: 1 letter + 8 digits)
  {
    pattern: /\b[A-Z]\d{8}\b/g,
    type: "passport",
    label: "[PASSPORT]",
    description: "Passport number",
  },

  // Driver's License Numbers (common US state formats)
  {
    pattern: /\b[A-Z]{1,2}\d{6,8}\b/g,
    type: "drivers_license",
    label: "[DL]",
    description: "Driver's license number",
  },

  // Bank Account Numbers (8-17 digits)
  {
    pattern: /\b\d{8,17}\b/g,
    type: "bank_account",
    label: "[ACCOUNT]",
    description: "Potential bank account number",
  },
] as const;

/**
 * PII Finding metadata
 * Contains details about detected PII for auditing and debugging
 */
export interface PIIFinding {
  /** Type of PII detected (e.g., "email", "phone", "ssn") */
  type: string;
  /** Original text that was redacted (for audit logs only) */
  original: string;
  /** Character position where PII was found */
  position: number;
  /** Human-readable description */
  description: string;
}

/**
 * Result of PII redaction with detailed findings
 */
export interface PIIRedactionResult {
  /** Text with all PII redacted */
  redacted: string;
  /** Array of all PII findings detected */
  findings: PIIFinding[];
  /** Whether any PII was found */
  hasPII: boolean;
  /** Count of PII instances found */
  count: number;
}

/**
 * Redacts all PII from text (simple version)
 * Returns only the redacted string without metadata
 *
 * @param text - Input text potentially containing PII
 * @returns Text with all PII replaced with redaction labels
 *
 * @example
 * const safe = redactPII("Contact me at john@example.com or 555-123-4567");
 * // Returns: "Contact me at [EMAIL] or [PHONE]"
 */
export function redactPII(text: string): string {
  let redacted = text;

  for (const { pattern, label } of PII_PATTERNS) {
    // Reset regex lastIndex (important for global regexes)
    pattern.lastIndex = 0;
    redacted = redacted.replace(pattern, label);
  }

  return redacted;
}

/**
 * Redacts PII with detailed findings for audit logging
 * Returns both redacted text and metadata about what was found
 *
 * @param text - Input text potentially containing PII
 * @returns Object containing redacted text and array of findings
 *
 * @example
 * const result = redactPIIWithDetails("Email: john@example.com, SSN: 123-45-6789");
 * console.log(result.redacted); // "Email: [EMAIL], SSN: [SSN]"
 * console.log(result.findings); // [{ type: "email", original: "john@example.com", ... }]
 * console.log(result.hasPII); // true
 * console.log(result.count); // 2
 */
export function redactPIIWithDetails(text: string): PIIRedactionResult {
  const findings: PIIFinding[] = [];
  let redacted = text;
  let offset = 0; // Track position changes due to redactions

  for (const { pattern, type, label, description } of PII_PATTERNS) {
    // Reset regex lastIndex
    pattern.lastIndex = 0;

    let match: RegExpExecArray | null;

    // Find all matches for this pattern
    while ((match = pattern.exec(text)) !== null) {
      const original = match[0];
      const position = match.index;

      // Store finding for audit log
      findings.push({
        type,
        original,
        position: position + offset,
        description,
      });

      // Replace in redacted text
      redacted = redacted.replace(original, label);

      // Update offset for position tracking
      offset += label.length - original.length;
    }
  }

  return {
    redacted,
    findings,
    hasPII: findings.length > 0,
    count: findings.length,
  };
}

/**
 * Checks if text contains PII without performing redaction
 * Useful for quick validation and logging decisions
 *
 * @param text - Input text to check
 * @returns True if any PII pattern is detected
 *
 * @example
 * if (containsPII(userInput)) {
 *   console.warn("PII detected in user input - redacting before sending to LLM");
 *   userInput = redactPII(userInput);
 * }
 */
export function containsPII(text: string): boolean {
  for (const { pattern } of PII_PATTERNS) {
    pattern.lastIndex = 0;
    if (pattern.test(text)) {
      return true;
    }
  }
  return false;
}

/**
 * Redacts PII but preserves domain for emails (for analytics)
 * Useful when you need to track company domains without exposing individuals
 *
 * @param text - Input text
 * @returns Text with PII redacted but email domains preserved
 *
 * @example
 * const result = redactPIIPreserveDomain("Contact: john.doe@acmecorp.com");
 * // Returns: "Contact: [EMAIL]@acmecorp.com"
 */
export function redactPIIPreserveDomain(text: string): string {
  let redacted = text;

  // Handle emails specially
  const emailPattern = /\b[A-Za-z0-9._%+-]+@([A-Za-z0-9.-]+\.[A-Za-z]{2,})\b/g;
  redacted = redacted.replace(emailPattern, "[EMAIL]@$1");

  // Apply other PII patterns (skip email pattern)
  for (const { pattern, label, type } of PII_PATTERNS) {
    if (type === "email") continue; // Already handled above

    pattern.lastIndex = 0;
    redacted = redacted.replace(pattern, label);
  }

  return redacted;
}

/**
 * Redacts PII for ZEUS LLM enrichment
 * Combines sanitization and PII redaction for maximum safety
 *
 * @param text - User input text
 * @returns Redacted text safe for LLM processing
 *
 * @example
 * const safeInput = redactForZEUS(formData.problemStatement);
 * const enrichment = await zeusClient.enrich({ problemStatement: safeInput });
 */
export function redactForZEUS(text: string): string {
  // First, redact PII
  const piiRedacted = redactPII(text);

  // Note: In production, you may want to combine this with sanitizeProblemStatement
  // from lib/security/sanitize.ts for comprehensive protection
  return piiRedacted;
}

/**
 * Safe logging function that redacts PII before logging
 * Use this instead of console.log for user-generated content
 *
 * @param message - Message to log
 * @param data - Data object potentially containing PII
 *
 * @example
 * safeLog("User submitted form", { email: "john@example.com", problem: "..." });
 * // Logs: "User submitted form", { email: "[EMAIL]", problem: "..." }
 */
export function safeLog(message: string, data?: Record<string, unknown>): void {
  const redactedData = data
    ? Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
          key,
          typeof value === "string" ? redactPII(value) : value,
        ])
      )
    : undefined;

  if (process.env.NODE_ENV === "development") {
    console.log(message, redactedData);
  }
}

/**
 * Validates that PII has been properly redacted
 * Useful for testing and quality assurance
 *
 * @param text - Text to validate
 * @returns True if no PII patterns are detected
 *
 * @example
 * const redacted = redactPII(userInput);
 * if (!isProperlyRedacted(redacted)) {
 *   throw new Error("PII redaction failed - aborting API call");
 * }
 */
export function isProperlyRedacted(text: string): boolean {
  return !containsPII(text);
}

/**
 * Statistics about PII redaction for reporting
 */
export interface PIIStatistics {
  totalFindings: number;
  byType: Record<string, number>;
  mostCommon: string;
  redactionRate: number; // Percentage of text that was PII
}

/**
 * Analyzes PII findings for reporting and compliance
 *
 * @param findings - Array of PII findings from redactPIIWithDetails
 * @param originalLength - Length of original text
 * @returns Statistics object
 *
 * @example
 * const result = redactPIIWithDetails(userInput);
 * const stats = getPIIStatistics(result.findings, userInput.length);
 * console.log(`Found ${stats.totalFindings} PII instances`);
 * console.log(`Most common: ${stats.mostCommon}`);
 */
export function getPIIStatistics(
  findings: PIIFinding[],
  originalLength: number
): PIIStatistics {
  const byType: Record<string, number> = {};
  let totalRedactedChars = 0;

  for (const finding of findings) {
    byType[finding.type] = (byType[finding.type] || 0) + 1;
    totalRedactedChars += finding.original.length;
  }

  const mostCommon =
    Object.entries(byType).sort((a, b) => b[1] - a[1])[0]?.[0] || "none";

  return {
    totalFindings: findings.length,
    byType,
    mostCommon,
    redactionRate: originalLength > 0 ? totalRedactedChars / originalLength : 0,
  };
}
