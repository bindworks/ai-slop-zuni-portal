import { cn } from "@/src/lib/utils"

export function DetailRow({
    label,
    value,
    prevValue,
    showLabel,
    even = false,
    valueAlign = 'right',
}: {
    label: string
    value: string
    prevValue?: string
    showLabel?: boolean
    even?: boolean
    valueAlign?: 'left' | 'right'
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
                    "text-xs font-medium leading-tight line-clamp-2",
                    valueAlign === 'right' ? "ml-auto text-right" : "text-left",
                    changed ? "text-amber-400" : "text-foreground"
                )}
            >
                {value}
            </span>
        </div>
    )
}
