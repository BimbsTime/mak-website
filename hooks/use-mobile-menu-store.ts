"use client";

import { create } from "zustand";

type MobileMenuState = {
  isOpen: boolean;
  residentialExpanded: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleResidential: () => void;
};

export const useMobileMenuStore = create<MobileMenuState>((set) => ({
  isOpen: false,
  residentialExpanded: false,
  openMenu: () => set({ isOpen: true }),
  closeMenu: () => set({ isOpen: false, residentialExpanded: false }),
  toggleResidential: () =>
    set((state) => ({ residentialExpanded: !state.residentialExpanded })),
}));
