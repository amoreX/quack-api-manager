"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { moodOptions } from "@/lib/dynamicStyles"
import axios from "axios"
import { toast } from "sonner"
export default function MoodPage() {
  const [selectedMood, setSelectedMood] = useState<"happy" | "neutral" | "sad" | null>(null)
  const [comment, setComment] = useState("")
  const [name, setName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {
    if (!selectedMood || !name.trim()) {
      toast("Please select a mood and enter your name.")
      return
    }

    setIsSubmitting(true)

    try {
      await axios.post("/api/mood", {
        mood: selectedMood,
        comment: comment.trim(),
        name: name.trim(),
      })
      
      toast("Mood Submitted Succesfully.")
      setTimeout(()=>{
          router.push("/admin")

      },1500);
    } catch (error) {
      toast("Failed to submit mood. Please try again.")
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-2xl p-6 shadow-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">
            How are you feeling today?
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">

          <div className="grid grid-cols-3 gap-4">
            {moodOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => setSelectedMood(option.value)}
                className={`cursor-pointer p-4 border rounded-md text-center transition-transform ${
                  selectedMood === option.value ? "scale-105 border-blue-500" : "border-slate-300"
                }`}
              >
                <div className="text-4xl mb-2">{option.emoji}</div>
                <div className="text-sm font-medium">{option.label}</div>
              </div>
            ))}
          </div>


          <div>
            <label className=" text-sm mb-1 text-slate-700 dark:text-slate-300">Your Name</label>
            <Input
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>


          <div>
            <label className=" text-sm mb-1 text-slate-700 dark:text-slate-300">
              Want to share more? (Optional)
            </label>
            <Textarea
              placeholder="Tell us what's on your mind..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={500}
              className="resize-none"
            />
            <div className="text-xs text-right text-slate-500 dark:text-slate-400">
              {comment.length}/500
            </div>
          </div>


          <Button
            onClick={handleSubmit}
            disabled={!selectedMood || !name.trim() || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Submitting..." : "Submit Mood"}
          </Button>


          <div className="text-center pt-4">
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="text-sm"
            >
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
