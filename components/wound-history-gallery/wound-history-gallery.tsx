"use client"

import { useState, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { VisitColumn } from "./visit-column"
import { getPatientHistory } from "@/lib/mock-data"

export function WoundHistoryGallery({
    patientId,
    woundId,
}: {
    patientId: string
    woundId: string
}) {
    const visits = getPatientHistory(patientId, woundId)
    const currentVisit = visits[0]
    const historyVisits = visits.slice(1)

    const { imageid } = useParams()
    const router = useRouter()

    const [notesExpanded, setNotesExpanded] = useState(false)
    const toggleNotes = useCallback(() => setNotesExpanded((v: boolean) => !v), [])

    const handlePreviewImage = (id: string | number) => {
        router.push(`/patients/${patientId}/wounds/${woundId}/images/${id}`)
    }

    return (
        <div className="flex h-full w-full bg-background overflow-auto custom-scrollbar">
            <div className="flex min-w-max h-fit">
                <VisitColumn
                    key={currentVisit.date}
                    visit={currentVisit}
                    previousVisit={historyVisits[0]}
                    selectedImage={imageid as string}
                    onSelectImage={handlePreviewImage}
                    idx={0}
                    notesExpanded={notesExpanded}
                    onToggleNotes={toggleNotes}
                    isCurrent
                />
                {historyVisits.map((visit, vIdx) => {
                    const previousVisit = historyVisits[vIdx + 1]
                    return (
                        <VisitColumn
                            key={visit.date}
                            visit={visit}
                            previousVisit={previousVisit}
                            selectedImage={imageid as string}
                            onSelectImage={handlePreviewImage}
                            idx={vIdx + 1}
                            notesExpanded={notesExpanded}
                            onToggleNotes={toggleNotes}
                        />
                    )
                })}
            </div>
        </div>
    )
}
