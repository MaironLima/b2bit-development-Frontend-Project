// import { createContext, useContext, useEffect, useState } from "react"

// type Theme = "dark" | "light"

// type ThemeContextType = {
//   theme: Theme
//   setTheme: (theme: Theme) => void
// }

// const ThemeContext = createContext<ThemeContextType>({
//   theme: "light",
//   setTheme: () => {},
// })

// export function ThemeProvider({ children }: { children: React.ReactNode }) {
//   const [theme, setTheme] = useState<Theme>(
//     (localStorage.getItem("theme") as Theme) || "light"
//   )

//   useEffect(() => {
//     const root = document.documentElement

//     root.classList.remove("light")
//     root.classList.remove("dark")

//     root.classList.add(theme)
//   }, [theme])

//   function changeTheme(newTheme: Theme) {
//     localStorage.setItem("theme", newTheme)
//     setTheme(newTheme)
//   }

//   return (
//     <ThemeContext.Provider value={{ theme, setTheme: changeTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   )
// }

// // eslint-disable-next-line react-refresh/only-export-components
// export function useTheme() {
//   return useContext(ThemeContext)
// }