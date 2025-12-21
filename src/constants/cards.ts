export interface CardData {
    id: string;
    index: string; // "Card 01", "Card 02" etc.
    primary: string;
    secondary: string;
    cta: string;
    metaOnRevisit?: string;
    metaOnHesitate?: string;
}

export const CARDS: CardData[] = [
    {
        id: 'origin',
        index: "01",
        primary: "I didn’t start in business. I started by trying to understand how things behave when you poke them.",
        secondary: "Living systems. Too many variables. No clean answers.",
        cta: "→ Curious? Keep going."
    },
    {
        id: 'tension',
        index: "02",
        primary: "Curiosity is great. But at some point, someone still has to decide.",
        secondary: "That moment stayed with me.",
        cta: "→ This is where it turns.",
        metaOnHesitate: "Hesitation is just analysis without an expiration date."
    },
    {
        id: 'people',
        index: "03",
        primary: "Add people to any system and things change fast.",
        secondary: "Logic helps. Convincing someone helps more than people admit.",
        cta: "→ You’ve seen this too."
    },
    {
        id: 'shift',
        index: "04",
        primary: "Somewhere along the way, I stopped selling ideas.",
        secondary: "I started shaping the systems behind them.",
        cta: "→ This part matters."
    },
    {
        id: 'reality',
        index: "05",
        primary: "Execution has a way of exposing weak thinking.",
        secondary: "Constraints don’t care about good intentions.",
        cta: "→ Let’s be honest."
    },
    {
        id: 'scale',
        index: "06",
        primary: "Some systems fail quietly. Others fail in public.",
        secondary: "When timing matters, small decisions travel far.",
        cta: "→ Feel the pressure."
    },
    {
        id: 'pivot',
        index: "07",
        primary: "I change direction often. I don’t lose intent.",
        secondary: "That’s the difference.",
        cta: "→ This shows up everywhere.",
        metaOnRevisit: "Returning to intent. It's the only thing that doesn't pivot."
    },
    {
        id: 'thinking',
        index: "08",
        primary: "I don’t chase perfect answers.",
        secondary: "I balance perspective, priority, and what’s actually possible.",
        cta: "→ This is my default."
    },
    {
        id: 'awareness',
        index: "09",
        primary: "I’m most useful before things settle.",
        secondary: "When clarity hasn’t arrived, but responsibility already has.",
        cta: "→ If this resonates, stay.",
        metaOnHesitate: "Ambiguity usually forces a pause. You're handling it well."
    },
    {
        id: 'invitation',
        index: "10",
        primary: "This isn’t a portfolio.",
        secondary: "It’s how my decisions usually get made.",
        cta: "→ Start wherever you like."
    }
];
