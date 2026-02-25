"use client"

import { use } from "react"
import { DocumentPreview } from "@/components/documents-gallery/document-preview"
import { documents } from "@/components/documents-gallery/mock-data"
import { useRouter } from "next/navigation"

export default function DocumentDetailPage({
    params
}: {
    params: Promise<{ patientId: string, docid: string }>
}) {
    const { patientId, docid } = use(params)
    const router = useRouter()
    const doc = documents.find(d => d.id === docid)

    if (!doc || !doc.url) {
        return <div className="p-4 text-muted-foreground">Document not found or inaccessible</div>
    }

    return (
        <DocumentPreview
            doc={doc}
            onClose={() => router.push(`/patients/${patientId}/documents`)}
        />
    )
}
