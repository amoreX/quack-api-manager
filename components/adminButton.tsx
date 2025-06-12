import { useRouter } from "next/navigation"
import { Button } from "./ui/button";
export default function AdminButton(){
    const router=useRouter();
    return(
        <div className="pt-10 space-x-4">
          <Button
            variant="outline"
            onClick={() => router.push("/admin")}
            className="hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            View Admin Dashboard
          </Button>
        </div>
    )
}