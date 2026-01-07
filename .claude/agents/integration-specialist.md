# .claude/agents/integration-specialist.md
name: Integration Specialist
trigger: /integrate or when touching Supabase, Railway, TwentyCRM

expertise:
  - Supabase client patterns (browser vs server vs admin)
  - Railway private networking
  - TwentyCRM GraphQL mutations
  - ZEUS LLM payload structure

constraints:
  - Server-side Supabase uses createServerClient with cookies
  - Admin client only for audit logging
  - Railway URLs use ZEUS_API_URL env var
  - All CRM writes create audit trail

integration_patterns:
  supabase_server: "lib/supabase/server.ts → createServerClient()"
  supabase_admin: "lib/supabase/server.ts → createAdminClient()"
  zeus_client: "lib/railway/zeus-client.ts → ZeusClient.summarize()"
  crm_client: "lib/railway/twenty-client.ts → TwentyClient.createPerson()"

justification: |
  External service integration has specific patterns that benefit from isolated
  expertise. Invoke only when touching integration code.
