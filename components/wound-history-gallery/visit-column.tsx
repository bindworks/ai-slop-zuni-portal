import { useRef, useCallback } from "react"
import { Clock, Camera, Building2, MapPin, Activity, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Visit } from "../common/types"
import { MiniStat } from "../common/mini-stat"
import { DetailSection } from "./detail-section"
import { DetailRow } from "./detail-row"
import { ImageThumb } from "./image-thumb"
import { MeasurementGraphic } from "./measurement-graphic"

const WOUND_STATE_KEYS = [
    "Wound Bed",
    "Exudate",
    "Exudate Amount",
    "Odor",
    "Color",
    "Edges",
    "Periwound Skin",
    "Pain Level",
    "Signs of Infection",
    "Tunneling",
]

const DIAGNOSIS_KEYS = ["Diagnosis", "Classification", "Etiology", "Treatment Plan", "Frequency", "Debridement"]

const MATERIAL_KEYS = ["Primary Dressing", "Secondary Dressing", "Compression", "Skin Protectant", "Cleanser"]

function getRelativeTime(dateStr: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const targetDate = new Date(dateStr);
    targetDate.setHours(0, 0, 0, 0);
    const diffTime = today.getTime() - targetDate.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    return `${diffDays} days ago`;
}

export function VisitColumn({
    visit,
    previousVisit,
    selectedImage,
    onSelectImage,
    idx,
    headerLabel,
    isCurrent = false,
    notesExpanded,
    onToggleNotes,
    onPreviewImage,
    valueAlign = 'right',
    showBodyIndicator = false,
}: {
    visit: Visit
    previousVisit?: Visit
    selectedImage: number | string | null
    onSelectImage: (id: number | string) => void
    idx: number
    headerLabel?: string
    isCurrent?: boolean
    notesExpanded?: boolean
    onToggleNotes?: () => void
    onPreviewImage?: (id: number | string) => void
    valueAlign?: 'left' | 'right'
    showBodyIndicator?: boolean
}) {
    return (
        <div className={cn(
            "flex h-fit min-h-full flex-col border-r border-border transition-colors",
            isCurrent ? "sticky left-0 z-20 w-[23rem] bg-card shadow-[4px_0_24px_-12px_rgba(0,0,0,0.8)]" : "w-[16rem] bg-card/60"
        )}>
            {/* Sticky Top Headers Wrapper */}
            <div className={cn(
                "sticky top-0 flex flex-col shrink-0 shadow-sm transition-colors bg-card",
                isCurrent ? "z-30" : "z-10"
            )}>
                {/* Header */}
                <div className="flex shrink-0 items-center justify-between border-b border-border bg-[#18212f] px-4 py-3">
                    <div className="flex items-baseline gap-2.5">
                        <span className="text-[14px] font-medium text-slate-300">
                            {headerLabel || visit.date}
                        </span>
                        <span className="text-[12px] font-medium text-slate-500">
                            {getRelativeTime(visit.date)}
                        </span>
                    </div>
                </div>

                {/* Identity section — visit metadata */}
                <div className="shrink-0 space-y-0.5 border-b border-border px-4 py-1.5">
                    <div className="flex items-center gap-1.5 text-[10px]">
                        <span className="font-semibold text-foreground text-[11px]">
                            {visit.details.woundLabel || "Wound"}
                        </span>
                        <span className="text-border">·</span>
                        <div className="flex items-center gap-1 text-muted-foreground">
                            <MapPin className="h-2.5 w-2.5 shrink-0" />
                            <span>{visit.details.woundLocation || "Location"}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Clock className="h-2.5 w-2.5 shrink-0" />
                            <span>{visit.details.time}</span>
                        </div>
                        <span className="text-border">·</span>
                        <div className="flex items-center gap-1 truncate">
                            <Building2 className="h-2.5 w-2.5 shrink-0" />
                            <span className="truncate max-w-[10rem]">{visit.details.issuingInstitution || "Medical Center"}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <User className="h-2.5 w-2.5 shrink-0" />
                            <span>{visit.details.doctor}</span>
                        </div>
                        <span className="text-border">·</span>
                        <div className="flex items-center gap-1">
                            <Camera className="h-2.5 w-2.5 shrink-0" />
                            <span>{visit.details.camera}</span>
                        </div>
                    </div>
                </div>

                {/* Images section — fixed (non-scrolling) */}
                <div className="shrink-0 border-b border-border px-4 pt-4 pb-6 h-[8rem]">
                    <div className="flex gap-2 overflow-x-auto">
                        {visit.images.map((img, iIdx) => (
                            <ImageThumb
                                key={img.id}
                                img={img}
                                idx={idx * 3 + iIdx + 10}
                                selectedImage={selectedImage}
                                onSelectImage={onSelectImage}
                                onPreviewImage={onPreviewImage}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Scrollable content area */}
            <div className="flex-1 pb-6">

                {/* Measurements section */}
                <DetailSection label="Measurements">
                    <div className={cn(showBodyIndicator && visit.details.bodyIndicator ? "pr-28" : "")}>
                        <MeasurementGraphic
                            measurements={visit.details.measurements}
                            prevMeasurements={previousVisit?.details.measurements}
                            compact={!isCurrent}
                        />
                    </div>
                    {showBodyIndicator && visit.details.bodyIndicator && (
                        <div className="absolute bottom-6 right-4 top-10 w-24 shrink-0 flex items-center justify-center bg-white rounded-lg shadow-[0_0_12px_rgba(255,255,255,0.25),0_15px_50px_rgba(30,58,138,0.35)] border border-black/10 p-1.5 overflow-hidden">
                            <img
                                src={visit.details.bodyIndicator.view === 'front' ? '/panatchek_zepredu.png' :
                                    visit.details.bodyIndicator.view === 'back' ? '/panatchek_zezadu.png' :
                                        '/panatchek_bok.png'}
                                alt="Body location"
                                className="h-full w-auto object-contain brightness-110"
                            />
                            <div
                                className="absolute w-4 h-4 bg-red-500 rounded-full shadow-[0_0_12px_rgba(239,68,68,1)] border-2 border-white animate-pulse"
                                style={{
                                    left: `${visit.details.bodyIndicator.marker.x}%`,
                                    top: `${visit.details.bodyIndicator.marker.y}%`,
                                    transform: 'translate(-50%, -50%)'
                                }}
                            />
                        </div>
                    )}
                </DetailSection>

                {/* Clinical Notes */}
                <DetailSection label="Clinical Notes">
                    <div
                        className="cursor-pointer rounded-lg bg-muted p-3 transition-colors hover:bg-muted/80"
                        onClick={onToggleNotes}
                    >
                        <p className={cn(
                            "text-xs leading-relaxed text-foreground",
                            !notesExpanded && "line-clamp-5 h-[6.5rem]"
                        )}>
                            {visit.details.clinicalNotes}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>{visit.details.doctor} &middot; {visit.date}</span>
                            </div>
                            <span className="text-[11px] text-primary/60">
                                {notesExpanded ? "collapse" : "expand"}
                            </span>
                        </div>
                    </div>
                </DetailSection>

                {/* Wound State Assessment */}
                <DetailSection label="Wound State">
                    <div className="flex flex-col gap-1">
                        {WOUND_STATE_KEYS.map((k, index) => {
                            const v = visit.details.woundState[k] || "—"
                            return <DetailRow key={k} label={k} value={v} prevValue={previousVisit?.details.woundState[k]} showLabel={isCurrent} even={index % 2 === 0} valueAlign={valueAlign} />
                        })}
                    </div>
                </DetailSection>

                {/* Diagnosis & Treatment */}
                <DetailSection label="Diagnosis & Treatment">
                    <div className="flex flex-col gap-1">
                        {DIAGNOSIS_KEYS.map((k, index) => {
                            const v = visit.details.diagnosis[k] || "—"
                            return <DetailRow key={k} label={k} value={v} prevValue={previousVisit?.details.diagnosis[k]} showLabel={isCurrent} even={index % 2 === 0} valueAlign={valueAlign} />
                        })}
                    </div>
                </DetailSection>

                {/* Materials Used */}
                <DetailSection label="Materials Used" last>
                    <div className="flex flex-col gap-1">
                        {MATERIAL_KEYS.map((k, index) => {
                            const v = visit.details.materials[k] || "—"
                            return <DetailRow key={k} label={k} value={v} prevValue={previousVisit?.details.materials[k]} showLabel={isCurrent} even={index % 2 === 0} valueAlign={valueAlign} />
                        })}
                    </div>
                </DetailSection>
            </div>
        </div>
    )
}
