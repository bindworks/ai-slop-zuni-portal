import Link from "next/link"
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
    href,
    isHealed,
}: {
    id: string
    icon?: string
    label: string
    subtitle?: string
    status?: string
    meta?: string | React.ReactNode
    selected: boolean
    onSelect?: (id: string) => void
    href?: string
    isHealed?: boolean
}) {
    const content = (
        <div className="flex flex-col gap-0 text-left">
            <div className="flex items-start justify-between">
                <div className="flex items-start gap-2.5">
                    {icon && <span className="text-lg leading-none mt-0.5 shrink-0">{icon}</span>}
                    <div className="flex flex-col gap-0">
                        <p className={cn(
                            "text-sm font-medium leading-none transition-colors",
                            selected ? "text-primary" : "text-foreground group-hover:text-primary"
                        )}>
                            {label}
                        </p>
                        {subtitle && (
                            <p className="text-xs leading-tight text-muted-foreground mt-[2px]">
                                {subtitle}
                            </p>
                        )}
                        {meta && (
                            <div className="flex items-center gap-3 text-xs text-muted-foreground leading-none mt-1.5">
                                {meta}
                            </div>
                        )}
                    </div>
                </div>
                {status && (
                    <span
                        className={cn(
                            "shrink-0 rounded-md px-2 py-0.5 text-[11px] font-semibold",
                            statusColor[status] ?? "bg-muted text-muted-foreground"
                        )}
                    >
                        {status}
                    </span>
                )}
            </div>
        </div>
    )

    const className = cn(
        "group block w-full rounded-md px-3 py-1 text-left transition-all duration-200",
        isHealed && "opacity-60",
        selected
            ? "bg-accent -mr-20 ring-1 ring-primary/30 rounded-r-md shadow-sm"
            : "hover:bg-secondary"
    )

    if (href) {
        return (
            <div className="relative">
                <Link href={href} className={className}>
                    {content}
                </Link>
            </div>
        )
    }

    return (
        <div className="relative">
            <button onClick={() => onSelect?.(id)} className={className}>
                {content}
            </button>
        </div>
    )
}
