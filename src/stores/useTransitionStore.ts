import { create } from "zustand";

interface TransitionState {
    isAnimating: boolean;
    starAload: boolean;
    activePortal: string;
    starAnimationAloadLinks: string[];
    hover: boolean;
    triggerAnimation: () => void;
    endAnimation: () => void;
    setStarNotAload: () => void;
    setStarAload: () => void;
    setStarAnimationAload: (location: string) => void;
    setPortalActive: (activePortal: string) => void;
    setHover: (hover: boolean) => void;
}

export const useTransitionStore = create<TransitionState>((set, get) => ({
    isAnimating: false,
    starAload: false,
    activePortal: "",
    starAnimationAloadLinks: [],
    hover: false,
    setHover: (hover) => set({ hover }),
    setPortalActive: (activePortal) => set({ activePortal: activePortal }),
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
