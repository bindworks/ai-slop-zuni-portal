"use client"

import { User, Calendar, Hash, MapPin, AlertCircle } from "lucide-react"
import { PanelListItem } from "../common/panel-list-item"
import { Patient } from "@/components/common/types"

/* ── Main component ── */

export function PatientPanel({
  patient,
  selectedItem,
  onSelectItem,
}: {
  patient?: Patient
  selectedItem: string | null
  onSelectItem: (id: string) => void
}) {
  if (!patient) {
    return (
      <aside className="relative flex h-full flex-col border-r border-border bg-card p-5">
        <p className="text-sm text-muted-foreground">Patient data not available</p>
      </aside>
    )
  }

  return (
    <aside className="relative flex h-full flex-col border-r border-border bg-card">
      {/* Patient Header */}
      <div className="border-b border-border p-5">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm shadow-primary/20">
            <User className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              {patient.name}
            </h2>
            <p className="text-xs text-muted-foreground">MRN: {patient.mrn}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>DOB: {patient.dob}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Hash className="h-3.5 w-3.5" />
            <span>Age: {patient.age}</span>
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
          subtitle="Medical records & reports"
          meta="12 files"
          selected={selectedItem === "DOCUMENTS"}
          onSelect={onSelectItem}
        />
        <PanelListItem
          id="OTHER"
          icon="🖼️"
          label="Photo Album"
          subtitle="General photos & media"
          meta="20 photos"
          selected={selectedItem === "OTHER"}
          onSelect={onSelectItem}
        />

        {/* Wounds */}
        <div className="pt-2">
          <p className="mb-1 px-2 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
            Wounds ({patient.wounds?.length || 0})
          </p>
          <div className="flex flex-col">
            {patient.wounds?.map((wound) => (
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
