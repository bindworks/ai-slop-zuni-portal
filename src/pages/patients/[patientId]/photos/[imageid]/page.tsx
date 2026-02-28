import { useMemo, useCallback } from "react"
import { ImagePreview } from "@/src/components/image-preview/image-preview"
import { photoGroups } from "@/src/components/photo-album-gallery/mock-data"
import { useNavigate, useParams } from "react-router-dom"

export default function PhotoDetailPage() {
    const { patientId, imageid } = useParams()
    const navigate = useNavigate()

    const allPhotos = useMemo(() => photoGroups.flatMap((g) => g.photos), [])
    const currentIndex = allPhotos.findIndex((p) => p.id === imageid)
    const previewPhoto = allPhotos[currentIndex]

    const handleNext = useCallback(() => {
        if (currentIndex < allPhotos.length - 1) {
            navigate(`/patients/${patientId}/photos/${allPhotos[currentIndex + 1].id}`)
        }
    }, [currentIndex, allPhotos, patientId, navigate])

    const handlePrev = useCallback(() => {
        if (currentIndex > 0) {
            navigate(`/patients/${patientId}/photos/${allPhotos[currentIndex - 1].id}`)
        }
    }, [currentIndex, allPhotos, patientId, navigate])

    if (!previewPhoto) return null

    return (
        <ImagePreview
            src={previewPhoto.src}
            alt={previewPhoto.caption}
            onClose={() => navigate(`/patients/${patientId}/photos`)}
            onNext={currentIndex < allPhotos.length - 1 ? handleNext : undefined}
            onPrev={currentIndex > 0 ? handlePrev : undefined}
        />
    )
}
