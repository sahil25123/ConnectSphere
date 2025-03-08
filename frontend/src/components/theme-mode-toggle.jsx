"use client"

import { useTheme } from "./theme-provider"
import { Button } from "./ui/button"
import { Moon, Sun } from "lucide-react"

export function ThemeModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full bg-background/20 backdrop-blur-sm border-primary/20 hover:bg-background/30 transition-all"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Sun className="h-5 w-5 text-yellow-300" /> : <Moon className="h-5 w-5 text-indigo-400" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

