import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const usePortfolioStore = create((set) => ({
  loading: false,

  addPortfolio: async (portfolio) => {
    set({ loading: true });
    try {
      await axiosInstance.post(
        "/portfolio/add",
        {
          ...portfolio,
          clientId: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    } catch (error) {
      set({ loading: false });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));
