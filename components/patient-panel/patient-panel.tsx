"use client"

import { User, Calendar, Hash, MapPin, AlertCircle, Image as ImageIcon, FileText } from "lucide-react"
import { PanelListItem } from "../common/panel-list-item"
import { Patient, Visit } from "@/components/common/types"
import { useTranslation } from "react-i18next"
import { useParams } from "next/navigation"

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
  const { t } = useTranslation()
  const params = useParams()
  const woundId = params?.woundid as string

  const getHealedDuration = (history: Visit[]) => {
    if (history.length < 2) return t("plural.week", { count: 1 });
    const first = new Date(history[0].date);
    const last = new Date(history[history.length - 1].date);
    const diffWeeks = Math.ceil(Math.abs(last.getTime() - first.getTime()) / (1000 * 60 * 60 * 24 * 7));
    return t("plural.week", { count: diffWeeks });
  };

  if (!patient) {
    return (
      <aside className="relative flex h-full flex-col border-r border-border bg-card p-5">
        <p className="text-sm text-muted-foreground">{t("patient.data_missing")}</p>
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
            <p className="text-xs text-muted-foreground">{t("patient.mrn")}: {patient.mrn}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>{t("patient.dob")}: {patient.dob}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Hash className="h-3.5 w-3.5" />
            <span>{t("patient.age")}: {patient.age}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span>{t("patient.room")} 412-B</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>{t("patient.diabetic")}</span>
          </div>
        </div>
      </div>

      {/* Allergies / Alerts */}
      <div className="border-b border-border px-5 py-3">
        <p className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
          {t("patient.alerts")}
        </p>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          <span className="rounded-md bg-red-900/40 px-2 py-0.5 text-[13px] font-medium text-red-400">
            {t("patient.penicillin_allergy")}
          </span>
          <span className="rounded-md bg-amber-900/40 px-2 py-0.5 text-[13px] font-medium text-amber-400">
            {t("patient.fall_risk")}
          </span>
        </div>
      </div>

      {/* Scrollable list area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-3 py-2 space-y-1">

        <PanelListItem
          id="TIMELINE"
          icon="🗓️"
          label={t("patient.timeline")}
          subtitle={t("patient.care_history")}
          selected={selectedItem === "TIMELINE"}
          href={`/patients/${patient.id}/timeline`}
        />
        <PanelListItem
          id="DOCUMENTS"
          icon="🗂️"
          label={`${t("patient.documents")} (12)`}
          subtitle={t("patient.med_records_reports")}
          selected={selectedItem === "DOCUMENTS"}
          href={`/patients/${patient.id}/documents`}
        />
        <PanelListItem
          id="OTHER"
          icon="📸"
          label={`${t("patient.photo_album")} (20)`}
          subtitle={t("patient.general_photos_media")}
          selected={selectedItem === "OTHER"}
          href={`/patients/${patient.id}/photos`}
        />

        {/* Wounds */}
        <div className="pt-2">
          <p className="mb-1 px-2 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
            {t("patient.wounds")} ({patient.wounds?.length || 0})
          </p>
          <div className="flex flex-col">
            {[...(patient.wounds || [])]
              .sort((a, b) => {
                if (a.status === "Healed" && b.status !== "Healed") return 1
                if (b.status === "Healed" && a.status !== "Healed") return -1
                return 0
              })
              .map((wound) => {
                const isHealed = wound.status === "Healed"
                // DO NOT TOUCH THE WOUND ICON (icon prop) BELOW - Manually fixed (UTF-32)
                return (
                  <PanelListItem
                    key={wound.id}
                    id={wound.id}
                    icon="❤️‍🩹"
                    label={wound.label}
                    subtitle={isHealed ? `${t("patient.healed")} • ${getHealedDuration(wound.history)}` : `${t("patient.duration")}: ${getHealedDuration(wound.history)}`}
                    status={t(`patient.status_${wound.status.toLowerCase()}`, { defaultValue: wound.status })}
                    meta={
                      <div className="flex items-center gap-1.5 leading-none">
                        <ImageIcon className="h-3.5 w-3.5" />
                        <span>{wound.imageCount}</span>
                      </div>
                    }
                    selected={woundId === wound.id}
                    isHealed={isHealed}
                    href={`/patients/${patient.id}/wounds/${wound.id}`}
                  />
                )
              })}
          </div>
        </div>

      </div>
    </aside>
  )
}
