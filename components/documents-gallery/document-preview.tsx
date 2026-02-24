"use client"

import { useEffect } from "react"
import { X, ExternalLink } from "lucide-react"

interface DocumentPreviewProps {
    title: string
    url: string
    onClose: () => void
}

export function DocumentPreview({ title, url, onClose }: DocumentPreviewProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [onClose])

    return (
        <div className="fixed inset-0 z-[100] flex flex-col bg-background/95 backdrop-blur-md animate-in fade-in duration-200">
            {/* Header */}
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-border/50 bg-background/50 px-6 backdrop-blur-xl">
                <h2 className="text-sm font-semibold text-foreground">{title}</h2>
                <div className="flex items-center gap-3">
                    <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex h-9 items-center gap-2 rounded-lg bg-secondary/50 px-4 text-[12px] font-medium text-foreground transition-all hover:bg-secondary"
                        title="Open in new tab"
                    >
                        <ExternalLink className="h-4 w-4" /> Open
                    </a>
                    <button
                        onClick={onClose}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all hover:bg-primary/90 shadow-lg shadow-primary/20"
                        title="Close"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Document Viewer Frame */}
            <div className="flex flex-1 items-center justify-center overflow-hidden p-6 md:p-12">
                <div className="h-full w-full max-w-5xl overflow-hidden rounded-xl border border-border/50 bg-white shadow-2xl">
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
