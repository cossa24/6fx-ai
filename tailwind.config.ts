import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			trust: {
  				cloud: '#EDE7E3',
  				midnight: '#1D3557',
  				cyan: '#40E0FF',
  				charcoal: '#293241',
  				muted: '#5C6B7A',
  				navy: '#1A1F2E'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-geist-sans)',
  				'system-ui',
  				'sans-serif'
  			],
  			mono: [
  				'var(--font-geist-mono)',
  				'monospace'
  			]
  		},
  		boxShadow: {
  			'trust-sm': '0 1px 3px rgba(29, 53, 87, 0.06), 0 2px 6px rgba(29, 53, 87, 0.04)',
  			'trust': '0 2px 8px rgba(29, 53, 87, 0.08), 0 4px 12px rgba(29, 53, 87, 0.06)',
  			'trust-lg': '0 4px 16px rgba(29, 53, 87, 0.1), 0 12px 32px rgba(29, 53, 87, 0.08)',
  			'glow-cyan': '0 0 20px rgba(64, 224, 255, 0.4)',
  			'glow-cyan-lg': '0 0 40px rgba(64, 224, 255, 0.3), 0 0 80px rgba(64, 224, 255, 0.15)'
  		},
  		backgroundImage: {
  			'gradient-trust': 'linear-gradient(135deg, #1D3557 0%, #40E0FF 100%)',
  			'gradient-hero': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(29, 53, 87, 0.15), transparent)',
  			'gradient-mesh': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(29, 53, 87, 0.15), transparent), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(64, 224, 255, 0.08), transparent), radial-gradient(ellipse 50% 50% at 20% 80%, rgba(29, 53, 87, 0.05), transparent)'
  		},
  		animation: {
  			'fade-in': 'fadeIn 0.5s ease-out forwards',
  			'slide-up': 'slideUp 0.5s ease-out forwards',
  			'slide-down': 'slideDown 0.3s ease-out forwards',
  			'glow-pulse': 'glowPulse 2s ease-in-out infinite'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			slideUp: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			slideDown: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(-10px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			glowPulse: {
  				'0%, 100%': {
  					boxShadow: '0 0 20px rgba(64, 224, 255, 0.4)'
  				},
  				'50%': {
  					boxShadow: '0 0 40px rgba(64, 224, 255, 0.6)'
  				}
  			}
  		}
  	}
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};

export default config;
