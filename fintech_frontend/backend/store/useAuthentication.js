import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthentication = create((set) => ({
  token: localStorage.getItem("token") || null,
  isAuthenticated: false,
  loading: false,
  authChecked: false,

  signup: async (user) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.post("/auth/save", user);

      const token = res.data.data.token;

      localStorage.setItem("token", token);
      set({
        token: token,
        isAuthenticated: true,
        authChecked: true,
      });
      toast.success("Kayıt Başarılı");
    } catch (error) {
      set({
        token: null,
        isAuthenticated: false,
        authChecked: true,
      });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  login: async (user) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.post("/auth/login", user);

      const token = res.data.data.token;

      localStorage.setItem("token", token);

      set({
        token: token,
        isAuthenticated: true,
        authChecked: true,
      });
      toast.success("Giriş Başarılı");
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({
      token: null,
      isAuthenticated: false,
      authChecked: true,
    });
    toast.success("Çıkış yapıldı");
  },

  authControl: async () => {
    try {
      set({ loading: true });
      await axiosInstance.get("/auth/me");

      set({ isAuthenticated: true, authChecked: true });
    } catch (error) {
      localStorage.removeItem("token");
      set({ token: null, isAuthenticated: false, authChecked: true });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));
