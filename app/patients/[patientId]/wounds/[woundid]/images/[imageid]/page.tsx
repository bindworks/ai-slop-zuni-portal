"use client"

import { use, useMemo } from "react"
import { ImagePreview } from "@/components/image-preview/image-preview"
import { getPatientHistory } from "@/lib/mock-data"
import { useRouter } from "next/navigation"

export default function WoundImageDetailPage({
    params
}: {
    params: Promise<{ patientId: string, woundid: string, imageid: string }>
}) {
    const { patientId, woundid, imageid } = use(params)
    const router = useRouter()

    const visits = getPatientHistory(patientId, woundid)
    const allImages = visits.flatMap(v => v.images)
    const image = allImages.find(img => img.id === imageid)

    if (!image) return null

    return (
        <ImagePreview
            src={image.src}
            alt={image.tag}
            onClose={() => router.push(`/patients/${patientId}/wounds/${woundid}`)}
        />
    )
}
