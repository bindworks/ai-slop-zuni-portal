"use client"

import { use, useMemo } from "react"
import { TimelineList, TimelineEvent } from "@/components/timeline-gallery/timeline-list"
import { mockPatients } from "@/lib/mock-data"
import { useParams } from "next/navigation"

export default function TimelineLayout({
    params,
    children
}: {
    params: Promise<{ patientId: string }>,
    children: React.ReactNode
}) {
    const { patientId } = use(params)
    const { eventId } = useParams()
    const patient = mockPatients.find(p => p.id === patientId) || mockPatients[0]

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
                description: [doc.category, doc.issuingInstitution, doc.doctor].filter(Boolean).join(', '),
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

        return allEvents.sort((a, b) => b.date.getTime() - a.date.getTime())
    }, [patient])

    return (
        <div className="flex h-full w-full bg-background overflow-hidden relative">
            <TimelineList
                events={events}
                selectedEventId={eventId as string}
                patientId={patientId}
            />
            <div className="flex-1 h-full min-w-0 bg-background/50">
                {children}
            </div>
        </div>
    )
}
