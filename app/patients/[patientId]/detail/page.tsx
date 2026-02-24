"use client"

import { useState, use } from "react"
import { PatientPanel } from "@/components/patient-panel/patient-panel"
import { WoundHistoryGallery } from "@/components/wound-history-gallery/wound-history-gallery"
import { DocumentsGallery } from "@/components/documents-gallery/documents-gallery"
import { PhotoAlbumGallery } from "@/components/photo-album-gallery/photo-album-gallery"
import { Activity, Bell, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { mockPatients } from "@/lib/mock-data"
import Link from "next/link"
import { MainHeader } from "@/components/common/main-header"

export default function PatientDetailPage({ params }: { params: Promise<{ patientId: string }> }) {
    const { patientId } = use(params)
    const [selectedItem, setSelectedItem] = useState<string | null>("W-001")
    const [selectedImage, setSelectedImage] = useState<number | string | null>(null)

    const patient = mockPatients.find(p => p.id === patientId) || mockPatients[0]

    const isWound = selectedItem?.startsWith("W-")

    return (
        <div className="flex h-screen flex-col overflow-hidden bg-background">
            <MainHeader activeTab="Patients" />

            {/* Breadcrumb */}
            <div className="flex h-9 shrink-0 items-center gap-2 border-b border-border bg-card px-5 text-[11px] font-medium">
                <Link href="/patients" className="text-muted-foreground hover:text-foreground transition-colors">Patients</Link>
                <div className="h-3 w-px bg-border rotate-[25deg]" />
                <span className="text-muted-foreground">{patient.name}</span>
                <div className="h-3 w-px bg-border rotate-[25deg]" />
                <span className="text-foreground">Detail</span>
            </div>

            {/* Three-column Layout */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left Column - Patient Summary & Wound List */}
                <div className="w-72 shrink-0 overflow-y-auto border-r border-border">
                    <PatientPanel
                        patient={patient}
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
                        <WoundHistoryGallery
                            patientId={patient.id}
                            woundId={selectedItem!}
                            selectedImage={selectedImage}
                            onSelectImage={setSelectedImage}
                        />
                    ) : selectedItem === "DOCUMENTS" ? (
                        <DocumentsGallery />
                    ) : selectedItem === "OTHER" ? (
                        <PhotoAlbumGallery />
                    ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground bg-background/50">
                            <div className="text-center space-y-2">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/50 mx-auto mb-4 text-muted-foreground/50">
                                    <Activity className="h-6 w-6" />
                                </div>
                                <p className="text-sm font-medium">Select an item to view it's profile</p>
                                <p className="text-xs text-muted-foreground">Select a wound or document from the side panel</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
