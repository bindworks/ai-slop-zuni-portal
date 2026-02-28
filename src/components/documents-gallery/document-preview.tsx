"use client"

import { useEffect } from "react"
import { X, ExternalLink, Calendar, Camera, Building2, UserRound } from "lucide-react"
import { Document } from "../common/types"
import { UiLink } from "@/src/components/common/ui-link"
import { prefixPath } from "@/src/lib/prefix-path"

interface DocumentPreviewProps {
    doc: Document
    onClose: () => void
}

export function DocumentPreview({ doc, onClose }: DocumentPreviewProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [onClose])

    return (
        <div className="flex h-full flex-col bg-background/95 animate-in fade-in duration-200">
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-border/50 bg-background/50 px-6 py-3 backdrop-blur-xl">
                <h2 className="text-sm font-semibold text-foreground truncate mr-4">{doc.title}</h2>
                <div className="flex items-center gap-3">
                    {doc.url && (
                        <UiLink
                            href={doc.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex h-9 items-center gap-2 rounded-lg bg-secondary/50 px-4 text-[12px] font-medium text-foreground transition-all hover:bg-secondary"
                            title="Open in new tab"
                        >
                            <ExternalLink className="h-4 w-4" /> Open
                        </UiLink>
                    )}
                    <button
                        onClick={onClose}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all hover:bg-primary/90 shadow-lg shadow-primary/20"
                        title="Close"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Properties bar */}
            <div className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-1 border-b border-border/50 bg-card/30 px-6 py-2 text-[11px] text-muted-foreground">
                <span className="font-medium text-foreground/80">{doc.category}</span>
                {doc.issuingInstitution && (
                    <span className="flex items-center gap-1"><Building2 className="h-3 w-3" /> {doc.issuingInstitution}</span>
                )}
                {doc.doctor && (
                    <span className="flex items-center gap-1"><UserRound className="h-3 w-3" /> {doc.doctor}</span>
                )}
                <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> Issued {doc.dateIssued}
                </span>
                <span className="flex items-center gap-1">
                    <Camera className="h-3 w-3" /> Photo {doc.datePhoto}
                </span>
            </div>

            {/* Document Viewer Frame */}
            {doc.url && (
                <div className="flex flex-1 items-center justify-center overflow-hidden p-6 md:p-12">
                    <div className="h-full w-full max-w-5xl overflow-hidden rounded-xl border border-border/50 bg-white shadow-2xl">
                        <iframe
                            src={`${prefixPath(doc.url)}#view=FitH`}
                            className="h-full w-full border-0"
                            title={doc.title}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
