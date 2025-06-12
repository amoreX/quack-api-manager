"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AdminButton from "@/components/adminButton";
import { moods } from "@/lib/dynamicStyles";





export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center space-y-6  mx-auto">

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 blur-2xl opacity-25 animate-pulse" /> 
            <h1 className="relative text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-slate-100 dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent leading-tight"> 
               Capture How You Feel
            </h1>
          </div>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium">
            Quick, simple check-ins to stay mindful of your emotional well-being.
          </p>

        
        <div className="pt-4">
          <Button
            size="lg"
            onClick={() => router.push("/mood")}
            className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <div className="active:rotate-180">➕</div> Log Today’s Mood
          </Button>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
        {moods.map((mood,ind)=>{
          return(
          <Card className={`bg-gradient-to-br ${mood.gradiant} hover:shadow-lg transition-shadow duration-200`} key={ind}>
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-3">{mood.mood}</div>
              <h3 className={`font-semibold ${mood.text}`} >{mood.title}</h3>
              <p className={`text-sm ${mood.semitext}`} >{mood.detail}</p>
            </CardContent>
          </Card>
          )
        })}
        </div>

       <AdminButton />

      </div>
    </div>
  );
}
