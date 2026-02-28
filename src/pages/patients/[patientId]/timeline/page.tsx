
import { Clock } from "lucide-react"

export default function Page() {
    return (
        <div className="flex h-full items-center justify-center text-muted-foreground p-12 text-center">
            <div>
                <div className="h-12 w-12 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4 opacity-50">
                    <Clock className="h-6 w-6" />
                </div>
                <p className="text-sm font-medium">Select an event</p>
                <p className="text-xs opacity-70 mt-1 uppercase tracking-wider">to view clinical details</p>
            </div>
        </div>
    )
}
