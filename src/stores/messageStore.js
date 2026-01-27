import { create } from "zustand";

export const useMessageStore = create((set) => ({
  updateMessages: 0,
  triggerUpdateMessages: () =>
    set((state) => ({ updateMessages: state.updateMessages + 1 })),

}));
