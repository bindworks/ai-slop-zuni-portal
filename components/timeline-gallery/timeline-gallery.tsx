"use client"

import { useState, useMemo } from "react"
import { Calendar, Camera, Clock, FileText, HeartPulse } from "lucide-react"
import { cn } from "@/lib/utils"
import { Patient } from "../common/types"
import { TimelineDetail } from "./timeline-detail"

interface TimelineEvent {
    id: string
    date: Date
    dateStr: string
    type: 'visit' | 'document' | 'photos'
    title: string
    description: string
    sourceId: string // Link to original record
}

export function TimelineGallery({ patient }: { patient: Patient }) {
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null)

    const events = useMemo(() => {
        const allEvents: TimelineEvent[] = []

        // Add wound visits
        patient.wounds?.forEach(wound => {
            wound.history?.forEach((visit, idx) => {
                allEvents.push({
                    id: `visit-${wound.id}-${visit.date}`,
                    date: new Date(visit.date),
                    dateStr: visit.date,
                    type: 'visit',
                    title: wound.label,
                    description: `${visit.images.length} photos, ${wound.type}`,
                    sourceId: wound.id
                })
            })
        })

        // Add documents
        patient.documents?.forEach(doc => {
            allEvents.push({
                id: doc.id,
                date: new Date(doc.dateIssued),
                dateStr: doc.dateIssued,
                type: 'document',
                title: doc.title,
                description: doc.summary,
                sourceId: doc.id
            })
        })

        // Add photo groups
        patient.photoGroups?.forEach(group => {
            allEvents.push({
                id: `photos-${group.date}`,
                date: new Date(group.date),
                dateStr: group.date,
                type: 'photos',
                title: "Photos",
                description: `${group.photos.length} photos taken`,
                sourceId: group.date
            })
        })

        // Sort descending
        return allEvents.sort((a, b) => b.date.getTime() - a.date.getTime())
    }, [patient])

    // Set initial selection
    useMemo(() => {
        if (!selectedEventId && events.length > 0) {
            setSelectedEventId(events[0].id)
        }
    }, [events, selectedEventId])

    const selectedEvent = events.find(e => e.id === selectedEventId)

    // helper to get difference in days
    const getDayDiff = (d1: Date, d2: Date) => {
        const diffTime = Math.abs(d1.getTime() - d2.getTime());
        return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    }

    return (
        <div className="flex h-full w-full bg-background overflow-hidden">
            {/* Left Column: Timeline List */}
            <div className="flex h-full w-[28rem] shrink-0 flex-col border-r border-border bg-card/10">
                <div className="border-b border-border px-6 py-4 shrink-0">
                    <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        Timeline
                    </h2>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                        Chronological patient history
                    </p>
                </div>

                <div className="flex-1 overflow-y-auto scrollbar-hide pt-2">
                    <div className="w-[28rem] py-4 relative px-2">
                        {/* The timeline line - Bright yellow & thick */}
                        <div className="absolute left-[3.25rem] top-0 bottom-0 w-[4px] bg-amber-400/60" />

                        <div className="flex flex-col">
                            {events.map((event, idx) => {
                                const prevEvent = events[idx - 1]
                                const showDate = !prevEvent || prevEvent.dateStr !== event.dateStr
                                const dayDiff = prevEvent ? getDayDiff(prevEvent.date, event.date) : 0
                                const isYearBreak = prevEvent && prevEvent.date.getFullYear() !== event.date.getFullYear()
                                const isSelected = selectedEventId === event.id

                                // Extreme tight spacing logic
                                let spacingClass = ""
                                if (prevEvent) {
                                    if (dayDiff === 0) spacingClass = "mt-0.5"
                                    else if (dayDiff === 1) spacingClass = "mt-2.5"
                                    else if (dayDiff === 2) spacingClass = "mt-5"
                                    else spacingClass = "mt-2" // base for gaps
                                }

                                return (
                                    <div key={event.id} className={cn("relative", spacingClass)}>
                                        {/* Year Break (wins over day gaps) */}
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

                                        <div
                                            className="flex gap-3 group cursor-pointer"
                                            onClick={() => setSelectedEventId(event.id)}
                                        >
                                            {/* Left Side: Date */}
                                            <div className="w-[2.5rem] shrink-0 text-right pt-2">
                                                {showDate && (
                                                    <span className="text-[10px] font-bold text-amber-500/80 uppercase tracking-tighter leading-none">
                                                        {new Date(event.dateStr).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Center: (Spine marker only) */}
                                            <div className="relative w-1.5 shrink-0" />

                                            {/* Right Side: Card (Fluid & Tight) */}
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
                                                            {/* DO NOT TOUCH THE LINE BELOW - Icon manually fixed (UTF-32) */}
                                                            {event.type === 'visit' && "❤️‍🩹"}
                                                            {event.type === 'document' && "📋"}
                                                            {event.type === 'photos' && "🖼️"}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className={cn(
                                                                "text-sm font-medium transition-colors truncate",
                                                                isSelected ? "text-primary" : "text-foreground group-hover/item:text-primary"
                                                            )}>
                                                                {event.title}
                                                            </h4>
                                                            <p className="text-xs leading-relaxed text-muted-foreground/70 line-clamp-1">
                                                                {event.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Contextual Detail Panel */}
            <div className="flex-1 h-full min-w-0 bg-background/50">
                {selectedEvent ? (
                    <TimelineDetail
                        type={selectedEvent.type}
                        sourceId={selectedEvent.sourceId}
                        patient={patient}
                        dateStr={selectedEvent.dateStr}
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground p-12 text-center">
                        <div>
                            <div className="h-12 w-12 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4 opacity-50">
                                <Clock className="h-6 w-6" />
                            </div>
                            <p className="text-sm font-medium">Select an event</p>
                            <p className="text-xs opacity-70 mt-1 uppercase tracking-wider">to view clinical details</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
