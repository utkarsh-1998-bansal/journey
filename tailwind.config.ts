import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'indigo-base': "#0B0F2E",
                'acid-green': "#B6FF3B",
                'digital-cyan': "#3CF2E6",
                'coral': "#FF6A3D",
                'warm-sand': "#F6F1EA",
                'amber': "#C47A4A",
            },
            fontFamily: {
                serif: ["var(--font-playfair)", "serif"],
                sans: ["var(--font-inter)", "sans-serif"],
            },
            transitionTimingFunction: {
                'cinematic': 'cubic-bezier(0.25, 1, 0.5, 1)',
            }
        },
    },
    plugins: [],
} satisfies Config;
