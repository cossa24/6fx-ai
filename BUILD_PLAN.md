# 6fx.ai Landing Page Rebuild Plan
## Content-First Architecture

---

## Content Reference

**Primary Source:** `CONTENT_DECK.md`

All copy, messaging, and voice/tone guidelines are extracted from founder Q&A sessions and documented in the content deck. Reference that file for exact copy and brand guidelines.

**Voice & Tone:**
- Direct, no hedging
- Plain language (no jargon-for-jargon's-sake)
- Confident without arrogant
- ZEUS is a co-founder, not a tool
- "Anything is possible" isn't hype—it's an invitation

---

## Component Mapping

| Section | Component Path | Status |
|---------|----------------|--------|
| Hero | `components/sections/hero.tsx` | Update copy |
| The Problem | `components/sections/problem.tsx` | Create new |
| 6fx Stack | `components/sections/cognitive-stack.tsx` | Create new (replaces zeus-showcase) |
| How ZEUS Learns | `components/sections/learning.tsx` | Create new |
| Head Coach | `components/sections/head-coach.tsx` | Create new |
| The Inversion | `components/sections/inversion.tsx` | Create new |
| The Process | `components/sections/process.tsx` | Create new |
| Proof Points | `components/sections/proof-points.tsx` | Create new (replaces social-proof) |
| The Founders | `components/sections/founders.tsx` | Create new |
| Qualification | `components/sections/qualification.tsx` | Create new |
| CTA | `components/sections/cta-section.tsx` | Create new (form integration) |

---

## Page Structure

```
app/page.tsx
├── Header
├── Hero (updated)
├── Problem (new)
├── CognitiveStack (new - interactive 6fx pyramid)
├── Learning (new)
├── HeadCoach (new)
├── Inversion (new)
├── Process (new)
├── ProofPoints (new)
├── Founders (new)
├── Qualification (new)
├── CTASection (new - with questionnaire form)
└── Footer
```

---

## Section Specifications

### 1. Hero (UPDATE)

**File:** `components/sections/hero.tsx`

```tsx
Badge: "The 6fx Cognitive Stack"
Headline: "LLMs predict. ZEUS reasons."
Subheadline: "Six cognitive layers working in sequence—from memory to creation. Not a chatbot. Not a copilot. A reasoning engine that becomes your mini-me."
Primary CTA: "Tell Us Your Vision" → #contact
Secondary CTA: "See How ZEUS Thinks" → #cognitive-stack
Trust indicators: SOC2 Type II | Zero-Trust Architecture | PenFed Foundation Partner
```

Keep: hero-gradient background, animation classes
Remove: "Powered by ZEUS" badge text (replace with "The 6fx Cognitive Stack")

---

### 2. Problem (NEW)

**File:** `components/sections/problem.tsx`

Server component. Simple typography-focused section.

```
Headline: "AI that works for everyone works for no one."

Body (3 paragraphs):
P1: "Commercial LLMs are trained on the masses. They predict the most probable response—not the right one for you."

P2: "They hit ceilings. Token limits. Context windows. Capability restrictions. They can't learn your business. They can't adapt to how you work. They certainly can't push back when you're wrong."

P3: "You don't need another tool optimized for average. You need intelligence that fits you."
```

Styling:
- py-24
- max-w-3xl mx-auto text-center
- Headline: text-3xl sm:text-4xl font-semibold text-foreground
- Body: text-lg text-muted-foreground, paragraphs spaced with space-y-6
- Optional: subtle emphasis on "you" in final line (text-foreground font-medium)

---

### 3. Cognitive Stack (NEW - INTERACTIVE)

**File:** `components/sections/cognitive-stack.tsx`

Client component ("use client") with hover/click interaction.

```
Section ID: cognitive-stack (for anchor link)
Headline: "Six effects. That's where the name comes from."
Subheadline: "Most AI operates at layers 1 and 2—retrieve and classify. ZEUS activates all six."
```

**Interactive Pyramid/Stack:**
- 6 layers displayed as stacked bars or pyramid
- Each layer clickable/hoverable
- Active layer shows expanded description
- Default: Layer 6 (Create) highlighted

**Layer Data:**
```typescript
const layers = [
  {
    number: 1,
    name: "Remember",
    tagline: "What it knows.",
    description: "Persistent memory across sessions. Not just a context window—real recall that grows with you.",
    color: "trust-midnight" // darkest at bottom
  },
  {
    number: 2,
    name: "Understand",
    tagline: "What it means.",
    description: "Intent recognition, semantic parsing. ZEUS understands what you're asking, not just the words you used.",
    color: "trust-midnight/90"
  },
  {
    number: 3,
    name: "Apply",
    tagline: "What to do.",
    description: "Execution, tool use, workflow automation. ZEUS doesn't just answer—it acts.",
    color: "trust-midnight/80"
  },
  {
    number: 4,
    name: "Analyze",
    tagline: "What's different.",
    description: "Pattern detection, comparison, root cause identification. ZEUS finds what you'd miss.",
    color: "trust-midnight/70"
  },
  {
    number: 5,
    name: "Evaluate",
    tagline: "What's right.",
    description: "Judgment, risk assessment, quality scoring. ZEUS will tell you when you're wrong—with receipts.",
    color: "trust-midnight/60"
  },
  {
    number: 6,
    name: "Create",
    tagline: "What's new.",
    description: "Synthesis, novel solutions, original output. ZEUS doesn't remix—it reasons through to something new.",
    color: "trust-cyan" // brightest at top
  }
];
```

**Footer text:**
"The learning cycle flows backward through the stack. Create → Evaluate → Analyze. You don't label data. You just use it. Your use becomes the training signal."

Styling:
- py-24 bg-secondary/30
- Pyramid should be visually striking - the centerpiece of the page
- Use framer-motion for layer transitions
- Mobile: stack as vertical list with expandable cards

---

### 4. Learning (NEW)

**File:** `components/sections/learning.tsx`

Server component.

```
Headline: "Your co-founder, not your yes-man."

Body:
"ZEUS uses STaSC—Self-Taught Self-Correction. It learns from its own outputs, validated against real-time knowledge graphs and source verification.

Nothing is absolute in ZEUS's memory. Every piece of knowledge stays open to revision.

When you say X, and new data proves Y, ZEUS doesn't defer to you. It arbitrates. Validates. And tells you when you're wrong—with proof.

That's not a chatbot. That's a partner."

Pull Quote:
"'That's a bold statement. Where's the proof?'
The first question we heard when demonstrating ZEUS. And ZEUS answered—with sources."
```

Styling:
- py-24
- Two-column on desktop: body left, pull quote right (glass-card)
- Pull quote: italic, border-l-4 border-trust-cyan, pl-6

---

### 5. Head Coach (NEW)

**File:** `components/sections/head-coach.tsx`

Server component with visual.

```
Headline: "ZEUS doesn't do everything. ZEUS coordinates everything."

Body:
"Think of a football head coach. The HC doesn't play. Doesn't coach every position. The HC sets the game plan, monitors practice, adjusts from feedback, and makes halftime corrections.

ZEUS is the head coach of your AI system.

Under ZEUS: specialized agents built for your mission. Research. Strategy. Operations. Legal. Finance. Whatever your business needs.

ZEUS sets the plan. The agents execute. User feedback is game day. And unlike football—there's no final whistle. Infinite cycles. Always adapting."
```

**Visual:** Simple org chart showing ZEUS at top, agents below
- Can be SVG or styled divs
- Animate on scroll (fade in)

Styling:
- py-24 bg-secondary/30
- Text left, visual right on desktop
- Mobile: stack vertically

---

### 6. Inversion (NEW)

**File:** `components/sections/inversion.tsx`

Server component with comparison table.

```
Headline: "Software asks you to conform. We conform to you."

Body:
"Every SaaS company asks the same question: how do we get users to fit our product?

6fx asks the opposite: how do we fit the product to your mission?

We don't build one-size-fits-all. We build one-size-fits-one. ZEUS and its agents are configured—or built from scratch—around your specific objectives, your workflows, your people.

And because you'll grow and change, so does ZEUS. New agents. Adapted capabilities. The application evolves with you."
```

**Comparison Table:**
| Traditional SaaS | 6fx |
|------------------|-----|
| You adapt to the product | The product adapts to you |
| Locked feature set | Agents built for your mission |
| Static after purchase | Evolves as you grow |
| Designed for average | Designed for *you* |

Styling:
- py-24
- Table: glass-card, clean borders
- "6fx" column values in text-trust-cyan or font-medium
- Italicize "you" in last row

---

### 7. Process (NEW)

**File:** `components/sections/process.tsx`

Server component with stepped layout.

```
Headline: "We start with your 5-year vision."

Body:
"Most vendors ask 'what's your problem today?'

We ask: 'What does success look like in five years? And why?'

Then we work backward to zero.

We spend more time understanding your company than ZEUS spends building the application. The application is the easy part. Mapping the vision—across C-suite, middle management, and end users—that's where we invest.

Because ZEUS isn't the engine that replaces your company. ZEUS is the flywheel that accelerates where you're already going."
```

**Process Steps:**
1. Vision - "Define the 5-year destination. What would your ideal system do? Why does it matter?"
2. Discovery - "Map the real company—not the org chart. C-level vision. Middle-management reality. End-user workflows. Warts and all."
3. Architecture - "Design the ZEUS configuration. Which agents? What capabilities? Build or buy decisions made with you."
4. Deployment - "From simple single-pane interfaces to full agentic systems. Scoped to your actual need."
5. Evolution - "You grow, ZEUS grows. New agents, adapted capabilities, continuous learning."

Styling:
- py-24 bg-secondary/30
- Steps as numbered cards or timeline
- Each step: number (large, trust-cyan), title (font-semibold), description (text-muted-foreground)

---

### 8. Proof Points (NEW)

**File:** `components/sections/proof-points.tsx`

Server component.

```
Headline: "ZEUS in production."
```

**Featured Case: PenFed Foundation**
```
Challenge: "The PenFed Foundation runs a national veteran entrepreneur program. Veterans building businesses are busy—too busy to type commands and fill forms."

Solution: "The Forge—a ZEUS-powered application giving solo founders an entire AI team through one interface. Twenty agents (research, strategy, legal, finance, marketing...) accessible through a single Executive Assistant."

Innovation: "Jarvis-enabled voice interaction. The program president watched founders struggle with typing and asked: 'Can they just talk to it?' Now they can."
```

**Product Portfolio (4 cards):**
- The Forge: "Every agent a founder needs—from research to legal to bizdev—in one voice-enabled interface."
- H12: "Government contract and congressional consulting."
- Dodona: "GovCon bids and proposals."
- SamSearch: "AI-powered RFP/RFI/Sources Sought identification."

Footer: "*Plus internal and customer-specific builds across government contracting, lobbying, sports betting, and personal finance.*"

Styling:
- py-24
- Featured case: large card, glass-card styling
- Portfolio: 4-column grid on desktop, 2x2 on tablet, stack on mobile
- Product cards: smaller, border border-border

---

### 9. Founders (NEW)

**File:** `components/sections/founders.tsx`

Server component.

```
Headline: "Built by people who've built before."
```

**Founder 1:**
"30+ years engineering custom government solutions—from zero-trust communications to weapon-mounted systems. Serial entrepreneur in GovCon. Built hundreds of AI applications before hitting the ceiling of commercial LLMs. Spent a year building what didn't exist.

ZEUS started as a personal tool. A call sign turned code."

**Founder 2:**
"Former government intel operations and pilot. Serial entrepreneur in GovCon consulting and AI flight training systems. PenFed VEP graduate. Didn't just build The Forge for veteran founders—was one."

**Origin Block:**
"We didn't start with a thesis about AI. We started with a limitation.

Commercial LLMs have ceilings. Token limits. Capability restrictions. They can't adapt to individual users. Can't learn and correct themselves. Can't reason across six cognitive layers.

So we built what they couldn't do. A year in a closed environment. Then bigger projects. Then founding 6fx to take ZEUS enterprise."

Styling:
- py-24 bg-secondary/30
- Two founder cards side by side (or stacked mobile)
- Origin block below, centered, max-w-3xl
- No photos needed (can add placeholder or initials)

---

### 10. Qualification (NEW)

**File:** `components/sections/qualification.tsx`

Server component.

```
Headline: "We don't solve every problem."

Body:
"If an existing solution solves your need, we'll tell you. We'll point you to it.

6fx is for companies building what doesn't exist yet. Projects that are interesting. Solutions that make significant impact by doing something completely different.

We're selective. Not because we can't help—because we want to build things that matter."
```

**Checklist:**
"Before you reach out, ask yourself:
- Does an existing product already solve this?
- Is this something genuinely new?
- Are you ready to define a 5-year vision?

If you answered no, yes, and yes—let's talk."

Styling:
- py-24
- max-w-3xl mx-auto text-center
- Checklist: left-aligned within centered container, checkmark or bullet icons

---

### 11. CTA Section (NEW)

**File:** `components/sections/cta-section.tsx`

Server component wrapper with form.

```
Section ID: contact
Headline: "Anything is possible."
Subheadline: "Tell us your vision. We'll tell you if we're the right fit."
CTA context: "This isn't a sales form. It's a mutual qualification. We'll ask about your vision, your timeline, and what doesn't exist yet. If there's a fit, we'll schedule a discovery call."
```

Embed: MultiStepForm (updated with new context)

Styling:
- py-24 bg-trust-midnight text-trust-cloud (dark section for contrast)
- Or: hero-gradient inverted
- Headline: text-4xl font-semibold
- Form: glass-card on dark background

---

## Files to Delete/Replace

| File | Action |
|------|--------|
| `components/bento/zeus-showcase.tsx` | ✅ Deleted (replaced by cognitive-stack) |
| `components/sections/social-proof.tsx` | ✅ Deleted (replaced by proof-points) |

---

## Updated app/page.tsx Structure

```tsx
import { Header } from "@/components/layout/header";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { CognitiveStack } from "@/components/sections/cognitive-stack";
import { Learning } from "@/components/sections/learning";
import { HeadCoach } from "@/components/sections/head-coach";
import { Inversion } from "@/components/sections/inversion";
import { Process } from "@/components/sections/process";
import { ProofPoints } from "@/components/sections/proof-points";
import { Founders } from "@/components/sections/founders";
import { Qualification } from "@/components/sections/qualification";
import { CTASection } from "@/components/sections/cta-section";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <CognitiveStack />
        <Learning />
        <HeadCoach />
        <Inversion />
        <Process />
        <ProofPoints />
        <Founders />
        <Qualification />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
```

---

## Build Order for CC

Execute in this sequence:

1. ⬜ Update `components/sections/hero.tsx` with new copy
2. ⬜ Create `components/sections/problem.tsx`
3. ⬜ Create `components/sections/cognitive-stack.tsx` (interactive)
4. ⬜ Create `components/sections/learning.tsx`
5. ⬜ Create `components/sections/head-coach.tsx`
6. ⬜ Create `components/sections/inversion.tsx`
7. ⬜ Create `components/sections/process.tsx`
8. ⬜ Create `components/sections/proof-points.tsx`
9. ⬜ Create `components/sections/founders.tsx`
10. ⬜ Create `components/sections/qualification.tsx`
11. ⬜ Create `components/sections/cta-section.tsx`
12. ⬜ Update `app/page.tsx` to assemble all sections
13. ✅ Delete old files (zeus-showcase, social-proof)
14. ⬜ Update header nav links if needed
15. ⬜ Test full page flow

---

## Validation Checkpoints

After each section:
- `pnpm type-check` - TypeScript validation
- `pnpm build` - Production build test
- Visual review at localhost:3000

After full assembly:
- Mobile responsiveness check
- Dark mode check
- Scroll/anchor behavior
- Form functionality

---

## Notes

- All server components by default (no "use client" unless interactive)
- Interactive components: CognitiveStack (layer selection)
- Form integration: CTASection embeds MultiStepForm
- Anchor links: Hero → #cognitive-stack, Hero → #contact
- Typography hierarchy: Consistent h2/h3 sizing across sections
- Glass-card components: Learning pull quote, ProofPoints cards
- Color palette: trust-midnight, trust-cyan, trust-cloud from tailwind.config
- Animation: framer-motion for CognitiveStack, scroll animations where appropriate
