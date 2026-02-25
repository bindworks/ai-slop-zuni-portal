"use client"

import { use } from "react"
import { DocumentRow } from "@/components/documents-gallery/document-row"
import { documents } from "@/components/documents-gallery/mock-data"
import { useRouter, useParams } from "next/navigation"

export default function DocumentsLayout({
    params,
    children
}: {
    params: Promise<{ patientId: string }>,
    children: React.ReactNode
}) {
    const { patientId } = use(params)
    const { docid } = useParams()
    const router = useRouter()

    return (
        <div className="flex h-full w-full bg-background overflow-hidden relative">
            {/* Left Column: Document List */}
            <div className="flex h-full w-[20rem] 2xl:w-[32rem] shrink-0 flex-col border-r border-border bg-card/10 transition-all">
                <div className="border-b border-border px-6 py-4 shrink-0">
                    <h2 className="text-sm font-semibold text-foreground">🗂️ Documents</h2>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                        {documents.length} documents on file
                    </p>
                </div>
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    <div className="flex flex-col gap-3">
                        {documents.map((doc) => (
                            <div key={doc.id} className="relative">
                                <DocumentRow
                                    doc={doc}
                                    selected={docid === doc.id}
                                    onPreview={() => router.push(`/patients/${patientId}/documents/${doc.id}`)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column: Detail View */}
            <div className="flex-1 h-full min-w-0 bg-background/50">
                {children}
            </div>
        </div>
    )
}
