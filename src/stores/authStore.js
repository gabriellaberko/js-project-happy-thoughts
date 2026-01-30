import { create } from "zustand";

export const useAuthStore = create((set) => ({

  accessToken: null,
  isAuthenticated: false,
  name: null,

  login: ({ accessToken, name }) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("name", name);
    set({
      accessToken: accessToken,
      isAuthenticated: true,
      name: name
    });
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("name");
    set({
      accessToken: null,
      isAuthenticated: false,
      name: null
    });
  },

  checkAuthStatus: () => {
    const accessToken = localStorage.getItem("accessToken");
    const name = localStorage.getItem("name");

    if(accessToken) {
      set({
        accessToken: accessToken,
        isAuthenticated: true,
        name: name
      });
    }
  }

}));