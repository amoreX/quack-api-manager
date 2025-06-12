import { MoodOption } from "./types"

export const moods=[
  {
    mood:"😄",
    title:"Feeling Good",
    detail:"Everything’s going well today.",
    gradiant:"from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800",
    text:"text-green-800 dark:text-green-200",
    semitext:"text-green-600 dark:text-green-400"
  },
  {
    mood:"😐",
    title:"Just Okay",
    detail:"Not great, not bad — just here.",
    gradiant:"from-gray-50 to-slate-50 dark:from-gray-950 dark:to-slate-950 border-gray-200 dark:border-gray-800",
    text:"text-gray-800 dark:text-gray-200",
    semitext:"text-gray-600 dark:text-gray-400"
  },{
    mood:"😞",
    title:"Down Today",
    detail:"It’s okay to not feel okay. Take a breath.",
    gradiant:"from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-950 border-red-200 dark:border-red-800",
    text:"text-red-800 dark:text-red-200",
    semitext:"text-red-600 dark:text-red-400"
  },
]


export const moodOptions: MoodOption[] = [
  {
    value: "happy",
    emoji: "😄",
    label: "Happy",
    color: "text-green-600 dark:text-green-400",
    borderColor: "border-green-300 dark:border-green-700 hover:border-green-400 dark:hover:border-green-600",
  },
  {
    value: "neutral",
    emoji: "😐",
    label: "Neutral",
    color: "text-gray-600 dark:text-gray-400",
    borderColor: "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600",
  },
  {
    value: "sad",
    emoji: "😞",
    label: "Sad",
    color: "text-red-600 dark:text-red-400",
    borderColor: "border-red-300 dark:border-red-700 hover:border-red-400 dark:hover:border-red-600",
  },
]


export const moodEmojis = {
  happy: "😄",
  neutral: "😐",
  sad: "😞",
}

export const moodLabels = {
  happy: "Happy",
  neutral: "Neutral",
  sad: "Sad",
}

export const moodColors = {
  happy: "text-green-600 dark:text-green-400",
  neutral: "text-gray-600 dark:text-gray-400",
  sad: "text-red-600 dark:text-red-400",
}