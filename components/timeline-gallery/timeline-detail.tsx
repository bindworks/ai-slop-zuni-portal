"use client"

import { VisitColumn } from "../wound-history-gallery/visit-column"
import { DocumentDetail } from "../documents-gallery/document-detail"
import { PhotoGrid } from "../photo-album-gallery/photo-grid"
import { Patient } from "../common/types"
import { useState, useCallback } from "react"
import { ImagePreview } from "../image-preview/image-preview"
import { UiLink } from "@/components/common/ui-link"
import { useTranslation } from "react-i18next"

interface TimelineDetailProps {
    type: 'visit' | 'document' | 'photos'
    sourceId: string
    patient: Patient
    dateStr: string
}

export function TimelineDetail({ type, sourceId, patient, dateStr }: TimelineDetailProps) {
    const { t, i18n } = useTranslation()
    const [previewImageId, setPreviewImageId] = useState<number | string | null>(null)
    const [notesExpanded, setNotesExpanded] = useState(false)
    const toggleNotes = useCallback(() => setNotesExpanded((v: boolean) => !v), [])

    if (type === 'visit') {
        // sourceId is "woundId"
        const wound = patient.wounds.find(w => w.id === sourceId)
        const visitIndex = wound?.history.findIndex(v => v.date === dateStr)

        if (!wound || visitIndex === undefined || visitIndex === -1) return null

        const visit = wound.history[visitIndex]
        const nextNextVisit = wound.history[visitIndex - 2] // Newest (Far Left)
        const nextVisit = wound.history[visitIndex - 1] // Newer (Left)
        const previousVisit = wound.history[visitIndex + 1] // Older (Right)
        const previousPreviousVisit = wound.history[visitIndex + 2] // Oldest (Far Right)

        return (
            <div className="w-full h-full relative">
                <div className="flex flex-col items-center w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar bg-card/50">
                    <div className="flex w-max max-w-none h-fit shadow-[0_0_40px_-15px_rgba(0,0,0,0.5)] border-x border-border bg-card">

                        {/* Next Next (Newest) - Far Left */}
                        {nextNextVisit ? (
                            <UiLink
                                href={`/patients/${patient.id}/timeline/visit-${sourceId}-${nextNextVisit.date}`}
                                className="w-[16rem] shrink-0 opacity-20 grayscale-[0.8] bg-card/30 hover:opacity-80 hover:grayscale-0 transition-all cursor-pointer block"
                            >
                                <VisitColumn
                                    visit={nextNextVisit}
                                    previousVisit={nextVisit}
                                    idx={0}
                                    selectedImage={null}
                                    onSelectImage={() => { }}
                                    isCurrent={false}
                                    notesExpanded={notesExpanded}
                                    onToggleNotes={toggleNotes}
                                    onPreviewImage={() => { }}
                                    valueAlign="right"
                                />
                            </UiLink>
                        ) : (
                            <div className="w-[16rem] shrink-0 opacity-20 pointer-events-none grayscale-[0.8] bg-card/30" />
                        )}

                        {/* Next (Newer) - Left */}
                        {nextVisit ? (
                            <UiLink
                                href={`/patients/${patient.id}/timeline/visit-${sourceId}-${nextVisit.date}`}
                                className="w-[16rem] shrink-0 opacity-40 grayscale-[0.5] bg-card/30 hover:opacity-80 hover:grayscale-0 transition-all cursor-pointer block"
                            >
                                <VisitColumn
                                    visit={nextVisit}
                                    previousVisit={visit}
                                    idx={0}
                                    selectedImage={null}
                                    onSelectImage={() => { }}
                                    isCurrent={false}
                                    notesExpanded={notesExpanded}
                                    onToggleNotes={toggleNotes}
                                    onPreviewImage={() => { }}
                                    valueAlign="right"
                                />
                            </UiLink>
                        ) : (
                            <div className="w-[16rem] shrink-0 opacity-40 pointer-events-none grayscale-[0.5] bg-card/30" />
                        )}

                        {/* Current - Center */}
                        <VisitColumn
                            visit={visit}
                            previousVisit={previousVisit}
                            idx={0}
                            selectedImage={null}
                            onSelectImage={() => { }}
                            isCurrent
                            showBodyIndicator={true}
                            notesExpanded={notesExpanded}
                            onToggleNotes={toggleNotes}
                            onPreviewImage={setPreviewImageId}
                        />

                        {/* Previous (Older) - Right */}
                        {previousVisit ? (
                            <UiLink
                                href={`/patients/${patient.id}/timeline/visit-${sourceId}-${previousVisit.date}`}
                                className="w-[16rem] shrink-0 opacity-40 grayscale-[0.5] bg-card/30 hover:opacity-80 hover:grayscale-0 transition-all cursor-pointer block"
                            >
                                <VisitColumn
                                    visit={previousVisit}
                                    previousVisit={previousPreviousVisit}
                                    idx={0}
                                    selectedImage={null}
                                    onSelectImage={() => { }}
                                    isCurrent={false}
                                    notesExpanded={notesExpanded}
                                    onToggleNotes={toggleNotes}
                                    onPreviewImage={() => { }}
                                    valueAlign="left"
                                />
                            </UiLink>
                        ) : (
                            <div className="w-[16rem] shrink-0 opacity-40 pointer-events-none grayscale-[0.5] bg-card/30" />
                        )}

                        {/* Previous Previous (Oldest) - Far Right */}
                        {previousPreviousVisit ? (
                            <UiLink
                                href={`/patients/${patient.id}/timeline/visit-${sourceId}-${previousPreviousVisit.date}`}
                                className="w-[16rem] shrink-0 opacity-20 grayscale-[0.8] bg-card/30 hover:opacity-80 hover:grayscale-0 transition-all cursor-pointer block"
                            >
                                <VisitColumn
                                    visit={previousPreviousVisit}
                                    previousVisit={wound.history[visitIndex + 3]}
                                    idx={0}
                                    selectedImage={null}
                                    onSelectImage={() => { }}
                                    isCurrent={false}
                                    notesExpanded={notesExpanded}
                                    onToggleNotes={toggleNotes}
                                    onPreviewImage={() => { }}
                                    valueAlign="left"
                                />
                            </UiLink>
                        ) : (
                            <div className="w-[16rem] shrink-0 opacity-20 pointer-events-none grayscale-[0.8] bg-card/30" />
                        )}

                    </div>
                </div>
                {previewImageId && (
                    <ImagePreview
                        src={visit.images.find(img => img.id === previewImageId)?.src || ""}
                        alt={t("gallery.wound_detail")}
                        onClose={() => setPreviewImageId(null)}
                    />
                )}
            </div>
        )
    }

    if (type === 'document') {
        const doc = patient.documents?.find(d => d.id === sourceId)
        if (!doc || !doc.url) return null

        return <DocumentDetail doc={doc} />
    }

    if (type === 'photos') {
        const group = patient.photoGroups?.find(g => g.date === dateStr)
        if (!group) return null

        return (
            <div className="flex h-full flex-col">
                <div className="border-b border-border px-6 py-4 bg-card/50">
                    <h2 className="text-sm font-semibold text-foreground">
                        📸 {t("gallery.photos_from", { date: new Date(dateStr + "T00:00:00").toLocaleDateString(i18n.language, { day: 'numeric', month: 'long', year: 'numeric' }) })}
                    </h2>
                    <p className="mt-0.5 text-xs text-muted-foreground">{group.photos.length} {t("gallery.clinical_images")}</p>
                </div>
                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                    <PhotoGrid photos={group.photos} onPreviewPhoto={setPreviewImageId} />
                </div>
                {previewImageId && (
                    <ImagePreview
                        src={group.photos.find(p => p.id === previewImageId)?.src || ""}
                        alt={t("gallery.photo")}
                        onClose={() => setPreviewImageId(null)}
                    />
                )}
            </div>
        )
    }

    return null
}
