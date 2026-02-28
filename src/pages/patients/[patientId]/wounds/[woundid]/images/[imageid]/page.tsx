import { ImagePreview } from "@/components/image-preview/image-preview"
import { getPatientHistory } from "@/lib/mock-data"
import { useNavigate, useParams } from "react-router-dom"

export default function WoundImageDetailPage() {
    const { patientId, woundid, imageid } = useParams()
    const navigate = useNavigate()

    const visits = getPatientHistory(patientId || "", woundid || "")
    const allImages = visits.flatMap(v => v.images)
    const image = allImages.find(img => img.id === imageid)

    if (!image) return null

    return (
        <ImagePreview
            src={image.src}
            alt={image.tag}
            onClose={() => navigate(`/patients/${patientId}/wounds/${woundid}`)}
        />
    )
}
