import { create } from "zustand";

interface InitialState {
  isInitialized: boolean;
  init: () => Promise<void>;
}

export const useInitial = create<InitialState>((set) => ({
  isInitialized: false,

  init: async () => {
    // fetch session

    set({ isInitialized: true });
  },
}));
