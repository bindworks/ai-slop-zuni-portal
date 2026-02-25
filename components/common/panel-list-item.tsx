import { cn } from "@/lib/utils"
import { statusColor } from "./constants"

export function PanelListItem({
    id,
    icon,
    label,
    subtitle,
    status,
    meta,
    selected,
    onSelect,
    isHealed,
}: {
    id: string
    icon?: string
    label: string
    subtitle: string
    status?: string
    meta?: string
    selected: boolean
    onSelect: (id: string) => void
    isHealed?: boolean
}) {
    return (
        <div className="relative">
            <button
                onClick={() => onSelect(id)}
                className={cn(
                    "w-full rounded-md px-3 py-1.5 text-left transition-all duration-200",
                    isHealed && "opacity-60",
                    selected
                        ? "bg-accent -mr-20 pr-[5.75rem] ring-1 ring-primary/30 rounded-r-md shadow-sm"
                        : "hover:bg-secondary"
                )}
            >
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2">
                        {icon && <span className="text-lg leading-tight mt-0.5">{icon}</span>}
                        <div>
                            <p className={cn(
                                "text-sm font-medium",
                                selected ? "text-primary" : "text-foreground"
                            )}>
                                {label}
                            </p>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                                {subtitle}
                            </p>
                        </div>
                    </div>
                    {status && (
                        <span
                            className={cn(
                                "shrink-0 rounded-md px-2 py-0.5 text-[12px] font-semibold",
                                statusColor[status] ?? "bg-muted text-muted-foreground"
                            )}
                        >
                            {status}
                        </span>
                    )}
                </div>
                {meta && (
                    <div className="mt-2 flex items-center gap-3 text-[13px] text-muted-foreground">
                        <span>{meta}</span>
                    </div>
                )}
            </button>
        </div>
    )
}
