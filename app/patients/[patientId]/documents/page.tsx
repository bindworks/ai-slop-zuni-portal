export default function DocumentsEmptyState() {
    return (
        <div className="flex h-full items-center justify-center text-muted-foreground p-12 text-center">
            <div>
                <div className="h-12 w-12 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4 opacity-50">
                    <span className="text-2xl leading-none">🗂️</span>
                </div>
                <p className="text-sm font-medium">Select a document</p>
                <p className="text-xs opacity-70 mt-1 uppercase tracking-wider">to view its contents</p>
            </div>
        </div>
    )
}
