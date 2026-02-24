import { useState } from "react"
import { Calendar, Camera, ChevronDown, ChevronUp, Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Document } from "../common/types"

export function DocumentRow({ doc, onPreview }: { doc: Document, onPreview?: () => void }) {
    const [expanded, setExpanded] = useState(false)

    return (
        <div className="group flex gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-card/80">
            {/* Thumbnail */}
            <button
                onClick={onPreview}
                className="group/thumb relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
            >
                <Image
                    src={doc.thumbnail}
                    alt={doc.title}
                    fill
                    className="object-cover transition-transform group-hover/thumb:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover/thumb:bg-black/20 flex items-center justify-center">
                    <div className="opacity-0 transition-opacity group-hover/thumb:opacity-100 rounded-full bg-background/90 p-1.5 text-foreground backdrop-blur-sm shadow-sm">
                        <Eye className="h-4 w-4" />
                    </div>
                </div>
            </button>

            {/* Metadata */}
            <div className="flex w-40 shrink-0 flex-col pt-1 gap-1.5">
                <h3 className="text-sm font-semibold text-foreground leading-tight">{doc.title}</h3>
                <p className="text-xs text-muted-foreground">{doc.category}</p>
                <div className="flex flex-col gap-0.5 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Issued {doc.dateIssued}
                    </span>
                    <span className="flex items-center gap-1">
                        <Camera className="h-3 w-3" />
                        Photo {doc.datePhoto}
                    </span>
                </div>
            </div>

            {/* Summary */}
            <div className="flex min-w-0 flex-1 flex-col pt-1">
                <p
                    className={cn(
                        "text-[13px] leading-relaxed text-muted-foreground transition-all",
                        !expanded && "line-clamp-3"
                    )}
                >
                    {doc.summary}
                </p>
                <button
                    onClick={() => setExpanded((v) => !v)}
                    className="mt-1.5 flex items-center gap-1 self-start text-[12px] font-medium text-primary hover:text-primary/80 transition-colors"
                >
                    {expanded ? (
                        <>
                            <ChevronUp className="h-3 w-3" /> Collapse
                        </>
                    ) : (
                        <>
                            <ChevronDown className="h-3 w-3" /> Read more
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}
