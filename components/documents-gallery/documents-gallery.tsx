"use client"

import { useState } from "react"
import { DocumentRow } from "./document-row"
import { documents } from "./mock-data"
import { DocumentPreview } from "./document-preview"
import { Document } from "../common/types"

export function DocumentsGallery() {
    const [previewDoc, setPreviewDoc] = useState<Document | null>(null)

    return (
        <div className="flex h-full flex-col relative">
            <div className="border-b border-border px-6 py-4">
                <h2 className="text-sm font-semibold text-foreground">🗂️ Documents</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                    {documents.length} documents on file
                </p>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
                <div className="flex flex-col gap-3">
                    {documents.map((doc) => (
                        <DocumentRow key={doc.id} doc={doc} onPreview={() => setPreviewDoc(doc)} />
                    ))}
                </div>
            </div>

            {previewDoc && previewDoc.url && (
                <DocumentPreview
                    title={previewDoc.title}
                    url={previewDoc.url}
                    onClose={() => setPreviewDoc(null)}
                />
            )}
        </div>
    )
}
