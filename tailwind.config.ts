const config = {
  // Force inclusion of custom classes that may not be detected by content scan
  safelist: [
    "animate-leaderboard-row",
    "animate-fade-up",
    "animate-glow-pulse",
    "animate-score-tick",
  ],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        /* ── SAK brand palette ─────────────────────────────────── */
        sak: {
          dark:    "#0C1220",   // deep ink navy — base dark surface
          darker:  "#080D18",   // even deeper — page background
          card:    "#151B2B",   // elevated dark card surface
          hover:   "#1E2538",   // interactive hover / input bg
          border:  "#262D3D",   // subtle borders on dark surfaces
        },
        brand: {
          red:     "#E8372C",   // primary action / energy accent
          gold:    "#F0A030",   // reward / achievement / premium
          navy:    "#0C1220",   // redundant alias for sak-dark
        },
        surface: {
          light:   "#F5F6F8",   // warm gray background (light mode)
          card:    "#FFFFFF",   // white cards on warm gray
        },

        /* ── Legacy NFL aliases (kept for backward compat) ───── */
        nfl: {
          red:     "#0C1220",   // was #013369 — remapped to dark navy
          blue:    "#E8372C",   // was #D50A0A — remapped to brand red
          green:   "#008E97",
          orange:  "#FF8C00",
          purple:  "#4B0082",
          gold:    "#F0A030",   // warmer amber
        },

        /* ── NFL team colors (unchanged) ───────────────────────── */
        team: {
          chiefs: "#E31837",
          raiders: "#000000",
          chargers: "#0080C6",
          broncos: "#FB4F14",
          patriots: "#002244",
          bills: "#00338D",
          dolphins: "#008E97",
          jets: "#125740",
          steelers: "#FFB612",
          browns: "#311D00",
          bengals: "#FB4F14",
          ravens: "#241773",
          texans: "#03202F",
          colts: "#002C5F",
          jaguars: "#101820",
          titans: "#0C2340",
          cowboys: "#003594",
          eagles: "#004C54",
          giants: "#0B2265",
          commanders: "#5A1414",
          packers: "#203731",
          vikings: "#4F2683",
          bears: "#0B162A",
          lions: "#0076B6",
          falcons: "#A71930",
          panthers: "#0085CA",
          saints: "#D3BC8D",
          buccaneers: "#D50A0A",
          seahawks: "#002244",
          rams: "#003594",
          cardinals: "#97233F",
          "49ers": "#AA0000",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Urbanist", "system-ui", "sans-serif"],
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      boxShadow: {
        card: "0 4px 24px -4px rgba(0,0,0,0.25), 0 8px 48px -8px rgba(0,0,0,0.15)",
        "card-hover": "0 8px 32px -4px rgba(0,0,0,0.35), 0 16px 64px -8px rgba(0,0,0,0.2)",
        "card-sm": "0 4px 24px -4px rgba(0,0,0,0.2)",
        accent: "0 2px 12px -4px rgba(240,160,48,0.3)",
        glow: "0 0 20px -4px rgba(232,55,44,0.25)",
        "glow-gold": "0 0 20px -4px rgba(240,160,48,0.25)",
      },
      animation: {
        "leaderboard-row": "leaderboardRowFadeIn 0.4s ease-out backwards",
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-up": "fadeUp 0.5s ease-out forwards",
        "slide-up": "slideUp 0.4s ease-out forwards",
        "slide-down": "slideDown 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "score-tick": "scoreTick 0.3s ease-out",
        "check-pop": "checkPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "field-drift": "fieldDrift 30s linear infinite",
        "ticker-scroll": "tickerScroll 40s linear infinite",
      },
      keyframes: {
        leaderboardRowFadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(12px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 12px -2px rgba(232,55,44,0.3)" },
          "50%": { boxShadow: "0 0 24px -2px rgba(232,55,44,0.5)" },
        },
        scoreTick: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        checkPop: {
          "0%": { transform: "scale(0)", opacity: "0" },
          "60%": { transform: "scale(1.2)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        fieldDrift: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "0 80px" },
        },
        tickerScroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
