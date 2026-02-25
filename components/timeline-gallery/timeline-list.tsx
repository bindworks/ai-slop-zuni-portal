"use client"

import { Image as ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export interface TimelineEvent {
    id: string
    date: Date
    dateStr: string
    type: 'visit' | 'document' | 'photos'
    title: string
    description: string
    sourceId: string
}

export function TimelineList({
    events,
    selectedEventId,
    patientId
}: {
    events: TimelineEvent[],
    selectedEventId?: string,
    patientId: string
}) {
    const getDayDiff = (d1: Date, d2: Date) => {
        const diffTime = Math.abs(d1.getTime() - d2.getTime());
        return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    }

    return (
        <div className="flex h-full w-[28rem] shrink-0 flex-col border-r border-border bg-card/10">
            <div className="border-b border-border px-6 py-4 shrink-0">
                <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <span className="text-base leading-none">🗓️</span>
                    Timeline
                </h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                    Chronological patient history
                </p>
            </div>

            <div className="flex-1 overflow-y-auto pt-2 custom-scrollbar">
                <div className="w-[28rem] py-4 relative px-2">
                    <div className="absolute left-[3.25rem] top-0 bottom-0 w-[4px] bg-amber-400/60" />

                    <div className="flex flex-col">
                        {events.map((event, idx) => {
                            const prevEvent = events[idx - 1]
                            const showDate = !prevEvent || prevEvent.dateStr !== event.dateStr
                            const dayDiff = prevEvent ? getDayDiff(prevEvent.date, event.date) : 0
                            const isYearBreak = prevEvent && prevEvent.date.getFullYear() !== event.date.getFullYear()
                            const isSelected = selectedEventId === event.id

                            let spacingClass = ""
                            if (prevEvent) {
                                if (dayDiff === 0) spacingClass = "mt-0.5"
                                else if (dayDiff === 1) spacingClass = "mt-2.5"
                                else if (dayDiff === 2) spacingClass = "mt-5"
                                else spacingClass = "mt-2"
                            }

                            return (
                                <div key={event.id} className={cn("relative", spacingClass)}>
                                    {isYearBreak ? (
                                        <div className="mb-2 flex items-center gap-2 pr-4">
                                            <div className="ms-9 h-px flex-1 bg-amber-400/40" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">
                                                🥳 {event.date.getFullYear()}
                                            </span>
                                            <div className="h-px w-8 bg-amber-400/60" />
                                        </div>
                                    ) : (
                                        dayDiff >= 3 && (
                                            <div className="mb-2 flex items-center gap-2">
                                                <div className="ms-9 h-px w-2 bg-amber-400/40" />
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500/90 italic">
                                                    {dayDiff} days earlier
                                                </span>
                                            </div>
                                        )
                                    )}

                                    <Link
                                        href={`/patients/${patientId}/timeline/${event.id}`}
                                        className="flex gap-3 group"
                                    >
                                        <div className="w-[2.5rem] shrink-0 text-right pt-2">
                                            {showDate && (
                                                <span className="text-[10px] font-bold text-amber-500/80 uppercase tracking-tighter leading-none">
                                                    {new Date(event.dateStr).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                                                </span>
                                            )}
                                        </div>
                                        <div className="relative w-1.5 shrink-0" />
                                        <div className="flex-1 min-w-0 relative">
                                            <div className={cn(
                                                "rounded-md px-2 py-1 text-left transition-all duration-200 group/item",
                                                isSelected ? "bg-accent shadow-sm ring-1 ring-primary/30 rounded-r-md" : "hover:bg-secondary/30"
                                            )}>
                                                <div className="flex items-start gap-2.5">
                                                    <div className={cn(
                                                        "text-lg leading-tight mt-0 shrink-0 transition-opacity",
                                                        isSelected ? "opacity-100" : "opacity-60 group-hover/item:opacity-100"
                                                    )}>
                                                        {event.type === 'visit' && "❤️‍🩹"}
                                                        {event.type === 'document' && "🗂️"}
                                                        {event.type === 'photos' && "📸"}
                                                    </div>
                                                    <div className="flex-1 min-w-0 flex flex-col gap-0">
                                                        <h4 className={cn(
                                                            "text-sm font-medium leading-none transition-colors truncate",
                                                            isSelected ? "text-primary" : "text-foreground group-hover/item:text-primary"
                                                        )}>
                                                            {event.title}
                                                        </h4>
                                                        <div className="text-xs leading-tight text-muted-foreground/70 line-clamp-1 mt-[2px]">
                                                            {event.description.includes('photos') ? (
                                                                <div className="flex items-center gap-1">
                                                                    <ImageIcon className="h-3 w-3 shrink-0 opacity-70" />
                                                                    <span>
                                                                        {event.description.replace(/(\d+)\s+photos(\s+taken)?/, '$1')}
                                                                    </span>
                                                                </div>
                                                            ) : event.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
