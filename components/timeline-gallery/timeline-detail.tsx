"use client"

import { VisitColumn } from "../wound-history-gallery/visit-column"
import { DocumentDetail } from "../documents-gallery/document-detail"
import { PhotoGrid } from "../photo-album-gallery/photo-grid"
import { Patient } from "../common/types"
import { useState } from "react"
import { ImagePreview } from "../image-preview/image-preview"

interface TimelineDetailProps {
    type: 'visit' | 'document' | 'photos'
    sourceId: string
    patient: Patient
    dateStr: string
}

export function TimelineDetail({ type, sourceId, patient, dateStr }: TimelineDetailProps) {
    const [previewImageId, setPreviewImageId] = useState<number | string | null>(null)

    if (type === 'visit') {
        // sourceId is "woundId"
        const wound = patient.wounds.find(w => w.id === sourceId)
        const visit = wound?.history.find(v => v.date === dateStr)

        if (!visit) return null

        return (
            <div className="flex h-full flex-col">
                <div className="flex-1 overflow-hidden">
                    <VisitColumn
                        visit={visit}
                        idx={0}
                        selectedImage={null}
                        onSelectImage={() => { }}
                        isCurrent
                        headerLabel={visit.label}
                        onPreviewImage={setPreviewImageId}
                    />
                </div>
                {previewImageId && (
                    <ImagePreview
                        src={visit.images.find(img => img.id === previewImageId)?.src || ""}
                        alt="Wound Review"
                        onClose={() => setPreviewImageId(null)}
                    />
                )}
            </div>
        )
    }

    if (type === 'document') {
        const doc = patient.documents?.find(d => d.id === sourceId)
        if (!doc || !doc.url) return null

        return <DocumentDetail title={doc.title} url={doc.url} />
    }

    if (type === 'photos') {
        const group = patient.photoGroups?.find(g => g.date === dateStr)
        if (!group) return null

        return (
            <div className="flex h-full flex-col">
                <div className="border-b border-border px-6 py-4 bg-card/50">
                    <h2 className="text-sm font-semibold text-foreground">📸 Photos from {new Date(dateStr + "T00:00:00").toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</h2>
                    <p className="mt-0.5 text-xs text-muted-foreground">{group.photos.length} clinical images</p>
                </div>
                <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                    <PhotoGrid photos={group.photos} onPreviewPhoto={setPreviewImageId} />
                </div>
                {previewImageId && (
                    <ImagePreview
                        src={group.photos.find(p => p.id === previewImageId)?.src || ""}
                        alt="Photo Preview"
                        onClose={() => setPreviewImageId(null)}
                    />
                )}
            </div>
        )
    }

    return null
}
