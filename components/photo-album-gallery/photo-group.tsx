"use client"

import { UiImage } from "@/components/common/ui-image"
import { Calendar, Eye } from "lucide-react"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"
import { Photo } from "../common/types"

export function PhotoGroup({
    date,
    photos,
    onPreviewPhoto,
}: {
    date: string
    photos: Photo[]
    onPreviewPhoto: (id: string | number) => void
}) {
    const { t, i18n } = useTranslation()
    return (
        <div className="text-left">
            {/* Date separator */}
            <div className="mb-3 flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs font-semibold text-muted-foreground">
                    {new Date(date + "T00:00:00").toLocaleDateString(i18n.language, {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </span>
                <div className="flex-1 border-t border-border" />
                <span className="text-[11px] text-muted-foreground">
                    {t("plural.photo", { count: photos.length })}
                </span>
            </div>

            {/* Photo grid — Responsive auto-fill */}
            <div className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-3">
                {photos.map((photo) => {
                    return (
                        <div key={photo.id} className="group relative">
                            <div
                                onClick={() => onPreviewPhoto(photo.id)}
                                className="overflow-hidden rounded-xl border border-border bg-card transition-all hover:ring-2 hover:ring-primary/40 cursor-pointer"
                            >
                                <div className="relative aspect-square">
                                    <UiImage
                                        src={photo.src}
                                        alt={photo.caption}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20 flex items-center justify-center pb-6">
                                        <div className="opacity-0 transition-opacity group-hover:opacity-100 rounded-full bg-background/90 p-1.5 text-foreground backdrop-blur-sm shadow-sm scale-150">
                                            <Eye className="h-4 w-4" />
                                        </div>
                                    </div>
                                </div>
                                {/* Caption overlay */}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2.5 pt-6 text-left">
                                    <p className="text-xs font-medium text-white/90 leading-tight">
                                        {photo.caption}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}
