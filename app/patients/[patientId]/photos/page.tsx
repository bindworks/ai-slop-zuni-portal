"use client"

import { use, useMemo } from "react"
import { PhotoGroup } from "@/components/photo-album-gallery/photo-group"
import { photoGroups } from "@/components/photo-album-gallery/mock-data"
import { useRouter } from "next/navigation"

export default function PhotoAlbumPage({
    params
}: {
    params: Promise<{ patientId: string }>
}) {
    const { patientId } = use(params)
    const router = useRouter()
    const totalPhotos = useMemo(() => photoGroups.flatMap((g) => g.photos).length, [])

    return (
        <div className="flex h-full flex-col">
            <div className="border-b border-border px-6 py-4">
                <h2 className="text-sm font-semibold text-foreground">📸 Photo Album</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                    {totalPhotos} photos across {photoGroups.length} dates
                </p>
            </div>
            <div className="flex-1 overflow-y-auto p-4 text-left">
                <div className="flex flex-col gap-6">
                    {photoGroups.map((group) => (
                        <PhotoGroup
                            key={group.date}
                            date={group.date}
                            photos={group.photos}
                            onPreviewPhoto={(id) => router.push(`/patients/${patientId}/photos/${id}`)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
