import { create } from "zustand";

interface TransitionState {
    isAnimating: boolean;
    starAload: boolean;
    starAnimationAloadLinks: string[];
    triggerAnimation: () => void;
    endAnimation: () => void;
    setStarNotAload: () => void;
    setStarAload: () => void;
    setStarAnimationAload: (location: string) => void;
}

export const useTransitionStore = create<TransitionState>((set, get) => ({
    isAnimating: false,
    starAload: false,
    starAnimationAloadLinks: [],
    triggerAnimation: () => set({ isAnimating: true }),
    endAnimation: () => set({ isAnimating: false }),
    setStarNotAload: () => set({ starAload: false }),
    setStarAload: () => set({ starAload: true }),
    setStarAnimationAload: (location) => {
        const { starAnimationAloadLinks } = get();
        set({
            starAnimationAloadLinks: [...starAnimationAloadLinks, location],
        });
    },
}));
