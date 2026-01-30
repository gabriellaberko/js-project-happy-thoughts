import { create } from "zustand";

export const useAuthStore = create((set) => ({

  accessToken: null,
  isAuthenticated: false,

  login: (accessToken) => {
    localStorage.setItem("accessToken", accessToken);
    set({
      accessToken: accessToken,
      isAuthenticated: true,
    });
    console.log("logged in", "accessToken:", typeof accessToken);
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    set({
      accessToken: null,
      isAuthenticated: false,
    });
  },

  checkAuthStatus: () => {
    const accessToken = localStorage.getItem("accessToken");

    if(accessToken) {
      set({
        accessToken: accessToken,
        isAuthenticated: true,
      });
    }
  }

}));