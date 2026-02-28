"use client"

import { VisitColumn } from "../wound-history-gallery/visit-column"
import { currentVisit } from "@/src/lib/mock-data"

export function DetailPanel({
  selectedImage,
  onSelectImage,
}: {
  selectedImage: number | string | null
  onSelectImage: (id: number | string) => void
  selectedWound: string | null
  images?: unknown[]
}) {
  return (
    <VisitColumn
      visit={currentVisit}
      selectedImage={selectedImage}
      onSelectImage={onSelectImage}
      idx={0}
      headerLabel="Wound Detail"
      isCurrent
    />
  )
}
