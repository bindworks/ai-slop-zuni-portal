"use client"

import Image from "next/image"
import { Eye } from "lucide-react"

interface Photo {
    id: string | number
    src: string
    caption: string
}

interface PhotoGridProps {
    photos: Photo[]
    onPreviewPhoto: (id: string | number) => void
}

export function PhotoGrid({ photos, onPreviewPhoto }: PhotoGridProps) {
    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
            {photos.map((photo) => (
                <div key={photo.id} className="group relative">
                    <div
                        onClick={() => onPreviewPhoto(photo.id)}
                        className="overflow-hidden rounded-xl border border-border bg-card transition-all hover:ring-2 hover:ring-primary/40 cursor-pointer shadow-sm"
                    >
                        <div className="relative aspect-square">
                            <Image
                                src={photo.src}
                                alt={photo.caption}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20 flex items-center justify-center">
                                <div className="opacity-0 transition-opacity group-hover:opacity-100 rounded-full bg-background/90 p-2 text-foreground backdrop-blur-sm shadow-sm scale-125">
                                    <Eye className="h-4 w-4" />
                                </div>
                            </div>
                        </div>
                        {/* Caption overlay */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-3 pb-2.5 pt-8 text-left">
                            <p className="text-[11px] font-medium text-white/90 leading-tight">
                                {photo.caption}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
