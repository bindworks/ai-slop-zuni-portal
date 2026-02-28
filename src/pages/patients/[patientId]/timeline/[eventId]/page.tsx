import { useMemo } from "react"
import { TimelineDetail } from "@/src/components/timeline-gallery/timeline-detail"
import { mockPatients } from "@/src/lib/mock-data"
import { TimelineEvent } from "@/src/components/timeline-gallery/timeline-list"
import { useParams } from "react-router-dom"

export default function TimelineEventPage() {
    const { patientId = "", eventId = "" } = useParams()
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
