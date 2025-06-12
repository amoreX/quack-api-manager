import { NextResponse,type NextRequest } from "next/server"
import { getMoodEntries, addMoodEntry } from "@/app/api/utils/moods"

export const GET =async()=> {
  try {
    const entries = getMoodEntries()
    return NextResponse.json(entries)
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}

export const POST=async(req: NextRequest)=> {
  try {
    const { mood, comment,name } = await req.json();

    if (!mood) {
      return NextResponse.json({ error: "Invalid mood value" }, { status: 400 })
    }

    const newEntry = addMoodEntry(mood, name,comment)
    return NextResponse.json(newEntry, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}
