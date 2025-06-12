export interface MoodEntry {
  id: string
  mood: "happy" | "neutral" | "sad"
  comment?: string
  name:string
}

export interface MoodOption {
  value: "happy" | "neutral" | "sad"
  emoji: string
  label: string
  color: string
  borderColor: string
}
