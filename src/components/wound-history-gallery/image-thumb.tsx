import { UiImage } from "@/src/components/common/ui-image"
import { Check, Eye } from "lucide-react"
import { cn } from "@/src/lib/utils"
import { VisitImage } from "../common/types"
import { tagColors } from "../common/constants"

export function ImageThumb({
    img,
    idx,
    selectedImage,
    onSelectImage,
    onPreviewImage,
}: {
    img: VisitImage
    idx: number
    selectedImage: number | string | null
    onSelectImage: (id: number | string) => void
    onPreviewImage?: (id: number | string) => void
}) {
    return (
        <div className="group relative">
            <button
                onClick={() => {
                    onSelectImage(img.id)
                    onPreviewImage?.(img.id)
                }}
                className={cn(
                    "relative w-24 shrink-0 overflow-hidden rounded-lg border transition-all",
                    selectedImage === img.id
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-border hover:border-primary/40"
                )}
            >
                <div className="relative aspect-square overflow-hidden bg-muted">
                    <UiImage
                        src={img.src}
                        alt={img.tag}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20 flex items-center justify-center pb-4">
                        <div className="opacity-0 transition-opacity group-hover:opacity-100 rounded-full bg-background/90 p-1.5 text-foreground backdrop-blur-sm shadow-sm">
                            <Eye className="h-4 w-4" />
                        </div>
                    </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/80 to-transparent p-1 pt-4">
                    <span
                        className={cn(
                            "inline-block rounded px-1 py-0.5 text-[8px] font-semibold",
                            tagColors[img.tag] || "bg-muted text-muted-foreground"
                        )}
                    >
                        {img.tag}
                    </span>
                </div>
            </button>
        </div>
    )
}
