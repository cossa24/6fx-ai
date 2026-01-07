import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function Header() {
  const navItems = [
    { name: "The Stack", href: "#cognitive-stack" },
    { name: "How It Works", href: "#learning" },
    { name: "Proof Points", href: "#proof-points" },
    { name: "About", href: "#founders" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-0 text-2xl font-bold">
          <span className="text-trust-midnight dark:text-trust-cloud">6fx</span>
          <span className="text-trust-cyan">.ai</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right Side: Theme Toggle + CTA */}
        <div className="flex items-center gap-4">
          {/* Desktop CTA */}
          <Button asChild className="hidden sm:inline-flex">
            <Link href="#contact">Tell Us Your Vision</Link>
          </Button>

          <ThemeToggle />

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
