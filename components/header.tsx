import { ThemeToggle } from "./theme-toggle"
export default function Header(){
    return(
         <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
              <div className=" mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold ">
                Employee Mood Tracker
                </h1>
                <ThemeToggle />
              </div>
            </header>
    )
}