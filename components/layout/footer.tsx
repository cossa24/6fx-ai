import Link from "next/link";
import { Linkedin, Twitter, Github } from "lucide-react";

export function Footer() {
  const productLinks = [
    { name: "ZEUS Architecture", href: "#cognitive-stack" },
    { name: "The Forge", href: "#proof-points" },
  ];

  const companyLinks = [
    { name: "About", href: "#founders" },
    { name: "Contact", href: "#contact" },
  ];

  const legalLinks = [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
  ];

  const socialLinks = [
    { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
    { name: "Twitter", href: "https://twitter.com", icon: Twitter },
    { name: "GitHub", href: "https://github.com", icon: Github },
  ];

  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 - Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-0 text-2xl font-bold">
              <span className="text-trust-midnight dark:text-trust-cloud">6fx</span>
              <span className="text-trust-cyan">.ai</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Six Effects. One Reasoning Engine.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2 - Product */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Product</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © 2026 6fx.ai. All rights reserved.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-sm text-muted-foreground">SOC2 Type II</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-sm text-muted-foreground">
                Zero-Trust Architecture
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-sm text-muted-foreground">Veteran Owned</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
