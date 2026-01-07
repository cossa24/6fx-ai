/**
 * Manual test cases for PII redaction functions
 * Run these to verify PII detection and redaction
 */

import {
  redactPII,
  redactPIIWithDetails,
  containsPII,
  redactPIIPreserveDomain,
  isProperlyRedacted,
  getPIIStatistics,
} from "./pii-redact";

console.log("=== PII Redaction Test Suite ===\n");

// Test Case 1: Email addresses
console.log("=== Test 1: Email Addresses ===");
const test1 = redactPII("Contact me at john.doe@company.com or jane@example.org");
console.log("Input:", "Contact me at john.doe@company.com or jane@example.org");
console.log("Redacted:", test1);
console.log("Expected:", "Contact me at [EMAIL] or [EMAIL]");
console.log("");

// Test Case 2: Phone numbers (various formats)
console.log("=== Test 2: Phone Numbers ===");
const test2 = redactPII(
  "Call 555-123-4567 or (555) 987-6543 or +1-555-111-2222"
);
console.log("Input:", "Call 555-123-4567 or (555) 987-6543 or +1-555-111-2222");
console.log("Redacted:", test2);
console.log("Expected:", "Call [PHONE] or [PHONE] or [PHONE]");
console.log("");

// Test Case 3: SSN
console.log("=== Test 3: Social Security Numbers ===");
const test3 = redactPII("My SSN is 123-45-6789 and hers is 987654321");
console.log("Input:", "My SSN is 123-45-6789 and hers is 987654321");
console.log("Redacted:", test3);
console.log("Expected:", "My SSN is [SSN] and hers is [SSN]");
console.log("");

// Test Case 4: Credit card numbers
console.log("=== Test 4: Credit Card Numbers ===");
const test4 = redactPII(
  "Visa: 4532015112830366, Amex: 378282246310005, MC: 5425233430109903"
);
console.log("Input:", "Visa: 4532015112830366, Amex: 378282246310005, MC: 5425233430109903");
console.log("Redacted:", test4);
console.log("Expected:", "Visa: [CARD], Amex: [CARD], MC: [CARD]");
console.log("");

// Test Case 5: IP addresses
console.log("=== Test 5: IP Addresses ===");
const test5 = redactPII("Server at 192.168.1.1 and 2001:0db8:85a3:0000:0000:8a2e:0370:7334");
console.log("Input:", "Server at 192.168.1.1 and 2001:0db8:85a3:0000:0000:8a2e:0370:7334");
console.log("Redacted:", test5);
console.log("Expected:", "Server at [IP] and [IP]");
console.log("");

// Test Case 6: Street addresses
console.log("=== Test 6: Street Addresses ===");
const test6 = redactPII("Office at 123 Main Street or 456 Oak Avenue");
console.log("Input:", "Office at 123 Main Street or 456 Oak Avenue");
console.log("Redacted:", test6);
console.log("Expected:", "Office at [ADDRESS] or [ADDRESS]");
console.log("");

// Test Case 7: API keys
console.log("=== Test 7: API Keys ===");
const test7 = redactPII(
  "API key: sk_test_EXAMPLEKEY1234567890ABCDEF or ghp_EXAMPLETOKEN1234567890ABCDEF"
);
console.log("Input:", "API key: sk_test_EXAMPLEKEY1234567890ABCDEF or ghp_EXAMPLETOKEN1234567890ABCDEF");
console.log("Redacted:", test7);
console.log("Expected:", "API key: [REDACTED] or [REDACTED]");
console.log("");

// Test Case 8: Mixed PII
console.log("=== Test 8: Mixed PII ===");
const test8Input = `
Name: John Doe
Email: john.doe@acmecorp.com
Phone: 555-123-4567
SSN: 123-45-6789
Address: 123 Main Street
Card: 4532015112830366
`;
const test8 = redactPII(test8Input);
console.log("Input:", test8Input);
console.log("Redacted:", test8);
console.log("");

// Test Case 9: Detailed redaction with findings
console.log("=== Test 9: Detailed Redaction ===");
const test9 = redactPIIWithDetails(
  "Contact john@example.com at 555-1234 or visit 123 Main St"
);
console.log("Input:", "Contact john@example.com at 555-1234 or visit 123 Main St");
console.log("Redacted:", test9.redacted);
console.log("Has PII:", test9.hasPII);
console.log("Count:", test9.count);
console.log("Findings:");
test9.findings.forEach((f, i) => {
  console.log(`  ${i + 1}. Type: ${f.type}, Original: ${f.original}, Position: ${f.position}`);
});
console.log("");

// Test Case 10: containsPII check
console.log("=== Test 10: Contains PII Check ===");
const test10a = containsPII("My email is test@example.com");
const test10b = containsPII("I need help with AI development");
console.log("Contains PII (should be true):", test10a);
console.log("Contains PII (should be false):", test10b);
console.log("");

// Test Case 11: Preserve domain
console.log("=== Test 11: Preserve Email Domain ===");
const test11 = redactPIIPreserveDomain(
  "Contact sales@acmecorp.com or support@techflow.io"
);
console.log("Input:", "Contact sales@acmecorp.com or support@techflow.io");
console.log("Redacted:", test11);
console.log("Expected:", "Contact [EMAIL]@acmecorp.com or [EMAIL]@techflow.io");
console.log("");

// Test Case 12: Proper redaction validation
console.log("=== Test 12: Validation ===");
const test12Input = "Email: john@example.com, Phone: 555-1234";
const test12Redacted = redactPII(test12Input);
const test12Valid = isProperlyRedacted(test12Redacted);
console.log("Original:", test12Input);
console.log("Redacted:", test12Redacted);
console.log("Properly redacted:", test12Valid);
console.log("");

// Test Case 13: PII Statistics
console.log("=== Test 13: PII Statistics ===");
const test13Input = `
Contact: john@example.com
Phone: 555-123-4567
SSN: 123-45-6789
Card: 4532015112830366
Another email: jane@company.com
`;
const test13Result = redactPIIWithDetails(test13Input);
const test13Stats = getPIIStatistics(test13Result.findings, test13Input.length);
console.log("Original text length:", test13Input.length);
console.log("Total PII findings:", test13Stats.totalFindings);
console.log("By type:", test13Stats.byType);
console.log("Most common:", test13Stats.mostCommon);
console.log("Redaction rate:", (test13Stats.redactionRate * 100).toFixed(2) + "%");
console.log("");

// Test Case 14: Clean input (no PII)
console.log("=== Test 14: Clean Input ===");
const test14 = redactPII(
  "We need to build a custom LLM for healthcare with HIPAA compliance"
);
console.log("Input:", "We need to build a custom LLM for healthcare with HIPAA compliance");
console.log("Redacted:", test14);
console.log("Should be unchanged:", test14 === "We need to build a custom LLM for healthcare with HIPAA compliance");
console.log("");

// Test Case 15: Edge cases
console.log("=== Test 15: Edge Cases ===");
const test15a = redactPII("Email: not-an-email@");
const test15b = redactPII("Phone: 123"); // Too short
const test15c = redactPII("SSN: 000-00-0000"); // Invalid SSN
console.log("Invalid email (should not redact):", test15a);
console.log("Too short phone (should not redact):", test15b);
console.log("Invalid SSN (should not redact):", test15c);
console.log("");

console.log("=== All Tests Complete ===");

// Export for use in other test files
export const testCases = {
  email: "john.doe@company.com",
  phone: "555-123-4567",
  ssn: "123-45-6789",
  creditCard: "4532015112830366",
  ipv4: "192.168.1.1",
  address: "123 Main Street",
  apiKey: "sk_test_EXAMPLEKEY1234567890ABCDEF",
};
