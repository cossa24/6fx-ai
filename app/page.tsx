import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
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

export const metadata: Metadata = {
  title: "6fx.ai - LLMs predict. ZEUS reasons.",
  description:
    "Six cognitive layers working in sequence—from memory to creation. Not a chatbot. Not a copilot. A reasoning engine that becomes your mini-me.",
  keywords: [
    "AI reasoning",
    "cognitive AI",
    "ZEUS",
    "6fx cognitive stack",
    "custom AI applications",
    "AI agents",
    "self-taught AI",
    "enterprise AI",
  ],
  openGraph: {
    title: "6fx.ai - LLMs predict. ZEUS reasons.",
    description:
      "Six cognitive layers working in sequence. A reasoning engine that becomes your mini-me.",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Main Content */}
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

      {/* Footer */}
      <Footer />
    </>
  );
}
