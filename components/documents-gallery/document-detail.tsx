"use client"

import { ExternalLink } from "lucide-react"

interface DocumentDetailProps {
    title: string
    url: string
}

export function DocumentDetail({ title, url }: DocumentDetailProps) {
    return (
        <div className="flex h-full flex-col bg-background/50">
            {/* Header */}
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-card/50 px-6 backdrop-blur-sm">
                <h2 className="text-sm font-semibold text-foreground truncate mr-4">{title}</h2>
                <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-8 items-center gap-2 rounded-lg bg-secondary/50 px-3 text-[11px] font-medium text-foreground transition-all hover:bg-secondary shrink-0"
                >
                    <ExternalLink className="h-3.5 w-3.5" /> Open
                </a>
            </div>

            {/* Document Viewer Frame */}
            <div className="flex-1 overflow-hidden p-6">
                <div className="h-full w-full overflow-hidden rounded-xl border border-border/50 bg-white shadow-sm transition-all hover:shadow-md">
                    <iframe
                        src={`${url}#view=FitH`}
                        className="h-full w-full border-0"
                        title={title}
                    />
                </div>
            </div>
        </div>
    )
}
