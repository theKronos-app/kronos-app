import { fontFamily } from "tailwindcss/defaultTheme";
import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{html,js,svelte,ts}"],
  safelist: ["dark"],
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
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "hsl(var(--foreground))",
            "--tw-prose-headings": "hsl(var(--foreground))",
            "--tw-prose-links": "hsl(var(--primary))",
            "--tw-prose-links-hover": "hsl(var(--primary))",
            "--tw-prose-underline": "hsl(var(--primary) / 0.2)",
            "--tw-prose-underline-hover": "hsl(var(--primary))",
            "--tw-prose-bold": "hsl(var(--foreground))",
            "--tw-prose-counters": "hsl(var(--muted-foreground))",
            "--tw-prose-bullets": "hsl(var(--muted-foreground))",
            "--tw-prose-hr": "hsl(var(--border))",
            "--tw-prose-quote-borders": "hsl(var(--border))",
            "--tw-prose-captions": "hsl(var(--muted-foreground))",
            "--tw-prose-code": "hsl(var(--foreground))",
            "--tw-prose-code-bg": "hsl(var(--muted))",
            "--tw-prose-pre-code": "hsl(var(--foreground))",
            "--tw-prose-pre-bg": "hsl(var(--muted))",
            "--tw-prose-th-borders": "hsl(var(--border))",
            "--tw-prose-td-borders": "hsl(var(--border))",

            // Base
            color: "var(--tw-prose-body)",
            lineHeight: theme("lineHeight.7"),
            "> *": {
              marginTop: theme("spacing.10"),
              marginBottom: theme("spacing.10"),
            },
            p: {
              marginTop: theme("spacing.7"),
              marginBottom: theme("spacing.7"),
            },

            // Headings
            h1: {
              color: "var(--tw-prose-headings)",
              fontWeight: 700,

              fontSize: theme("fontSize.lg")[0],
            },
            "h2, h3": {
              color: "var(--tw-prose-headings)",
              fontWeight: "500",
            },
            h2: {
              fontSize: theme("fontSize.base")[0],
              lineHeight: theme("lineHeight.7"),
              marginTop: theme("spacing.20"),
              marginBottom: theme("spacing.4"),
            },
            h3: {
              fontSize: theme("fontSize.sm")[0],
              lineHeight: theme("lineHeight.7"),
              marginTop: theme("spacing.16"),
              marginBottom: theme("spacing.4"),
            },
            ":is(h2, h3) + *": {
              marginTop: 0,
            },

            // Images
            img: {
              borderRadius: theme("borderRadius.lg"),
            },

            // Inline elements
            a: {
              color: "var(--tw-prose-links)",
              fontWeight: theme("fontWeight.semibold"),
              textDecoration: "underline",
              textDecorationColor: "var(--tw-prose-underline)",
              transitionProperty: "color, text-decoration-color",
              transitionDuration: theme("transitionDuration.150"),
              transitionTimingFunction: theme(
                "transitionTimingFunction.in-out",
              ),
            },
            "a:hover": {
              color: "var(--tw-prose-links-hover)",
              textDecorationColor: "var(--tw-prose-underline-hover)",
            },
            strong: {
              color: "var(--tw-prose-bold)",
              fontWeight: theme("fontWeight.semibold"),
            },
            code: {
              display: "inline-block",
              color: "var(--tw-prose-code)",
              fontSize: theme("fontSize.sm")[0],
              fontWeight: theme("fontWeight.semibold"),
              backgroundColor: "var(--tw-prose-code-bg)",
              borderRadius: theme("borderRadius.lg"),
              paddingLeft: theme("spacing.1"),
              paddingRight: theme("spacing.1"),
            },
            "a code": {
              color: "inherit",
            },
            ":is(h2, h3) code": {
              fontWeight: theme("fontWeight.bold"),
            },

            // Quotes
            blockquote: {
              paddingLeft: theme("spacing.6"),
              borderLeftWidth: theme("borderWidth.2"),
              borderLeftColor: "var(--tw-prose-quote-borders)",
              fontStyle: "italic",
            },

            // Figures
            figcaption: {
              color: "var(--tw-prose-captions)",
              fontSize: theme("fontSize.sm")[0],
              lineHeight: theme("lineHeight.6"),
              marginTop: theme("spacing.3"),
            },
            "figcaption > p": {
              margin: 0,
            },

            // Lists
            ul: {
              listStyleType: "disc",
            },
            ol: {
              listStyleType: "decimal",
            },
            "ul, ol": {
              paddingLeft: theme("spacing.6"),
            },
            li: {
              marginTop: theme("spacing.6"),
              marginBottom: theme("spacing.6"),
              paddingLeft: theme("spacing[3.5]"),
            },
            "li::marker": {
              fontSize: theme("fontSize.sm")[0],
              fontWeight: theme("fontWeight.semibold"),
            },
            "ol > li::marker": {
              color: "var(--tw-prose-counters)",
            },
            "ul > li::marker": {
              color: "var(--tw-prose-bullets)",
            },
            "li :is(ol, ul)": {
              marginTop: theme("spacing.4"),
              marginBottom: theme("spacing.4"),
            },

            // Code blocks
            pre: {
              color: "var(--tw-prose-pre-code)",
              fontSize: theme("fontSize.sm")[0],
              fontWeight: theme("fontWeight.medium"),
              backgroundColor: "var(--tw-prose-pre-bg)",
              borderRadius: theme("borderRadius.lg"),
              padding: theme("spacing.8"),
              overflowX: "auto",
              border: "1px solid",
              borderColor: "var(--tw-prose-th-borders)",
            },
            "pre code": {
              display: "inline",
              color: "inherit",
              fontSize: "inherit",
              fontWeight: "inherit",
              backgroundColor: "transparent",
              borderRadius: 0,
              padding: 0,
            },

            // Horizontal rules
            hr: {
              marginTop: theme("spacing.20"),
              marginBottom: theme("spacing.20"),
              borderTopWidth: "1px",
              borderColor: "var(--tw-prose-hr)",
              "@screen lg": {
                marginLeft: `calc(${theme("spacing.12")} * -1)`,
                marginRight: `calc(${theme("spacing.12")} * -1)`,
              },
            },

            // Tables
            table: {
              width: "100%",
              tableLayout: "auto",
              textAlign: "left",
              fontSize: theme("fontSize.sm")[0],
            },
            thead: {
              borderBottomWidth: "1px",
              borderBottomColor: "var(--tw-prose-th-borders)",
            },
            "thead th": {
              color: "var(--tw-prose-headings)",
              fontWeight: theme("fontWeight.semibold"),
              verticalAlign: "bottom",
              paddingBottom: theme("spacing.2"),
            },
            "thead th:not(:first-child)": {
              paddingLeft: theme("spacing.2"),
            },
            "thead th:not(:last-child)": {
              paddingRight: theme("spacing.2"),
            },
            "tbody tr": {
              borderBottomWidth: "1px",
              borderBottomColor: "var(--tw-prose-td-borders)",
            },
            "tbody tr:last-child": {
              borderBottomWidth: 0,
            },
            "tbody td": {
              verticalAlign: "baseline",
            },
            tfoot: {
              borderTopWidth: "1px",
              borderTopColor: "var(--tw-prose-th-borders)",
            },
            "tfoot td": {
              verticalAlign: "top",
            },
          },
        },
        invert: {
          css: {
            "--tw-prose-body": "hsl(var(--foreground))",
            "--tw-prose-headings": "hsl(var(--foreground))",
            "--tw-prose-links": "hsl(var(--primary))",
            "--tw-prose-links-hover": "hsl(var(--primary))",
            "--tw-prose-underline": "hsl(var(--primary) / 0.3)",
            "--tw-prose-underline-hover": "hsl(var(--primary))",
            "--tw-prose-bold": "hsl(var(--foreground))",
            "--tw-prose-counters": "hsl(var(--muted-foreground))",
            "--tw-prose-bullets": "hsl(var(--muted-foreground))",
            "--tw-prose-hr": "hsl(var(--border))",
            "--tw-prose-quote-borders": "hsl(var(--border))",
            "--tw-prose-captions": "hsl(var(--muted-foreground))",
            "--tw-prose-code": "hsl(var(--foreground))",
            "--tw-prose-code-bg": "hsl(var(--muted))",
            "--tw-prose-pre-code": "hsl(var(--foreground))",
            "--tw-prose-pre-bg": "hsl(var(--muted))",
            "--tw-prose-th-borders": "hsl(var(--border))",
            "--tw-prose-td-borders": "hsl(var(--border))",
          },
        },
      }),
    },
  },
  plugins: [typography, animate],
};

export default config;
