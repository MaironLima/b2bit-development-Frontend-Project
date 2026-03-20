import { create } from "zustand";

type Theme = "dark" | "light";

const getInitialTheme = (): Theme =>
  (localStorage.getItem("theme") as Theme) === "dark" ? "dark" : "light";

interface TokenState {
  themeStore: Theme;
  setThemeStore: (theme: Theme) => void;

  accessToken: string;
  setAccessToken: (token: string) => void;
  deleteAccessToken: () => void;

  currentId: number;
  setCurrentId: (id: number) => void;
  deleteCurrentId: () => void;

  update: boolean;
  setUpdate: () => void;
}

export const useStore = create<TokenState>((set) => ({
  themeStore: getInitialTheme(),
  setThemeStore: (theme) => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    set({ themeStore: newTheme });
  },

  accessToken: "",
  setAccessToken: (token) => set({ accessToken: token }),
  deleteAccessToken: () => set({ accessToken: "" }),

  currentId: -1,
  setCurrentId: (id) => set({ currentId: id }),
  deleteCurrentId: () => set({ currentId: -1 }),

  update: false,
  setUpdate: () => set((state) => ({ update: !state.update })),
}));
