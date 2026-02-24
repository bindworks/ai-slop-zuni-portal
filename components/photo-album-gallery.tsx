"use client"

import { useState, useMemo, useCallback } from "react"
import Image from "next/image"
import { Calendar, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { ImagePreview } from "./image-preview"

/* ── Photo pool ── */

const photoSrcs = [
    "/photo-patient-room.png",
    "/photo-wound-dressing.png",
    "/photo-medical-supplies.png",
    "/photo-compression-sock.png",
    "/photo-hospital-corridor.png",
    "/photo-physio-exercise.png",
]

/* ── Mock data grouped by date ── */

interface Photo {
    id: string
    src: string
    caption: string
}

interface DateGroup {
    date: string
    photos: Photo[]
}

const photoGroups: DateGroup[] = [
    {
        date: "2026-02-18",
        photos: [
            { id: "P-001", src: photoSrcs[0], caption: "Patient room — morning check" },
            { id: "P-002", src: photoSrcs[1], caption: "Dressing after change" },
            { id: "P-003", src: photoSrcs[2], caption: "Supplies prepared for procedure" },
        ],
    },
    {
        date: "2026-02-11",
        photos: [
            { id: "P-004", src: photoSrcs[3], caption: "Compression stocking application" },
            { id: "P-005", src: photoSrcs[5], caption: "Physiotherapy session — ankle ROM" },
            { id: "P-006", src: photoSrcs[0], caption: "Room after bed adjustment" },
            { id: "P-007", src: photoSrcs[2], caption: "Wound care tray — sterile setup" },
        ],
    },
    {
        date: "2026-02-04",
        photos: [
            { id: "P-008", src: photoSrcs[1], caption: "Bandage applied post-debridement" },
            { id: "P-009", src: photoSrcs[4], caption: "Ward corridor — facility photo" },
            { id: "P-010", src: photoSrcs[5], caption: "Rehabilitation exercises" },
        ],
    },
    {
        date: "2026-01-28",
        photos: [
            { id: "P-011", src: photoSrcs[3], caption: "Compression therapy — left leg" },
            { id: "P-012", src: photoSrcs[0], caption: "Patient room — afternoon" },
        ],
    },
    {
        date: "2026-01-21",
        photos: [
            { id: "P-013", src: photoSrcs[2], caption: "Debridement supplies" },
            { id: "P-014", src: photoSrcs[1], caption: "Post-debridement dressing" },
            { id: "P-015", src: photoSrcs[4], caption: "Hallway to treatment room" },
            { id: "P-016", src: photoSrcs[5], caption: "Mobility assessment" },
            { id: "P-017", src: photoSrcs[0], caption: "Room setup for visit" },
        ],
    },
    {
        date: "2026-01-15",
        photos: [
            { id: "P-018", src: photoSrcs[3], caption: "Initial compression fitting" },
            { id: "P-019", src: photoSrcs[2], caption: "Initial assessment supplies" },
            { id: "P-020", src: photoSrcs[4], caption: "Clinic entrance" },
        ],
    },
]

/* ── Photo Album Gallery ── */

export function PhotoAlbumGallery({
    multiSelectedImages = [],
    onToggleMultiSelect,
}: {
    multiSelectedImages?: (number | string)[]
    onToggleMultiSelect?: (id: number | string) => void
}) {
    const [previewPhotoId, setPreviewPhotoId] = useState<string | null>(null)

    // Flatten all photos for easy navigation
    const allPhotos = useMemo(() => photoGroups.flatMap((g) => g.photos), [])

    const totalPhotos = allPhotos.length

    const currentIndex = allPhotos.findIndex((p) => p.id === previewPhotoId)
    const previewPhoto = allPhotos[currentIndex]

    const handleNext = useCallback(() => {
        if (currentIndex < allPhotos.length - 1) {
            setPreviewPhotoId(allPhotos[currentIndex + 1].id)
        }
    }, [currentIndex, allPhotos])

    const handlePrev = useCallback(() => {
        if (currentIndex > 0) {
            setPreviewPhotoId(allPhotos[currentIndex - 1].id)
        }
    }, [currentIndex, allPhotos])

    return (
        <div className="flex h-full flex-col">
            <div className="border-b border-border px-6 py-4">
                <h2 className="text-sm font-semibold text-foreground">🖼️ Photo Album</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                    {totalPhotos} photos across {photoGroups.length} dates
                </p>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
                <div className="flex flex-col gap-6">
                    {photoGroups.map((group) => (
                        <div key={group.date}>
                            {/* Date separator */}
                            <div className="mb-3 flex items-center gap-2">
                                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                <span className="text-xs font-semibold text-muted-foreground">
                                    {new Date(group.date + "T00:00:00").toLocaleDateString("en-US", {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </span>
                                <div className="flex-1 border-t border-border" />
                                <span className="text-[11px] text-muted-foreground">
                                    {group.photos.length} photo{group.photos.length !== 1 ? "s" : ""}
                                </span>
                            </div>

                            {/* Photo grid — Responsive auto-fill (min 3 per row at 1024px) */}
                            <div className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-3">
                                {group.photos.map((photo) => {
                                    const isMultiSelected = multiSelectedImages.includes(photo.id)

                                    return (
                                        <div
                                            key={photo.id}
                                            className="group relative"
                                        >
                                            <div
                                                onClick={() => setPreviewPhotoId(photo.id)}
                                                className="overflow-hidden rounded-xl border border-border bg-card transition-all hover:ring-2 hover:ring-primary/40 cursor-pointer"
                                            >
                                                <div className="relative aspect-square">
                                                    <Image
                                                        src={photo.src}
                                                        alt={photo.caption}
                                                        fill
                                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                </div>
                                                {/* Caption overlay */}
                                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2.5 pt-6">
                                                    <p className="text-xs font-medium text-white/90 leading-tight">
                                                        {photo.caption}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Multi-selection checkbox */}
                                            <div
                                                className={cn(
                                                    "absolute right-2 top-2 z-10 flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg border bg-card/80 backdrop-blur-sm transition-all",
                                                    isMultiSelected
                                                        ? "border-primary bg-primary text-primary-foreground opacity-100"
                                                        : "border-white/20 hover:border-white/50 opacity-0 group-hover:opacity-100"
                                                )}
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    onToggleMultiSelect?.(photo.id)
                                                }}
                                            >
                                                {isMultiSelected && <Check className="h-3.5 w-3.5" />}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Fullscreen Preview */}
            {previewPhoto && (
                <ImagePreview
                    src={previewPhoto.src}
                    alt={previewPhoto.caption}
                    onClose={() => setPreviewPhotoId(null)}
                    onNext={currentIndex < allPhotos.length - 1 ? handleNext : undefined}
                    onPrev={currentIndex > 0 ? handlePrev : undefined}
                />
            )}
        </div>
    )
}
