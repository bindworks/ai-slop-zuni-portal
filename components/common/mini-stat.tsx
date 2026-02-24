import { cn } from "@/lib/utils"

export function MiniStat({
    label,
    value,
    unit,
    prevValue,
}: {
    label: string
    value: string
    unit: string
    prevValue?: string
}) {
    const changed = prevValue !== undefined && prevValue !== value
    return (
        <div
            className={cn(
                "rounded-md px-2 py-1 text-center",
                changed ? "bg-amber-900/20 ring-1 ring-amber-500/30" : "bg-muted"
            )}
        >
            <p className={cn("text-[12px] font-semibold", changed ? "text-amber-400" : "text-foreground")}>{value}</p>
            <p className="text-[8px] text-muted-foreground">
                {label} ({unit})
            </p>
        </div>
    )
}
