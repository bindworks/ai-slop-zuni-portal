"use client"

import { use, useMemo } from "react"
import { WoundHistoryGallery } from "@/components/wound-history-gallery/wound-history-gallery"
import { mockPatients } from "@/lib/mock-data"
import { useParams, useRouter } from "next/navigation"

export default function WoundLayout({
    params,
    children
}: {
    params: Promise<{ patientId: string, woundid: string }>,
    children: React.ReactNode
}) {
    const { patientId, woundid } = use(params)
    const { imageid } = useParams()
    const router = useRouter()
    const patient = mockPatients.find(p => p.id === patientId) || mockPatients[0]

    return (
        <div className="flex h-full w-full relative">
            <WoundHistoryGallery
                patientId={patientId}
                woundId={woundid}
            />
            {children}
        </div>
    )
}
