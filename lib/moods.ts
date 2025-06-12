import { MoodEntry } from "./types"
 

//Dummy mood Data
const moodEntries: MoodEntry[] = [
  {
    id: "1",
    mood: "happy",
    comment: "Great team meeting today!",
  },
  {
    id: "2",
    mood: "neutral",
    comment: "Just another regular day",

  },
  {
    id: "3",
    mood: "sad",
    comment: "Feeling overwhelmed with deadlines",

  },
]

export function getMoodEntries(): MoodEntry[] {
  return moodEntries;
}

export function addMoodEntry(mood: "happy" | "neutral" | "sad", comment?: string): MoodEntry {
  const newEntry: MoodEntry = {
    id: (moodEntries.length+1).toString(),
    mood,
    comment,

  }

  moodEntries.push(newEntry)
  return newEntry
}

