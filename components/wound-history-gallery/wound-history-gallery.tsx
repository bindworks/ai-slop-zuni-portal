"use client"

import { useState, useRef, useCallback } from "react"
import { Stethoscope } from "lucide-react"
import { ImagePreview } from "../image-preview/image-preview"
import { VisitColumn } from "./visit-column"
import { getPatientHistory } from "@/lib/mock-data"

export function WoundHistoryGallery({
    selectedImage,
    onSelectImage,
    patientId,
    woundId,
}: {
    selectedImage: number | string | null
    onSelectImage: (id: number | string) => void
    patientId: string
    woundId: string
}) {
    const visits = getPatientHistory(patientId, woundId)
    const currentVisit = visits[0]
    const historyVisits = visits.slice(1)

    const [previewImageId, setPreviewImageId] = useState<number | string | null>(null)

    // Flatten all images for navigation
    const allVisits = [currentVisit, ...historyVisits]
    const allImages = allVisits.flatMap(v => v.images)

    const currentPreviewIndex = allImages.findIndex(img => img.id === previewImageId)
    const previewImage = allImages[currentPreviewIndex]

    const scrollRefs = useRef<(HTMLDivElement | null)[]>([])
    const activeScroller = useRef<HTMLDivElement | null>(null)

    const registerScrollRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
        scrollRefs.current[index] = el
    }, [])

    const handlePointerEnter = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
        activeScroller.current = e.currentTarget
    }, [])

    const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        const el = e.currentTarget
        if (el !== activeScroller.current) return
        scrollRefs.current.forEach((ref) => {
            if (ref && ref !== el) {
                ref.scrollTop = el.scrollTop
            }
        })
    }, [])

    const [notesExpanded, setNotesExpanded] = useState(false)
    const toggleNotes = useCallback(() => setNotesExpanded((v) => !v), [])

    return (
        <div className="flex h-full w-full bg-background/50">
            {/* Fixed current-state column */}
            <div className="shrink-0">
                <VisitColumn
                    key={currentVisit.date}
                    visit={currentVisit}
                    previousVisit={historyVisits[0]}
                    selectedImage={selectedImage}
                    onSelectImage={onSelectImage}
                    idx={-1}
                    scrollRef={registerScrollRef(0)}
                    onSyncScroll={handleScroll}
                    onPointerEnterScroll={handlePointerEnter}
                    notesExpanded={notesExpanded}
                    onToggleNotes={toggleNotes}
                    onPreviewImage={setPreviewImageId}
                    isCurrent
                />
            </div>
            {/* Scrollable history columns */}
            <div className="flex h-full flex-1 overflow-x-auto">
                <div className="flex h-full flex-row">
                    {historyVisits.map((visit, vIdx) => {
                        const previousVisit = historyVisits[vIdx + 1]
                        return (
                            <VisitColumn
                                key={visit.date}
                                visit={visit}
                                previousVisit={previousVisit}
                                selectedImage={selectedImage}
                                onSelectImage={onSelectImage}
                                idx={vIdx}
                                scrollRef={registerScrollRef(vIdx + 1)}
                                onSyncScroll={handleScroll}
                                onPointerEnterScroll={handlePointerEnter}
                                notesExpanded={notesExpanded}
                                onToggleNotes={toggleNotes}
                                onPreviewImage={setPreviewImageId}
                            />
                        )
                    })}
                </div>
            </div>

            {/* Fullscreen Preview */}
            {previewImage && (
                <ImagePreview
                    src={previewImage.src}
                    alt={`${previewImage.tag} - ${previewImage.id} `}
                    onClose={() => setPreviewImageId(null)}
                />
            )}
        </div>
    )
}
