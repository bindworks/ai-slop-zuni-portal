"use client"

import { VisitColumn, currentVisit } from "./image-gallery"

export function DetailPanel({
  selectedImage,
  onSelectImage,
  selectedWound,
}: {
  selectedImage: number | null
  onSelectImage: (id: number) => void
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
