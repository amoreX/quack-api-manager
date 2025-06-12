"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun,Moon } from "lucide-react";
export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; 
  }

  return (
    <button
      className=" bottom-4 right-4 p-2 bg-buttons text-textPrimary rounded cursor-pointer transition-all  duration-200 hover:scale-75 active:scale-50  "
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? <Sun/> : <Moon/>}
    </button>
  );
}
