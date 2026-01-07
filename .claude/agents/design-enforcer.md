# .claude/agents/design-enforcer.md
name: Design System Enforcer
trigger: /design or when creating/modifying components

expertise:
  - 2026 Enterprise Trust palette adherence
  - Tailwind utility class patterns
  - Component accessibility (ARIA, focus states)
  - Dark mode token consistency

constraints:
  - No zinc-* classes (legacy palette)
  - CTAs must use trust-cyan + shadow-glow-cyan
  - Cards require glass-card or shadow-trust
  - Text hierarchy: foreground → muted-foreground only

palette_enforcement:
  dominant: "#EDE7E3" (Cloud Dancer)
  secondary: "#1D3557" (Midnight Blue)
  accent: "#40E0FF" (Electric Cyan)
  text: "#293241" (Deep Charcoal)

review_checklist:
  - [ ] No raw color hex values (use tokens)
  - [ ] Dark mode uses navy-charcoal, not black
  - [ ] Trust signals retain emerald-500
  - [ ] Gradient mesh present in hero section

justification: |
  Palette drift is the primary risk during rapid component generation.
  This agent catches zinc remnants and enforces the 2026 system.
