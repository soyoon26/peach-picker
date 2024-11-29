import { create } from "zustand";

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  token: null,
  isInitialized: false,
  userInfo: null,
  login: (token, rememberMe) => {
    if (rememberMe) {
      localStorage.setItem("token", token);
      sessionStorage.setItem("token", token);
    } else {
      sessionStorage.setItem("token", token);
    }
    set({ isLoggedIn: true, token });
  },
  logout: () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    set({ isLoggedIn: false, token: null });
  },
  initialize: () => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      set({ isLoggedIn: true, token, isInitialized: true });
    } else {
      set({ isLoggedIn: false, token: null, isInitialized: true });
    }
  },
  setUserInfo: (userInfo) => set({ userInfo }),
}));

export default useAuthStore;
