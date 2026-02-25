"use client"

import { use, useMemo } from "react"
import { TimelineDetail } from "@/components/timeline-gallery/timeline-detail"
import { mockPatients } from "@/lib/mock-data"
import { TimelineEvent } from "@/components/timeline-gallery/timeline-list"

export default function TimelineEventPage({
    params
}: {
    params: Promise<{ patientId: string, eventId: string }>
}) {
    const { patientId, eventId } = use(params)
    const patient = mockPatients.find(p => p.id === patientId) || mockPatients[0]

    // We need to find the event to get sourceId and type
    // This is a bit redundant but stays true to the data model
    const event = useMemo(() => {
        // We'd ideally have an efficient way to find this, but for the mockup:
        // Re-generate or look up
        if (eventId.startsWith("visit-")) {
            const parts = eventId.split("-")
            const woundId = parts[1] + "-" + parts[2] // W-001 etc
            const dateStr = parts[3] + "-" + parts[4] + "-" + parts[5]
            return {
                type: 'visit' as const,
                sourceId: woundId,
                dateStr: dateStr
            }
        } else if (eventId.startsWith("photos-")) {
            const dateStr = eventId.replace("photos-", "")
            return {
                type: 'photos' as const,
                sourceId: dateStr,
                dateStr: dateStr
            }
        } else {
            // Assume document
            const doc = patient.documents?.find(d => d.id === eventId)
            return {
                type: 'document' as const,
                sourceId: eventId,
                dateStr: doc?.dateIssued || ""
            }
        }
    }, [patient, eventId])

    return (
        <TimelineDetail
            type={event.type}
            sourceId={event.sourceId}
            patient={patient}
            dateStr={event.dateStr}
        />
    )
}
