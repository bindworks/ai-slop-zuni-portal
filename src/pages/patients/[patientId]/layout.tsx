import { PatientPanel } from "@/components/patient-panel/patient-panel"
import { MainHeader } from "@/components/common/main-header"
import { mockPatients } from "@/lib/mock-data"
import { UiLink } from "@/components/common/ui-link"
import { useLocation, useParams, Outlet } from "react-router-dom"
import { useTranslation } from "react-i18next"

export default function PatientLayout() {
    const { t } = useTranslation()
    const { patientId } = useParams()
    const { pathname } = useLocation()
    const patient = mockPatients.find(p => p.id === patientId) || mockPatients[0]

    // Determine selected item from URL
    const getSelectedItem = () => {
        if (pathname.includes("/timeline")) return "TIMELINE"
        if (pathname.includes("/documents")) return "DOCUMENTS"
        if (pathname.includes("/photos")) return "OTHER"
        const woundMatch = pathname.match(/\/wounds\/(W-\d+)/)
        if (woundMatch) return woundMatch[1]
        return null
    }

    const selectedItem = getSelectedItem()

    const getPageTitle = () => {
        const lastPart = pathname.split("/").pop()
        if (lastPart === patientId) return t("common.overview")
        if (lastPart === "timeline") return t("patient.timeline")
        if (lastPart === "documents") return t("patient.documents")
        if (lastPart === "photos") return t("patient.photo_album")
        return lastPart
    }

    return (
        <div className="flex h-screen flex-col overflow-hidden bg-background">
            <MainHeader activeTab="Patients" />

            {/* Breadcrumb */}
            <div className="flex h-9 shrink-0 items-center gap-2 border-b border-border bg-card px-5 text-[11px] font-medium text-muted-foreground">
                <UiLink href="/patients" className="hover:text-foreground transition-colors">{t("common.patients")}</UiLink>
                <div className="h-3 w-px bg-border rotate-[25deg]" />
                <UiLink href={`/patients/${patientId}`} className="hover:text-foreground transition-colors">{patient.name}</UiLink>
                <div className="h-3 w-px bg-border rotate-[25deg]" />
                <span className="text-foreground capitalize">{getPageTitle()}</span>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Left Column - Patient Summary & Wound List */}
                <div className="w-72 shrink-0 overflow-y-auto border-r border-border">
                    <PatientPanel
                        patient={patient}
                        selectedItem={selectedItem}
                        onSelectItem={() => { }} // Will be handled by Links now
                    />
                </div>

                {/* Main Content Area */}
                <div className="flex-1 overflow-hidden">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
