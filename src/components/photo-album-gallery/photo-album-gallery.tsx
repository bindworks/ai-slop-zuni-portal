"use client"

import { useState, useMemo, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { ImagePreview } from "../image-preview/image-preview"
import { PhotoGroup } from "./photo-group"
import { photoGroups } from "./mock-data"

export function PhotoAlbumGallery() {
    const { t } = useTranslation()
    const [previewPhotoId, setPreviewPhotoId] = useState<string | number | null>(null)

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
            <div className="border-b border-border px-6 py-4 text-left">
                <h2 className="text-sm font-semibold text-foreground">📸 {t("patient.photo_album")}</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                    {t("gallery.photos_across", { totalPhotos: totalPhotos, datesCount: photoGroups.length })}
                </p>
            </div>
            <div className="flex-1 overflow-y-auto p-4 text-left">
                <div className="flex flex-col gap-6">
                    {photoGroups.map((group) => (
                        <PhotoGroup
                            key={group.date}
                            date={group.date}
                            photos={group.photos}
                            onPreviewPhoto={setPreviewPhotoId}
                        />
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
