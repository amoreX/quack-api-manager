"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { MoodEntry } from "@/lib/types"
import axios from "axios";
import { moodEmojis } from "@/lib/moodConstants"
import { moodLabels } from "@/lib/moodConstants"
import { moodColors } from "@/lib/moodConstants"

export default function AdminPage() {
  const [entries, setEntries] = useState<MoodEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  const router = useRouter()

  const fetchEntries = async () => {
    

    try {
      const response = await axios.get("/api/mood");
      
      const data = await response.data;
      setEntries(data)
    } catch (error) {
      console.error("Error fetching entries:", error)
    } finally {
      setIsLoading(false)
      
    }
  }

  useEffect(() => {
    fetchEntries()
  }, [])

  

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading mood submissions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
     
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold ">
            Mood Submissions
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Track team emotional well-being over time</p>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => router.push("/mood")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            ➕ Add Mood
          </Button>
        </div>
      </div>



     
      <Card className="shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-200">Recent Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          {entries.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">😊</div>
              <p className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">No mood submissions yet</p>
              <p className="text-slate-500 dark:text-slate-400 mb-4">Be the first to share how you are feeling!</p>
              <Button
                onClick={() => router.push("/mood")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Submit Your Mood
              </Button>
            </div>
          ) : (
            <div >
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200 dark:border-slate-800">
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Mood</TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Comment</TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>

                  {entries.map((entry, index) => (
                    <TableRow
                      key={index}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{moodEmojis[entry.mood]}</span>
                          <span className={`font-medium ${moodColors[entry.mood]}`}>{moodLabels[entry.mood]}</span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-md">
                        {entry.comment ? (
                          <p className="text-slate-700 dark:text-slate-300 line-clamp-2">{entry.comment}</p>
                        ) : (
                          <span className="text-slate-400 dark:text-slate-500 italic">No comment</span>
                        )}
                      </TableCell>
                      <TableCell className="max-w-md">
                        <p>{entry.name}</p>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={() => router.push("/")}
          className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
        >
           Back to Home
        </Button>
      </div>
    </div>
  )
}
