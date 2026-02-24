import { cn } from "@/lib/utils"

export function DetailRow({
    label,
    value,
    prevValue,
    showLabel,
}: {
    label: string
    value: string
    prevValue?: string
    showLabel?: boolean
}) {
    const changed = prevValue !== undefined && prevValue !== value
    return (
        <div className="flex h-[2rem] items-start justify-between gap-3 overflow-hidden">
            {showLabel && <span className="shrink-0 text-[13px] leading-tight text-muted-foreground">{label}</span>}
            <span
                className={cn(
                    "text-right text-[13px] font-medium leading-tight line-clamp-2",
                    changed ? "text-amber-400" : "text-foreground"
                )}
            >
                {value}
            </span>
        </div>
    )
}
