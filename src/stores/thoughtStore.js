import { create } from "zustand";

export const useThoughtStore = create((set) => ({
  updateThoughts: 0,
  triggerUpdateThoughts: () =>
    set((state) => ({ updateThoughts: state.updateThoughts + 1 })),

}));
