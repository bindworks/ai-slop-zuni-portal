"use client"

import { use, useMemo, useCallback } from "react"
import { ImagePreview } from "@/components/image-preview/image-preview"
import { photoGroups } from "@/components/photo-album-gallery/mock-data"
import { useRouter } from "next/navigation"

export default function PhotoDetailPage({
    params
}: {
    params: Promise<{ patientId: string, imageid: string }>
}) {
    const { patientId, imageid } = use(params)
    const router = useRouter()

    const allPhotos = useMemo(() => photoGroups.flatMap((g) => g.photos), [])
    const currentIndex = allPhotos.findIndex((p) => p.id === imageid)
    const previewPhoto = allPhotos[currentIndex]

    const handleNext = useCallback(() => {
        if (currentIndex < allPhotos.length - 1) {
            router.push(`/patients/${patientId}/photos/${allPhotos[currentIndex + 1].id}`)
        }
    }, [currentIndex, allPhotos, patientId, router])

    const handlePrev = useCallback(() => {
        if (currentIndex > 0) {
            router.push(`/patients/${patientId}/photos/${allPhotos[currentIndex - 1].id}`)
        }
    }, [currentIndex, allPhotos, patientId, router])

    if (!previewPhoto) return null

    return (
        <ImagePreview
            src={previewPhoto.src}
            alt={previewPhoto.caption}
            onClose={() => router.push(`/patients/${patientId}/photos`)}
            onNext={currentIndex < allPhotos.length - 1 ? handleNext : undefined}
            onPrev={currentIndex > 0 ? handlePrev : undefined}
        />
    )
}
