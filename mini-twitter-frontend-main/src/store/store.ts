import { create } from "zustand";

type Theme = "dark" | "light";

const getInitialTheme = (): Theme =>
  (localStorage.getItem("theme") as Theme) === "dark" ? "dark" : "light";

const getInitialAccessToken = (): string =>
  localStorage.getItem("accessToken") || "";

const getInitialId = (): number =>
  Number(localStorage.getItem("id")) || -1;

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

  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const useStore = create<TokenState>((set) => ({
  themeStore: getInitialTheme(),
  setThemeStore: (theme) => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    set({ themeStore: newTheme });
  },

  accessToken: getInitialAccessToken(),
  setAccessToken: (token) => {
    set({ accessToken: token })
    localStorage.setItem('accessToken', token)
  },
  deleteAccessToken: () => set({ accessToken: "" }),

  currentId: getInitialId(),
  setCurrentId: (id) => {
    set({ currentId: id })
    localStorage.setItem('id', `${id}`)
  },
  deleteCurrentId: () => {set({ currentId: -1 })},

  update: false,
  setUpdate: () => set((state) => ({ update: !state.update })),

searchTerm: "",
setSearchTerm: (term: string) => set({ searchTerm: term }),
}));
