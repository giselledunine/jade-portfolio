import { create } from "zustand";

interface TransitionState {
    isAnimating: boolean;
    triggerAnimation: () => void;
    endAnimation: () => void;
}

export const useTransitionStore = create<TransitionState>((set) => ({
    isAnimating: false,
    triggerAnimation: () => set({ isAnimating: true }),
    endAnimation: () => set({ isAnimating: false }),
}));
