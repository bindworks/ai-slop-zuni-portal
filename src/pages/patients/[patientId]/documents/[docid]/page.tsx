import { DocumentPreview } from "@/src/components/documents-gallery/document-preview"
import { documents } from "@/src/components/documents-gallery/mock-data"
import { useNavigate, useParams } from "react-router-dom"

export default function DocumentDetailPage() {
    const { patientId, docid } = useParams()
    const navigate = useNavigate()
    const doc = documents.find(d => d.id === docid)

    if (!doc || !doc.url) {
        return <div className="p-4 text-muted-foreground">Document not found or inaccessible</div>
    }

    return (
        <DocumentPreview
            doc={doc}
            onClose={() => navigate(`/patients/${patientId}/documents`)}
        />
    )
}
