"use client"

import { useState } from "react"
import { PatientPanel } from "@/components/patient-panel"
import { ImageGallery } from "@/components/image-gallery"
import { DocumentsGallery } from "@/components/documents-gallery"
import { PhotoAlbumGallery } from "@/components/photo-album-gallery"
import { Activity, Camera, Bell, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

export default function MedicalGalleryPage() {
  const [selectedItem, setSelectedItem] = useState<string | null>("W-001")
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [multiSelectedImages, setMultiSelectedImages] = useState<(number | string)[]>([])

  const toggleMultiSelect = (id: number | string) => {
    setMultiSelectedImages((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id)
      }
      if (prev.length >= 4) return prev
      return [...prev, id]
    })
  }

  const isWound = selectedItem?.startsWith("W-")

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      {/* Top Navigation Bar */}
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-border bg-card px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
            <Activity className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-semibold text-foreground">
            WoundView
          </span>
          <span className="rounded-md bg-muted px-2 py-0.5 text-[12px] font-medium text-muted-foreground">
            Clinical
          </span>
        </div>

        <nav className="flex items-center gap-1">
          {[
            { label: "Dashboard", active: false },
            { label: "Patients", active: true },
            { label: "Reports", active: false },
            { label: "Analytics", active: false },
          ].map((item) => (
            <button
              key={item.label}
              className={
                item.active
                  ? "rounded-md bg-secondary px-3 py-1.5 text-xs font-medium text-foreground"
                  : "rounded-md px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
              }
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button className="relative flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground">
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-destructive" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground">
            <Settings className="h-4 w-4" />
          </button>
          <div className="ml-1 h-5 w-px bg-border" />
          <button className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-[13px] font-semibold text-primary-foreground">
            SC
          </button>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="flex h-9 shrink-0 items-center gap-1.5 border-b border-border bg-card px-5 text-xs">
        <span className="text-muted-foreground">Patients</span>
        <span className="text-border">/</span>
        <span className="text-muted-foreground">Margaret Thompson</span>
        <span className="text-border">/</span>
        <span className="font-medium text-foreground">Image Gallery</span>
      </div>

      {/* Three-column Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Column - Patient Summary & Wound List */}
        <div className="w-72 shrink-0 overflow-y-auto border-r border-border">
          <PatientPanel
            selectedItem={selectedItem}
            onSelectItem={setSelectedItem}
          />
        </div>

        {/* All columns — current + history */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            selectedItem ? "flex-1 opacity-100" : "flex-0 w-0 opacity-0"
          )}
        >
          {isWound ? (
            <ImageGallery
              selectedImage={selectedImage}
              onSelectImage={setSelectedImage}
              multiSelectedImages={multiSelectedImages}
              onToggleMultiSelect={toggleMultiSelect}
            />
          ) : selectedItem === "DOCUMENTS" ? (
            <DocumentsGallery />
          ) : selectedItem === "OTHER" ? (
            <PhotoAlbumGallery
              multiSelectedImages={multiSelectedImages}
              onToggleMultiSelect={toggleMultiSelect}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <p className="text-sm">Select an item to view its gallery</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
