"use client"

import { ExternalLink, Calendar, Camera, Building2, UserRound } from "lucide-react"
import { Document } from "../common/types"
import { UiLink } from "@/src/components/common/ui-link"
import { prefixPath } from "@/src/lib/prefix-path"

interface DocumentDetailProps {
    doc: Document
}

export function DocumentDetail({ doc }: DocumentDetailProps) {
    return (
        <div className="flex h-full flex-col bg-background/50">
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-border bg-card/50 px-6 py-3 backdrop-blur-sm">
                <h2 className="text-sm font-semibold text-foreground truncate mr-4">{doc.title}</h2>
                {doc.url && (
                    <UiLink
                        href={doc.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-8 items-center gap-2 rounded-lg bg-secondary/50 px-3 text-[11px] font-medium text-foreground transition-all hover:bg-secondary shrink-0"
                    >
                        <ExternalLink className="h-3.5 w-3.5" /> Open
                    </UiLink>
                )}
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
                <div className="flex-1 overflow-hidden p-6">
                    <div className="h-full w-full overflow-hidden rounded-xl border border-border/50 bg-white shadow-sm transition-all hover:shadow-md">
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
