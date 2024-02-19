import { create } from "zustand";

export const useGeneralStore = create((set) => ({
  isAmbientPlaying: false,
  setIsAmbientPlaying: (data) => set((state) => ({ isAmbientPlaying: data })),
}));
