import { create } from "zustand";

interface LayoutState {
  isScreenLoaderShown: boolean;
  showScreenLoader: () => void;
  hideScreenLoader: () => void;
}

export const useLayout = create<LayoutState>((set) => ({
  isScreenLoaderShown: true,

  showScreenLoader: () => {
    set((state) => ({ ...state, isScreenLoaderShown: true }));
  },

  hideScreenLoader: () => {
    setTimeout(() => {
      set((state) => ({ ...state, isScreenLoaderShown: false }));
    }, 1000);
  },
}));
