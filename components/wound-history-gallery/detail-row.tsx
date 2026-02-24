import { cn } from "@/lib/utils"

export function DetailRow({
    label,
    value,
    prevValue,
    showLabel,
    even = false,
}: {
    label: string
    value: string
    prevValue?: string
    showLabel?: boolean
    even?: boolean
}) {
    const changed = prevValue !== undefined && prevValue !== value
    return (
        <div className={cn(
            "flex h-[2rem] items-center justify-between gap-3 overflow-hidden px-4 -mx-4",
            even && "bg-muted"
        )}>
            {showLabel && <span className="shrink-0 text-xs leading-tight text-muted-foreground">{label}</span>}
            <span
                className={cn(
                    "text-right text-xs font-medium leading-tight line-clamp-2",
                    changed ? "text-amber-400" : "text-foreground"
                )}
            >
                {value}
            </span>
        </div>
    )
}
