/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-productsans)", "system-ui", "sans-serif"],
        mono: ["var(--font-productsans)", "monospace"],
      },
      colors: {
        // Industrial design color palette
        industrial: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0a0a0a",
        },
        // Depth and layering
        depth: {
          surface: "hsl(var(--depth-surface))",
          "surface-elevated": "hsl(var(--depth-surface-elevated))",
          "surface-floating": "hsl(var(--depth-surface-floating))",
          border: "hsl(var(--depth-border))",
          "border-subtle": "hsl(var(--depth-border-subtle))",
        },
        // Geometric abstraction colors
        geometric: {
          primary: "hsl(var(--geometric-primary))",
          secondary: "hsl(var(--geometric-secondary))",
          accent: "hsl(var(--geometric-accent))",
          muted: "hsl(var(--geometric-muted))",
        },
      },
      spacing: {
        // Industrial grid system
        "grid-xs": "0.25rem", // 4px
        "grid-sm": "0.5rem",  // 8px
        "grid-md": "1rem",    // 16px
        "grid-lg": "1.5rem",  // 24px
        "grid-xl": "2rem",    // 32px
        "grid-2xl": "3rem",   // 48px
        "grid-3xl": "4rem",   // 64px
        "grid-4xl": "6rem",   // 96px
        "grid-5xl": "8rem",   // 128px
      },
      borderRadius: {
        // Organic geometric shapes
        "organic-sm": "0.375rem",
        "organic-md": "0.75rem",
        "organic-lg": "1.5rem",
        "organic-xl": "2rem",
        "organic-2xl": "3rem",
        "organic-3xl": "4rem",
      },
      boxShadow: {
        // Depth and layering shadows
        "depth-1": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "depth-2": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        "depth-3": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        "depth-4": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "depth-5": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        // Glassmorphism
        "glass": "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        "glass-inset": "inset 0 1px 0 0 rgba(255, 255, 255, 0.05)",
      },
      backdropBlur: {
        "xs": "2px",
        "sm": "4px",
        "md": "8px",
        "lg": "12px",
        "xl": "16px",
        "2xl": "24px",
        "3xl": "40px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        // Geometric morphing animations
        "morph": {
          "0%, 100%": { 
            borderRadius: "1.5rem",
            transform: "scale(1) rotate(0deg)",
          },
          "50%": { 
            borderRadius: "2.5rem",
            transform: "scale(1.05) rotate(2deg)",
          },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.8" },
          "50%": { opacity: "1" },
        },
        "glow": {
          "0%, 100%": { 
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
          },
          "50%": { 
            boxShadow: "0 0 40px rgba(0, 0, 0, 0.2)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "morph": "morph 8s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-soft": "pulse-soft 4s ease-in-out infinite",
        "glow": "glow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
