"use client"

import { Activity } from "lucide-react"

export default function PatientOverviewPage() {
    return (
        <div className="flex h-full items-center justify-center text-muted-foreground bg-background/50">
            <div className="text-center space-y-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/50 mx-auto mb-4 text-muted-foreground/50">
                    <Activity className="h-6 w-6" />
                </div>
                <p className="text-sm font-medium">Select an item to view it's profile</p>
                <p className="text-xs text-muted-foreground">Select a wound, timeline or document from the side panel</p>
            </div>
        </div>
    )
}
