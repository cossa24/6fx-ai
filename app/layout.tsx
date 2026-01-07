import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

export const metadata: Metadata = {
  title: "6fx.ai | Enterprise AI Development",
  description: "Custom LLM solutions with ZEUS. SOC2 compliant, GDPR ready.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://6fx.ai"
  ),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#EDE7E3" }, // Cloud Dancer
    { media: "(prefers-color-scheme: dark)", color: "#1A1F2E" },  // Navy Charcoal
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
