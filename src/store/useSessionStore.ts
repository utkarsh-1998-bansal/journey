import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CardSession {
    visitCount: number;
    lastDwellTime: number;
    totalDwellTime: number;
}

interface SessionState {
    cardMetrics: Record<string, CardSession>;
    scrollSpeed: 'slow' | 'fast';
    lastActiveCardId: string | null;
    hasHesitated: boolean;

    // Actions
    recordVisit: (cardId: string) => void;
    updateDwell: (cardId: string, ms: number) => void;
    setScrollSpeed: (speed: 'slow' | 'fast') => void;
    setHesitation: (value: boolean) => void;
    resetSession: () => void;
}

export const useSessionStore = create<SessionState>()(
    persist(
        (set) => ({
            cardMetrics: {},
            scrollSpeed: 'slow',
            lastActiveCardId: null,
            hasHesitated: false,

            recordVisit: (cardId) => set((state) => {
                const current = state.cardMetrics[cardId] || { visitCount: 0, lastDwellTime: 0, totalDwellTime: 0 };
                return {
                    cardMetrics: {
                        ...state.cardMetrics,
                        [cardId]: { ...current, visitCount: current.visitCount + 1 }
                    },
                    lastActiveCardId: cardId
                };
            }),

            updateDwell: (cardId, ms) => set((state) => {
                const current = state.cardMetrics[cardId] || { visitCount: 0, lastDwellTime: 0, totalDwellTime: 0 };
                return {
                    cardMetrics: {
                        ...state.cardMetrics,
                        [cardId]: {
                            ...current,
                            lastDwellTime: ms,
                            totalDwellTime: current.totalDwellTime + ms
                        }
                    }
                };
            }),

            setScrollSpeed: (speed) => set({ scrollSpeed: speed }),
            setHesitation: (value) => set({ hasHesitated: value }),
            resetSession: () => set({ cardMetrics: {}, lastActiveCardId: null, hasHesitated: false })
        }),
        {
            name: 'utkarsh-session-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
