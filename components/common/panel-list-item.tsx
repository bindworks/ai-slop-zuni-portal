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
                    "w-full rounded-lg px-3 py-2 text-left transition-all duration-200",
                    isHealed && "opacity-60",
                    selected
                        ? "bg-accent ring-1 ring-primary/30 rounded-r-none border-r-2 border-r-primary"
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

            {/* Connector arrow */}
            {selected && (
                <div className="absolute -right-[11px] top-1/2 z-10 -translate-y-1/2">
                    <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
                        <path d="M0 0L12 10L0 20V0Z" className="fill-accent" />
                    </svg>
                </div>
            )}
        </div>
    )
}
