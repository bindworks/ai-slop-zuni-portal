import React from "react"
import { cn } from "@/lib/utils"
import { TissueSegment, TissueColor } from "../common/types"

interface MeasurementGraphicProps {
    measurements: {
        length: string
        width: string
        depth: string
        area: string
        tissues?: TissueSegment[]
    }
    prevMeasurements?: {
        length: string
        width: string
        depth: string
        area: string
        tissues?: TissueSegment[]
    }
    compact?: boolean
}

export function MeasurementGraphic({
    measurements,
    prevMeasurements,
    compact = false,
}: MeasurementGraphicProps) {
    const currentArea = parseFloat(measurements.area)
    const prevArea = prevMeasurements ? parseFloat(prevMeasurements.area) : null

    let pctChange: number | null = null
    if (prevArea !== null && prevArea > 0) {
        pctChange = ((currentArea - prevArea) / prevArea) * 100
    }

    const isReduction = pctChange !== null && pctChange < 0
    const colorClass = isReduction
        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
        : "bg-amber-500/10 text-amber-400 border-amber-500/30"

    const isChanged = (key: keyof Omit<typeof measurements, 'tissues'>) => {
        return prevMeasurements && prevMeasurements[key] !== measurements[key]
    }

    // Pie chart calculation
    const tissues = measurements.tissues || []
    let cumulativePercent = 0

    // Map color keys to CSS classes
    const colorMap: Record<TissueColor, string> = {
        red: "fill-rose-500",
        yellow: "fill-yellow-400",
        black: "fill-slate-900",
        pink: "fill-pink-400",
    }

    const legendColorMap: Record<TissueColor, string> = {
        red: "bg-rose-500",
        yellow: "bg-yellow-400",
        black: "bg-slate-900",
        pink: "bg-pink-400",
    }

    return (
        <div className="flex flex-col gap-1.5 py-1">
            <div className="flex items-center justify-between h-[110px] relative">
                {/* SVG Axis Visualization */}
                <div className="relative flex-1 h-full min-w-0 pr-4">
                    <div className="relative w-[160px] h-full mx-auto">
                        <svg
                            viewBox="0 0 160 110"
                            className="w-full h-full text-muted-foreground/40"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            preserveAspectRatio="xMidYMid meet"
                        >
                            {/* Axis Origin at (45, 80) */}
                            <g transform="translate(45, 80)">
                                {/* Length (Y-axis - Up) */}
                                <path d="M 0 0 L 0 -55" />
                                <path d="M -3 -52 L 0 -55 L 3 -52" />

                                {/* Width (X-axis - Right) */}
                                <path d="M 0 0 L 70 0" />
                                <path d="M 67 -3 L 70 0 L 67 3" />

                                {/* Depth (Z-axis - Diagonal 45deg) */}
                                <path d="M 0 0 L 45 -45" />
                                <path d="M 40 -43 L 45 -45 L 43 -40" />
                            </g>
                        </svg>

                        {/* HTML Labels for crispness */}
                        <div className="absolute inset-0 pointer-events-none select-none text-[12px] font-medium leading-none">
                            {/* Length Label */}
                            <div className="absolute left-[5px] top-[30%] flex flex-col items-end">
                                <span className={cn(
                                    "font-bold transition-colors",
                                    isChanged('length') ? "text-amber-400" : "text-foreground/90"
                                )}>L {measurements.length}</span>
                                <span className="text-[10px] text-muted-foreground/60 mt-0.5">cm</span>
                            </div>

                            {/* Width Label */}
                            <div className="absolute left-[65px] bottom-[0px]">
                                <span className={cn(
                                    "font-bold transition-colors",
                                    isChanged('width') ? "text-amber-400" : "text-foreground/90"
                                )}>W {measurements.width}</span>
                                <span className="text-[10px] text-muted-foreground/60 ml-1">cm</span>
                            </div>

                            {/* Depth Label */}
                            <div className="absolute right-[15px] top-[10px]">
                                <span className={cn(
                                    "font-bold transition-colors",
                                    isChanged('depth') ? "text-amber-400" : "text-foreground/90"
                                )}>D {measurements.depth}</span>
                                <span className="text-[10px] text-muted-foreground/60 ml-1">cm</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Area and Percentage Change */}
                <div className="flex flex-col items-center justify-center gap-2 pl-4 border-l border-border/40 h-[80px] w-[85px] shrink-0">
                    <div className="text-center space-y-0.5">
                        <p className="text-[10px] text-muted-foreground/70 font-semibold uppercase tracking-wider">Area</p>
                        <div className="flex items-baseline justify-center gap-0.5">
                            <span className={cn(
                                "text-[15px] font-bold tabular-nums transition-colors",
                                isChanged('area') ? "text-amber-400" : "text-foreground"
                            )}>{measurements.area}</span>
                            <span className="text-[10px] text-muted-foreground/60 font-medium">cm²</span>
                        </div>
                    </div>

                    {pctChange !== null && (
                        <div className={cn(
                            "flex items-center justify-center rounded-full border shadow-sm transition-colors",
                            "h-14 w-14",
                            colorClass
                        )}>
                            <span className="font-bold tracking-tight text-[13px]">
                                {pctChange > 0 ? "+" : ""}{pctChange.toFixed(1)}%
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Tissue Pie Chart and Legend */}
            {tissues.length > 0 && (
                <div className="flex items-center gap-4 px-2 pt-2 border-t border-border/40">
                    <div className="relative w-20 h-20 shrink-0">
                        <svg viewBox="-1 -1 2 2" className="w-full h-full -rotate-90">
                            {tissues.map((tissue: TissueSegment, i: number) => {
                                const startPercent = cumulativePercent
                                const endPercent = startPercent + (tissue.value / 100)
                                cumulativePercent = endPercent

                                const [startX, startY] = [Math.cos(2 * Math.PI * startPercent), Math.sin(2 * Math.PI * startPercent)]
                                const [endX, endY] = [Math.cos(2 * Math.PI * endPercent), Math.sin(2 * Math.PI * endPercent)]
                                const largeArcFlag = tissue.value / 100 > 0.5 ? 1 : 0
                                const pathData = [
                                    `M ${startX} ${startY}`,
                                    `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                                    `L 0 0`,
                                ].join(' ')

                                return (
                                    <path
                                        key={i}
                                        d={pathData}
                                        className={cn("transition-all duration-300", colorMap[tissue.color as TissueColor])}
                                        strokeWidth="0.04"
                                    />
                                )
                            })}
                            <circle cx="0" cy="0" r="0.6" className="fill-background" />
                        </svg>
                    </div>

                    <div className="flex flex-col gap-1 flex-1 py-0.5">
                        {tissues.map((tissue: TissueSegment, i: number) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className={cn("w-2 h-2 rounded-full shrink-0 shadow-sm", legendColorMap[tissue.color as TissueColor])} />
                                <div className="flex items-baseline gap-1.5">
                                    <span className="text-[11px] font-bold text-foreground/90 tabular-nums">
                                        {tissue.value}%
                                    </span>
                                    <span className="text-[9px] text-muted-foreground/80 uppercase font-bold tracking-wider">
                                        {tissue.label}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
