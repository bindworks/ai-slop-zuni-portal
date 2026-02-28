import { WoundHistoryGallery } from "@/src/components/wound-history-gallery/wound-history-gallery"
import { useParams, Outlet } from "react-router-dom"

export default function WoundLayout() {
    const { patientId, woundid } = useParams()

    return (
        <div className="flex h-full w-full relative">
            <WoundHistoryGallery
                patientId={patientId || ""}
                woundId={woundid || ""}
            />
            <Outlet />
        </div>
    )
}
