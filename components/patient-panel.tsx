"use client"

import { User, Calendar, Hash, MapPin, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

/* ── Mock: Wounds ── */

const wounds = [
  {
    id: "W-001",
    label: "Left Lower Leg",
    type: "Venous Ulcer",
    status: "Improving",
    date: "2026-01-15",
    imageCount: 8,
  },
  {
    id: "W-002",
    label: "Right Heel",
    type: "Pressure Injury",
    status: "Stable",
    date: "2025-12-03",
    imageCount: 12,
  },
  {
    id: "W-003",
    label: "Sacral Region",
    type: "Pressure Injury",
    status: "Worsening",
    date: "2026-02-01",
    imageCount: 5,
  },
  {
    id: "W-004",
    label: "Left Foot Dorsum",
    type: "Diabetic Ulcer",
    status: "Improving",
    date: "2025-11-20",
    imageCount: 15,
  },
]

const statusColor: Record<string, string> = {
  Improving: "bg-emerald-900/50 text-emerald-400",
  Stable: "bg-amber-900/50 text-amber-400",
  Worsening: "bg-red-900/50 text-red-400",
}

/* ── Shared list‑item component ── */

function PanelListItem({
  id,
  icon,
  label,
  subtitle,
  status,
  meta,
  selected,
  onSelect,
}: {
  id: string
  icon?: string
  label: string
  subtitle: string
  status?: string
  meta?: string
  selected: boolean
  onSelect: (id: string) => void
}) {
  return (
    <div className="relative">
      <button
        onClick={() => onSelect(id)}
        className={cn(
          "w-full rounded-lg px-3 py-2 text-left transition-all duration-200",
          selected
            ? "bg-accent ring-1 ring-primary/30 rounded-r-none border-r-2 border-r-primary"
            : "hover:bg-secondary"
        )}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-2">
            {icon && <span className="text-lg leading-tight mt-0.5">{icon}</span>}
            <div>
              <p className={cn(
                "text-sm font-medium",
                selected ? "text-primary" : "text-foreground"
              )}>
                {label}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {subtitle}
              </p>
            </div>
          </div>
          {status && (
            <span
              className={cn(
                "shrink-0 rounded-md px-2 py-0.5 text-[12px] font-semibold",
                statusColor[status] ?? "bg-muted text-muted-foreground"
              )}
            >
              {status}
            </span>
          )}
        </div>
        {meta && (
          <div className="mt-2 flex items-center gap-3 text-[13px] text-muted-foreground">
            <span>{meta}</span>
          </div>
        )}
      </button>

      {/* Connector arrow */}
      {selected && (
        <div className="absolute -right-[11px] top-1/2 z-10 -translate-y-1/2">
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
            <path d="M0 0L12 10L0 20V0Z" className="fill-accent" />
          </svg>
        </div>
      )}
    </div>
  )
}

/* ── Main component ── */

export function PatientPanel({
  selectedItem,
  onSelectItem,
}: {
  selectedItem: string | null
  onSelectItem: (id: string) => void
}) {
  return (
    <aside className="relative flex h-full flex-col border-r border-border bg-card">
      {/* Patient Header */}
      <div className="border-b border-border p-5">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <User className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Margaret Thompson
            </h2>
            <p className="text-xs text-muted-foreground">MRN: 4829-1057</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>DOB: 03/14/1948</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Hash className="h-3.5 w-3.5" />
            <span>Age: 77</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span>Room 412-B</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>Diabetic</span>
          </div>
        </div>
      </div>

      {/* Allergies / Alerts */}
      <div className="border-b border-border px-5 py-3">
        <p className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
          Alerts
        </p>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          <span className="rounded-md bg-red-900/40 px-2 py-0.5 text-[13px] font-medium text-red-400">
            Penicillin Allergy
          </span>
          <span className="rounded-md bg-amber-900/40 px-2 py-0.5 text-[13px] font-medium text-amber-400">
            Fall Risk
          </span>
        </div>
      </div>

      {/* Scrollable list area */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">

        <PanelListItem
          id="DOCUMENTS"
          icon="📋"
          label="Documents"
          subtitle="Medical records &amp; reports"
          meta="12 files"
          selected={selectedItem === "DOCUMENTS"}
          onSelect={onSelectItem}
        />
        <PanelListItem
          id="OTHER"
          icon="🖼️"
          label="Photo Album"
          subtitle="General photos &amp; media"
          meta="20 photos"
          selected={selectedItem === "OTHER"}
          onSelect={onSelectItem}
        />

        {/* Wounds */}
        <div>
          <p className="mb-1 px-2 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
            Wounds ({wounds.length})
          </p>
          <div className="flex flex-col">
            {wounds.map((wound) => (
              <PanelListItem
                key={wound.id}
                id={wound.id}
                label={wound.label}
                subtitle={wound.type}
                status={wound.status}
                meta={`${wound.imageCount} images | Since ${wound.date}`}
                selected={selectedItem === wound.id}
                onSelect={onSelectItem}
              />
            ))}
          </div>
        </div>

      </div>
    </aside>
  )
}
