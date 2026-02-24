import React from "react"
import { cn } from "@/lib/utils"

export function DetailSection({
    label,
    children,
    last = false,
}: {
    label: string
    children: React.ReactNode
    last?: boolean
}) {
    return (
        <div className={cn("p-4", !last && "border-b border-border")}>
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-wider text-muted-foreground">
                {label}
            </p>
            {children}
        </div>
    )
}
