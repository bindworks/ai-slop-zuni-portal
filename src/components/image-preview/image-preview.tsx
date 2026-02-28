"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { X, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react"
import { UiImage } from "@/src/components/common/ui-image"
import { cn } from "@/src/lib/utils"
import { useTranslation } from "react-i18next"

interface ImagePreviewProps {
    src: string
    alt: string
    onClose: () => void
    onNext?: () => void
    onPrev?: () => void
}

export function ImagePreview({ src, alt, onClose, onNext, onPrev }: ImagePreviewProps) {
    const { t } = useTranslation()
    const [scale, setScale] = useState(1)
    const [offset, setOffset] = useState({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)
    const startPos = useRef({ x: 0, y: 0 })

    // Handle zoom with wheel
    const handleWheel = useCallback((e: React.WheelEvent) => {
        e.preventDefault()
        const delta = e.deltaY > 0 ? -0.2 : 0.2
        setScale((prev) => Math.min(Math.max(prev + delta, 0.5), 5))
    }, [])

    // Handle drag to pan
    const handlePointerDown = (e: React.PointerEvent) => {
        if (scale <= 1) return
        setIsDragging(true)
        startPos.current = { x: e.clientX - offset.x, y: e.clientY - offset.y }
        if (containerRef.current) {
            containerRef.current.style.cursor = 'grabbing'
        }
    }

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDragging) return
        const newX = e.clientX - startPos.current.x
        const newY = e.clientY - startPos.current.y
        setOffset({ x: newX, y: newY })
    }

    const handlePointerUp = () => {
        setIsDragging(false)
        if (containerRef.current) {
            containerRef.current.style.cursor = 'auto'
        }
    }

    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
            if (e.key === "ArrowRight" && onNext) onNext()
            if (e.key === "ArrowLeft" && onPrev) onPrev()
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [onClose, onNext, onPrev])

    const resetZoom = () => {
        setScale(1)
        setOffset({ x: 0, y: 0 })
    }

    return (
        <div
            className="fixed inset-0 z-[100] flex flex-col bg-background/95 backdrop-blur-md animate-in fade-in duration-300"
            onWheel={handleWheel}
        >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-border/50 bg-background/50 px-6 py-4 backdrop-blur-xl">
                <div className="flex items-center gap-4">
                    <h2 className="text-sm font-semibold text-foreground">{alt}</h2>
                    <div className="flex items-center gap-2 rounded-full bg-secondary/50 px-3 py-1 text-[11px] font-medium text-muted-foreground">
                        <span className="text-foreground">{t("gallery.zoom")}:</span> {Math.round(scale * 100)}%
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setScale((s) => Math.min(s + 0.5, 5))}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/50 text-foreground transition-all hover:bg-secondary"
                        title={t("gallery.zoom_in")}
                    >
                        <ZoomIn className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => setScale((s) => Math.max(s - 0.5, 0.5))}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/50 text-foreground transition-all hover:bg-secondary"
                        title={t("gallery.zoom_out")}
                    >
                        <ZoomOut className="h-4 w-4" />
                    </button>
                    <button
                        onClick={resetZoom}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/50 text-foreground transition-all hover:bg-secondary"
                        title={t("gallery.reset")}
                    >
                        <RotateCcw className="h-4 w-4" />
                    </button>
                    <div className="mx-2 h-6 w-px bg-border/50" />
                    <button
                        onClick={onClose}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all hover:bg-primary/90 shadow-lg shadow-primary/20"
                        title={t("gallery.close")}
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Main Preview Area */}
            <div
                ref={containerRef}
                className="relative flex-1 overflow-hidden"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
            >
                <div
                    ref={imageRef}
                    className="flex h-full w-full items-center justify-center transition-transform duration-200 ease-out will-change-transform"
                    style={{
                        transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                    }}
                >
                    <div className="relative aspect-square h-[80vh] w-auto overflow-hidden rounded-2xl border border-border/50 bg-black shadow-2xl">
                        <UiImage
                            src={src}
                            alt={alt}
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>

                {/* Navigation Arrows */}
                {onPrev && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onPrev(); }}
                        className="absolute left-6 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-background/50 text-foreground backdrop-blur-xl transition-all hover:bg-background/80 hover:scale-110 active:scale-95 border border-border/50 shadow-2xl"
                    >
                        <ChevronLeft className="h-8 w-8" />
                    </button>
                )}
                {onNext && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onNext(); }}
                        className="absolute right-6 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-background/50 text-foreground backdrop-blur-xl transition-all hover:bg-background/80 hover:scale-110 active:scale-95 border border-border/50 shadow-2xl"
                    >
                        <ChevronRight className="h-8 w-8" />
                    </button>
                )}
            </div>

            {/* Footer Info */}
            <div className="flex h-12 items-center justify-center border-t border-border/50 bg-background/50 px-6 backdrop-blur-xl text-[12px] text-muted-foreground">
                <p>{t("gallery.zoom_instructions")}</p>
            </div>
        </div>
    )
}
