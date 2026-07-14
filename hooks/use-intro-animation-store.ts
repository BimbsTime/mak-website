"use client";

import { create } from "zustand";

type IntroAnimationState = {
  isComplete: boolean;
  complete: () => void;
};

export const useIntroAnimationStore = create<IntroAnimationState>((set) => ({
  isComplete: false,
  complete: () => set({ isComplete: true }),
}));
