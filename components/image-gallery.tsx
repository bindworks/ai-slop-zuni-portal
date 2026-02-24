"use client"

import { useState, useRef, useCallback } from "react"
import {
  Camera,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Search,
  SlidersHorizontal,
} from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ImagePreview } from "./image-preview"

/* ── Types ── */

export interface VisitImage {
  id: number
  tag: string
  src: string
}

interface WoundDetails {
  measurements: { length: string; width: string; depth: string; area: string }
  woundState: Record<string, string>
  diagnosis: Record<string, string>
  materials: Record<string, string>
  clinicalNotes: string
  doctor: string
  time: string
  camera: string
}

interface Visit {
  date: string
  label: string
  summary: string
  images: VisitImage[]
  details: WoundDetails
}

/* ── Mock data ── */

export const currentVisit: Visit = {
  date: "2026-02-18",
  label: "Left Lower Leg",
  summary: "80% granulation, mild serous exudate. Periwound skin intact.",
  images: [
    { id: 1, tag: "Pre-debridement", src: "/wound-photo-large.png" },
    { id: 2, tag: "Post-debridement", src: "/wound-photo-large.png" },
  ],
  details: {
    measurements: { length: "3.2", width: "2.1", depth: "0.4", area: "6.72" },
    clinicalNotes:
      "Wound bed is 80% granulation tissue with mild serous exudate. Periwound skin intact with no signs of maceration. Compression therapy ongoing. Patient tolerating well. Wound edges are well attached and showing progressive epithelialization. No tunneling or undermining detected. Recommend continuing current treatment protocol with follow-up in 3 days.",
    doctor: "Dr. Chen",
    time: "09:30",
    camera: "iPhone 15 Pro",
    woundState: {
      "Wound Bed": "80% granulation, 20% slough",
      "Exudate": "Mild serous",
      "Exudate Amount": "Low",
      "Odor": "None",
      "Color": "Pink-red",
      "Edges": "Attached, well-defined",
      "Periwound Skin": "Intact, no maceration",
      "Pain Level": "3 / 10",
      "Signs of Infection": "None",
      "Tunneling": "None",
    },
    diagnosis: {
      "Diagnosis": "Venous leg ulcer (L97.129)",
      "Classification": "Stage 2",
      "Etiology": "Chronic venous insufficiency",
      "Treatment Plan": "Compression + moist wound care",
      "Frequency": "Every 3 days",
      "Debridement": "Sharp, as needed",
    },
    materials: {
      "Primary Dressing": "Aquacel Ag+ Extra",
      "Secondary Dressing": "Mepilex Border Flex",
      "Compression": "Coban 2-Layer System",
      "Skin Protectant": "Cavilon barrier film",
      "Cleanser": "Normal saline irrigation",
    },
  },
}

const historyVisits: Visit[] = [
  {
    date: "2026-02-11",
    label: "Left Lower Leg",
    summary: "75% granulation, 25% slough. Moderate exudate. Compression ongoing.",
    images: [
      { id: 3, tag: "Follow-up", src: "/wound-photo-large.png" },
      { id: 9, tag: "Close-up", src: "/wound-photo-large.png" },
      { id: 10, tag: "Periwound", src: "/wound-photo-large.png" },
      { id: 11, tag: "Under UV", src: "/wound-photo-large.png" },
      { id: 12, tag: "Measurement", src: "/wound-photo-large.png" },
    ],
    details: {
      measurements: { length: "3.4", width: "2.2", depth: "0.5", area: "7.48" },
      clinicalNotes:
        "Wound showing improvement. Granulation tissue increasing. Moderate serous exudate noted. Compression therapy continuing with good compliance.",
      doctor: "Dr. Chen",
      time: "10:15",
      camera: "iPhone 15 Pro",
      woundState: {
        "Wound Bed": "75% granulation, 25% slough",
        "Exudate": "Moderate serous",
        "Exudate Amount": "Moderate",
        "Odor": "None",
        "Color": "Pink-red",
        "Edges": "Attached, defined",
        "Periwound Skin": "Intact",
        "Pain Level": "4 / 10",
        "Signs of Infection": "None",
        "Tunneling": "None",
      },
      diagnosis: {
        "Diagnosis": "Venous leg ulcer (L97.129)",
        "Classification": "Stage 2",
        "Etiology": "Chronic venous insufficiency",
        "Treatment Plan": "Compression + moist wound care",
        "Frequency": "Every 3 days",
        "Debridement": "Sharp, as needed",
      },
      materials: {
        "Primary Dressing": "Aquacel Ag+ Extra",
        "Secondary Dressing": "Mepilex Border Flex",
        "Compression": "Coban 2-Layer System",
        "Skin Protectant": "Cavilon barrier film",
        "Cleanser": "Normal saline irrigation",
      },
    },
  },
  {
    date: "2026-02-04",
    label: "Left Lower Leg",
    summary: "70% granulation. Wound edges well-defined. Pain level 4/10.",
    images: [{ id: 4, tag: "Measurement", src: "/wound-photo-large.png" }],
    details: {
      measurements: { length: "3.6", width: "2.4", depth: "0.5", area: "8.64" },
      clinicalNotes:
        "Slow but steady improvement. Slough reducing. Wound edges becoming more defined. Patient reports pain decrease. Continue current treatment plan. Compression therapy well tolerated. Periwound area remains dry with no signs of maceration. Mild erythema at 3 o'clock position being monitored — likely pressure-related from bandaging. Adjusted compression wrapping technique to redistribute pressure more evenly.",
      doctor: "Dr. Martinez",
      time: "14:45",
      camera: "Canon EOS R5",
      woundState: {
        "Wound Bed": "70% granulation, 30% slough",
        "Exudate": "Moderate serous",
        "Exudate Amount": "Moderate",
        "Odor": "None",
        "Color": "Red-pink",
        "Edges": "Well-defined",
        "Periwound Skin": "Slight erythema",
        "Pain Level": "4 / 10",
        "Signs of Infection": "None",
        "Tunneling": "None",
      },
      diagnosis: {
        "Diagnosis": "Venous leg ulcer (L97.129)",
        "Classification": "Stage 2",
        "Etiology": "Chronic venous insufficiency",
        "Treatment Plan": "Compression + moist wound care",
        "Frequency": "Every 3 days",
        "Debridement": "Conservative",
      },
      materials: {
        "Primary Dressing": "Aquacel Ag+ Extra",
        "Secondary Dressing": "Mepilex Border Flex",
        "Compression": "Coban 2-Layer System",
        "Skin Protectant": "Cavilon barrier film",
        "Cleanser": "Normal saline irrigation",
      },
    },
  },
  {
    date: "2026-01-28",
    label: "Left Lower Leg",
    summary: "65% granulation. Initial improvement with compression therapy.",
    images: [
      { id: 5, tag: "Follow-up", src: "/wound-photo-large.png" },
      { id: 15, tag: "Wide angle", src: "/wound-photo-large.png" },
      { id: 16, tag: "Close-up", src: "/wound-photo-large.png" },
    ],
    details: {
      measurements: { length: "3.8", width: "2.5", depth: "0.6", area: "9.50" },
      clinicalNotes:
        "First signs of improvement noted. Compression therapy appears effective. Mild erythema around wound edges — monitoring. Patient tolerating compression well. Granulation tissue beginning to form at wound margins. Exudate levels remain moderate but character has shifted from serosanguineous to serous, indicating reduced inflammation. Wound cultures from previous visit returned negative. Patient education on leg elevation and activity modification reinforced. Consider stepping up to multi-layer compression if tolerance continues.",
      doctor: "Dr. Chen",
      time: "11:00",
      camera: "iPhone 15 Pro",
      woundState: {
        "Wound Bed": "65% granulation, 35% slough",
        "Exudate": "Moderate serous",
        "Exudate Amount": "Moderate",
        "Odor": "None",
        "Color": "Red",
        "Edges": "Defined",
        "Periwound Skin": "Mild erythema",
        "Pain Level": "5 / 10",
        "Signs of Infection": "None",
        "Tunneling": "None",
      },
      diagnosis: {
        "Diagnosis": "Venous leg ulcer (L97.129)",
        "Classification": "Stage 2",
        "Etiology": "Chronic venous insufficiency",
        "Treatment Plan": "Compression + moist wound care",
        "Frequency": "Every 3 days",
        "Debridement": "Conservative",
      },
      materials: {
        "Primary Dressing": "Aquacel Ag+",
        "Secondary Dressing": "Mepilex Border",
        "Compression": "Coban 2-Layer System",
        "Skin Protectant": "Cavilon barrier film",
        "Cleanser": "Normal saline irrigation",
      },
    },
  },
  {
    date: "2026-01-21",
    label: "Left Lower Leg",
    summary: "60% granulation, 40% slough. Periwound erythema. Started compression.",
    images: [
      { id: 6, tag: "Initial Assessment", src: "/wound-photo-large.png" },
      { id: 17, tag: "Pre-debridement", src: "/wound-photo-large.png" },
      { id: 18, tag: "Post-debridement", src: "/wound-photo-large.png" },
      { id: 19, tag: "Periwound", src: "/wound-photo-large.png" },
      { id: 20, tag: "Doppler", src: "/wound-photo-large.png" },
      { id: 21, tag: "Measurement", src: "/wound-photo-large.png" },
    ],
    details: {
      measurements: { length: "4.0", width: "2.8", depth: "0.7", area: "11.20" },
      clinicalNotes:
        "Significant slough present. Periwound erythema and early maceration noted. Initiated compression therapy today. Sharp debridement performed to remove necrotic tissue at wound center and 6 o'clock margin. Wound cultures obtained and sent to lab — pending results. Patient experienced moderate discomfort during debridement (pain 7/10) but tolerated procedure. Applied topical lidocaine pre-procedure. Zinc oxide barrier cream applied to periwound skin to address maceration. Short-stretch bandage applied as initial compression — will reassess tolerance at next visit. Referred to vascular lab for venous duplex scan to confirm etiology.",
      doctor: "Dr. Chen",
      time: "08:15",
      camera: "Canon EOS R5",
      woundState: {
        "Wound Bed": "60% granulation, 40% slough",
        "Exudate": "Heavy serous",
        "Exudate Amount": "Heavy",
        "Odor": "Mild",
        "Color": "Red-yellow",
        "Edges": "Irregular",
        "Periwound Skin": "Erythema, maceration",
        "Pain Level": "6 / 10",
        "Signs of Infection": "None",
        "Tunneling": "None",
      },
      diagnosis: {
        "Diagnosis": "Venous leg ulcer (L97.129)",
        "Classification": "Stage 2",
        "Etiology": "Chronic venous insufficiency",
        "Treatment Plan": "Compression therapy initiated",
        "Frequency": "Every 3 days",
        "Debridement": "Sharp debridement performed",
      },
      materials: {
        "Primary Dressing": "Aquacel Ag+",
        "Secondary Dressing": "Mepilex Border",
        "Compression": "Short-stretch bandage",
        "Skin Protectant": "Zinc oxide cream",
        "Cleanser": "Normal saline irrigation",
      },
    },
  },
  {
    date: "2026-01-15",
    label: "Left Lower Leg",
    summary: "Initial presentation. Suspected venous etiology. Referred for vascular assessment.",
    images: [
      { id: 7, tag: "Pre-debridement", src: "/wound-photo-large.png" },
      { id: 8, tag: "Post-debridement", src: "/wound-photo-large.png" },
    ],
    details: {
      measurements: { length: "4.2", width: "3.0", depth: "0.8", area: "12.60" },
      clinicalNotes:
        "Initial presentation of chronic wound on left lower leg. Patient reports wound has been present for approximately 6 weeks with gradual enlargement. Suspected venous etiology based on medial malleolar location, irregular borders, and shallow depth. Hemosiderin staining noted in surrounding tissue. Sharp debridement performed. Wound cultures sent to lab.",
      doctor: "Dr. Martinez",
      time: "16:30",
      camera: "iPhone 14 Pro",
      woundState: {
        "Wound Bed": "50% slough, 50% necrotic",
        "Exudate": "Heavy purulent",
        "Exudate Amount": "Heavy",
        "Odor": "Moderate",
        "Color": "Yellow-black",
        "Edges": "Irregular, undermined",
        "Periwound Skin": "Erythema, induration",
        "Pain Level": "7 / 10",
        "Signs of Infection": "Suspected — cultures ordered",
        "Tunneling": "2cm at 3 o'clock",
      },
      diagnosis: {
        "Diagnosis": "Venous leg ulcer (L97.129)",
        "Classification": "Stage 3",
        "Etiology": "Suspected chronic venous insufficiency",
        "Treatment Plan": "Debridement + assess for compression",
        "Frequency": "Every 2 days",
        "Debridement": "Sharp debridement performed",
      },
      materials: {
        "Primary Dressing": "Iodosorb gel",
        "Secondary Dressing": "ABD pad",
        "Compression": "None (pending vascular assessment)",
        "Skin Protectant": "Zinc oxide cream",
        "Cleanser": "Normal saline irrigation",
      },
    },
  },
]

const tagColors: Record<string, string> = {
  "Pre-debridement": "bg-primary/20 text-primary",
  "Post-debridement": "bg-blue-900/60 text-blue-400",
  "Follow-up": "bg-secondary text-secondary-foreground",
  "Measurement": "bg-amber-900/60 text-amber-400",
  "Initial Assessment": "bg-accent text-accent-foreground",
}

const placeholderColors = [
  "from-primary/15 to-primary/5",
  "from-primary/10 to-accent/20",
  "from-muted to-secondary",
  "from-accent/30 to-muted",
  "from-primary/8 to-primary/18",
  "from-secondary to-accent/15",
]

/* ── Component ── */

export function ImageGallery({
  selectedImage,
  onSelectImage,
  multiSelectedImages = [],
  onToggleMultiSelect,
}: {
  selectedImage: number | null
  onSelectImage: (id: number) => void
  multiSelectedImages?: (number | string)[]
  onToggleMultiSelect?: (id: number | string) => void
}) {
  const [previewImageId, setPreviewImageId] = useState<number | null>(null)

  // Flatten all images for navigation
  const allVisits = [currentVisit, ...historyVisits]
  const allImages = allVisits.flatMap(v => v.images)

  const currentPreviewIndex = allImages.findIndex(img => img.id === previewImageId)
  const previewImage = allImages[currentPreviewIndex]

  const handleNext = useCallback(() => {
    if (currentPreviewIndex < allImages.length - 1) {
      setPreviewImageId(allImages[currentPreviewIndex + 1].id)
    }
  }, [currentPreviewIndex, allImages])

  const handlePrev = useCallback(() => {
    if (currentPreviewIndex > 0) {
      setPreviewImageId(allImages[currentPreviewIndex - 1].id)
    }
  }, [currentPreviewIndex, allImages])

  const scrollRefs = useRef<(HTMLDivElement | null)[]>([])
  const activeScroller = useRef<HTMLDivElement | null>(null)

  const registerScrollRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    scrollRefs.current[index] = el
  }, [])

  const handlePointerEnter = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    activeScroller.current = e.currentTarget
  }, [])

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    if (el !== activeScroller.current) return
    const maxScroll = el.scrollHeight - el.clientHeight
    const pct = maxScroll > 0 ? el.scrollTop / maxScroll : 0
    scrollRefs.current.forEach((ref) => {
      if (ref && ref !== el) {
        const refMax = ref.scrollHeight - ref.clientHeight
        ref.scrollTop = pct * refMax
      }
    })
  }, [])

  const [notesExpanded, setNotesExpanded] = useState(false)
  const toggleNotes = useCallback(() => setNotesExpanded((v) => !v), [])

  return (
    <div className="flex h-full w-full bg-background/50">
      {/* Fixed current-state column */}
      <div className="shrink-0">
        <VisitColumn
          key={currentVisit.date}
          visit={currentVisit}
          olderVisit={historyVisits[0]}
          selectedImage={selectedImage}
          onSelectImage={onSelectImage}
          idx={-1}
          scrollRef={registerScrollRef(0)}
          onSyncScroll={handleScroll}
          onPointerEnterScroll={handlePointerEnter}
          notesExpanded={notesExpanded}
          onToggleNotes={toggleNotes}
          onPreviewImage={setPreviewImageId}
          multiSelectedImages={multiSelectedImages}
          onToggleMultiSelect={onToggleMultiSelect}
        />
      </div>
      {/* Scrollable history columns */}
      <div className="flex h-full flex-1 overflow-x-auto">
        <div className="flex h-full flex-row">
          {historyVisits.map((visit, vIdx) => {
            const olderVisit = historyVisits[vIdx + 1]
            return (
              <VisitColumn
                key={visit.date}
                visit={visit}
                olderVisit={olderVisit}
                selectedImage={selectedImage}
                onSelectImage={onSelectImage}
                idx={vIdx}
                scrollRef={registerScrollRef(vIdx + 1)}
                onSyncScroll={handleScroll}
                onPointerEnterScroll={handlePointerEnter}
                notesExpanded={notesExpanded}
                onToggleNotes={toggleNotes}
                onPreviewImage={setPreviewImageId}
                multiSelectedImages={multiSelectedImages}
                onToggleMultiSelect={onToggleMultiSelect}
              />
            )
          })}
        </div>
      </div>

      {/* Fullscreen Preview */}
      {previewImage && (
        <ImagePreview
          src={previewImage.src}
          alt={`${previewImage.tag} - ${previewImage.id}`}
          onClose={() => setPreviewImageId(null)}
          onNext={currentPreviewIndex < allImages.length - 1 ? handleNext : undefined}
          onPrev={currentPreviewIndex > 0 ? handlePrev : undefined}
        />
      )}
    </div>
  )
}

export function VisitColumn({
  visit,
  olderVisit,
  selectedImage,
  onSelectImage,
  idx,
  headerLabel,
  isCurrent = false,
  scrollRef,
  onSyncScroll,
  onPointerEnterScroll,
  notesExpanded = false,
  onToggleNotes,
  onPreviewImage,
  multiSelectedImages = [],
  onToggleMultiSelect,
}: {
  visit: Visit
  olderVisit?: Visit
  selectedImage: number | null
  onSelectImage: (id: number) => void
  idx: number
  headerLabel?: string
  isCurrent?: boolean
  scrollRef?: (el: HTMLDivElement | null) => void
  onSyncScroll?: (e: React.UIEvent<HTMLDivElement>) => void
  onPointerEnterScroll?: (e: React.PointerEvent<HTMLDivElement>) => void
  notesExpanded?: boolean
  onToggleNotes?: () => void
  onPreviewImage?: (id: number) => void
  multiSelectedImages?: (number | string)[]
  onToggleMultiSelect?: (id: number | string) => void
}) {
  return (
    <div className="flex h-full w-[350px] shrink-0 flex-col border-r border-border bg-card">
      {/* Header */}
      <div className="relative flex h-10 shrink-0 items-center gap-2 border-b border-border bg-accent/50 px-4">
        <div className={cn("absolute inset-y-0 left-0 w-0.5", isCurrent ? "bg-primary" : "bg-primary/40")} />
        {isCurrent && <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />}
        <span className="text-[12px] font-semibold uppercase tracking-wider text-accent-foreground">
          {headerLabel || visit.date}
        </span>
        <div className={cn("ml-auto h-px flex-1 bg-gradient-to-r to-transparent", isCurrent ? "from-primary/40" : "from-primary/20")} />
      </div>

      {/* Identity section — visit metadata */}
      <div className="shrink-0 border-b border-border px-4 py-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{visit.details.time}</span>
          <span className="text-border">·</span>
          <span>{visit.details.doctor}</span>
        </div>
        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <Camera className="h-3 w-3" />
          <span>{visit.details.camera}</span>
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
              multiSelectedImages={multiSelectedImages}
              onToggleMultiSelect={onToggleMultiSelect}
            />
          ))}
        </div>
      </div>

      {/* Scrollable area */}
      <div className="flex-1 overflow-y-auto" ref={scrollRef} onScroll={onSyncScroll} onPointerEnter={onPointerEnterScroll}>

        {/* Measurements section */}
        <DetailSection label="Measurements">
          <div className="grid grid-cols-3 gap-2">
            <MiniStat label="L" value={visit.details.measurements.length} unit="cm" prevValue={olderVisit?.details.measurements.length} />
            <MiniStat label="W" value={visit.details.measurements.width} unit="cm" prevValue={olderVisit?.details.measurements.width} />
            <MiniStat label="D" value={visit.details.measurements.depth} unit="cm" prevValue={olderVisit?.details.measurements.depth} />
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div className="w-[calc((100%-1rem)/3)] shrink-0">
              <MiniStat label="Area" value={visit.details.measurements.area} unit="cm²" prevValue={olderVisit?.details.measurements.area} />
            </div>
            {olderVisit && (() => {
              const olderArea = parseFloat(olderVisit.details.measurements.area)
              const thisArea = parseFloat(visit.details.measurements.area)
              const pctChange = olderArea > 0 ? ((olderArea - thisArea) / olderArea) * 100 : 0
              const reduced = pctChange > 0
              return (
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className={reduced ? "text-emerald-400" : "text-amber-400"}>
                      {reduced ? "↓" : "↑"} {Math.abs(pctChange).toFixed(1)}% {reduced ? "reduction" : "increase"}
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        reduced ? "bg-emerald-500" : "bg-amber-500"
                      )}
                      style={{ width: `${Math.min(Math.abs(pctChange), 100)}%` }}
                    />
                  </div>
                </div>
              )
            })()}
          </div>
        </DetailSection>

        {/* Clinical Notes */}
        <DetailSection label="Clinical Notes">
          <div
            className="cursor-pointer rounded-lg bg-muted p-3 transition-colors hover:bg-muted/80"
            onClick={onToggleNotes}
          >
            <p className={cn(
              "text-[13px] leading-relaxed text-foreground",
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
            {Object.entries(visit.details.woundState).map(([k, v]) => (
              <DetailRow key={k} label={k} value={v} prevValue={olderVisit?.details.woundState[k]} />
            ))}
          </div>
        </DetailSection>

        {/* Diagnosis & Treatment */}
        <DetailSection label="Diagnosis & Treatment">
          <div className="flex flex-col gap-1">
            {Object.entries(visit.details.diagnosis).map(([k, v]) => (
              <DetailRow key={k} label={k} value={v} prevValue={olderVisit?.details.diagnosis[k]} />
            ))}
          </div>
        </DetailSection>

        {/* Materials Used */}
        <DetailSection label="Materials Used" last>
          <div className="flex flex-col gap-1">
            {Object.entries(visit.details.materials).map(([k, v]) => (
              <DetailRow key={k} label={k} value={v} prevValue={olderVisit?.details.materials[k]} />
            ))}
          </div>
        </DetailSection>
      </div>
    </div>
  )
}


/* ── Sub-components ── */

export function ImageThumb({
  img,
  idx,
  selectedImage,
  onSelectImage,
  onPreviewImage,
  multiSelectedImages = [],
  onToggleMultiSelect,
  small = false,
}: {
  img: VisitImage
  idx: number
  selectedImage: number | null
  onSelectImage: (id: number) => void
  onPreviewImage?: (id: number) => void
  multiSelectedImages?: (number | string)[]
  onToggleMultiSelect?: (id: number | string) => void
  small?: boolean
}) {
  const isMultiSelected = multiSelectedImages.includes(img.id)

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
          <Image
            src={img.src}
            alt={img.tag}
            fill
            className="object-cover transition-transform group-hover:scale-110"
          />
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

      {/* Multi-selection checkbox */}
      <div
        className={cn(
          "absolute right-1.5 top-1.5 z-10 flex h-5 w-5 cursor-pointer items-center justify-center rounded border bg-card transition-all",
          isMultiSelected
            ? "border-primary bg-primary text-primary-foreground opacity-100"
            : "border-white/20 hover:border-white/50 opacity-0 group-hover:opacity-100"
        )}
        onClick={(e) => {
          e.stopPropagation()
          onToggleMultiSelect?.(img.id)
        }}
      >
        {isMultiSelected && <Check className="h-3 w-3" />}
      </div>
    </div>
  )
}

function MiniStat({
  label,
  value,
  unit,
  prevValue,
}: {
  label: string
  value: string
  unit: string
  prevValue?: string
}) {
  const changed = prevValue !== undefined && prevValue !== value
  return (
    <div
      className={cn(
        "rounded-md px-2 py-1 text-center",
        changed ? "bg-amber-900/20 ring-1 ring-amber-500/30" : "bg-muted"
      )}
    >
      <p className={cn("text-[12px] font-semibold", changed ? "text-amber-400" : "text-foreground")}>{value}</p>
      <p className="text-[8px] text-muted-foreground">
        {label} ({unit})
      </p>
    </div>
  )
}

function DetailSection({
  label,
  children,
  last = false,
}: {
  label: string
  children: React.ReactNode
  last?: boolean
}) {
  return (
    <div className={cn("p-4", !last && "border-b border-border")}>
      <p className="mb-3 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      {children}
    </div>
  )
}

function DetailRow({
  label,
  value,
  prevValue,
}: {
  label: string
  value: string
  prevValue?: string
}) {
  const changed = prevValue !== undefined && prevValue !== value
  return (
    <div className="flex h-[2rem] items-start justify-between gap-3 overflow-hidden">
      <span className="shrink-0 text-[13px] leading-tight text-muted-foreground">{label}</span>
      <span
        className={cn(
          "text-right text-[13px] font-medium leading-tight line-clamp-2",
          changed ? "text-amber-400" : "text-foreground"
        )}
      >
        {value}
      </span>
    </div>
  )
}
