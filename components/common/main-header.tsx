"use client"

import { useState } from "react"
import Link from "next/link"
import { Bandage, Bell, Settings, Globe, Building2, ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { mockAreas } from "@/lib/mock-data"

interface MainHeaderProps {
    activeTab?: "Patients"
}

type Selection =
    | { type: "area"; id: string }
    | { type: "institution"; id: string; areaId: string }

export function MainHeader({ activeTab = "Patients" }: MainHeaderProps) {
    const [selection, setSelection] = useState<Selection>({
        type: "institution",
        id: "inst-1",
        areaId: "area-north",
    })
    const [isSelectorOpen, setIsSelectorOpen] = useState(false)
    // Areas start expanded if they contain the selection
    const [expandedAreas, setExpandedAreas] = useState<Set<string>>(
        () => new Set(mockAreas.map(a => a.id))
    )

    const navItems = [
        { label: "Patients", href: "/patients" },
    ] as const

    const toggleAreaExpand = (areaId: string, e: React.MouseEvent) => {
        e.stopPropagation()
        setExpandedAreas(prev => {
            const next = new Set(prev)
            next.has(areaId) ? next.delete(areaId) : next.add(areaId)
            return next
        })
    }

    // Derive display label
    const triggerLabel = (() => {
        if (selection.type === "area") {
            return mockAreas.find(a => a.id === selection.id)?.name ?? "Select…"
        }
        return mockAreas
            .flatMap(a => a.institutions)
            .find(i => i.id === selection.id)?.name ?? "Select…"
    })()

    const triggerIcon = selection.type === "area" ? Globe : Building2

    return (
        <header className="relative z-10 flex h-14 shrink-0 items-center justify-between border-b border-border bg-card/50 backdrop-blur-sm px-6">
            <div className="flex items-center gap-4">
                <Link href="/patients" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
                        <Bandage className="h-5 w-5 text-primary-foreground" />
                    </div>
                </Link>

                <div className="h-6 w-px bg-border mx-1" />

                {/* Tree Area Selector */}
                <div className="relative">
                    <button
                        onClick={() => setIsSelectorOpen(!isSelectorOpen)}
                        className="flex items-center gap-2.5 rounded-lg border border-border/50 bg-secondary/30 px-3.5 py-1.5 text-sm font-semibold text-foreground transition-all hover:bg-secondary/50 hover:border-primary/20"
                    >
                        <div className="flex items-center gap-2">
                            {selection.type === "area"
                                ? <Globe className="h-4 w-4 text-primary/70" />
                                : <Building2 className="h-4 w-4 text-primary/70" />
                            }
                            <span>{triggerLabel}</span>
                        </div>
                        <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform duration-200", isSelectorOpen && "rotate-180")} />
                    </button>

                    {isSelectorOpen && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setIsSelectorOpen(false)} />
                            <div
                                className="absolute left-0 top-full z-50 mt-2 w-72 origin-top-left rounded-xl border border-border p-1.5 shadow-2xl shadow-black/40"
                                style={{ backgroundColor: "oklch(0.16 0.015 264)" }}
                            >
                                <div className="max-h-[80vh] overflow-y-auto overflow-x-hidden space-y-0.5">
                                    {mockAreas.map((area) => {
                                        const isAreaSelected = selection.type === "area" && selection.id === area.id
                                        const isExpanded = expandedAreas.has(area.id)
                                        return (
                                            <div key={area.id}>
                                                {/* Area node — selectable row */}
                                                <div className="flex items-center gap-1">
                                                    {/* Expand/collapse toggle */}
                                                    <button
                                                        onClick={(e) => toggleAreaExpand(area.id, e)}
                                                        className="flex h-8 w-6 shrink-0 items-center justify-center rounded text-muted-foreground hover:text-foreground"
                                                    >
                                                        <ChevronRight className={cn("h-3.5 w-3.5 transition-transform duration-150", isExpanded && "rotate-90")} />
                                                    </button>

                                                    {/* Area selectable label */}
                                                    <button
                                                        onClick={() => {
                                                            setSelection({ type: "area", id: area.id })
                                                            setIsSelectorOpen(false)
                                                        }}
                                                        className={cn(
                                                            "flex flex-1 items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold transition-all",
                                                            isAreaSelected
                                                                ? "bg-primary/10 text-primary"
                                                                : "text-foreground hover:bg-secondary/50"
                                                        )}
                                                    >
                                                        <Globe className={cn("h-3.5 w-3.5", isAreaSelected ? "text-primary" : "text-muted-foreground")} />
                                                        {area.name}
                                                    </button>
                                                </div>

                                                {/* Institution children */}
                                                {isExpanded && (
                                                    <div className="ml-6 mt-0.5 space-y-0.5 border-l border-border/40 pl-3 pb-1">
                                                        {area.institutions.map((inst) => {
                                                            const isSelected = selection.type === "institution" && selection.id === inst.id
                                                            return (
                                                                <button
                                                                    key={inst.id}
                                                                    onClick={() => {
                                                                        setSelection({ type: "institution", id: inst.id, areaId: area.id })
                                                                        setIsSelectorOpen(false)
                                                                    }}
                                                                    className={cn(
                                                                        "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all",
                                                                        isSelected
                                                                            ? "bg-primary/10 text-primary font-semibold"
                                                                            : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                                                                    )}
                                                                >
                                                                    <Building2 className={cn("h-3.5 w-3.5 shrink-0", isSelected ? "text-primary" : "text-muted-foreground/50")} />
                                                                    <span className="truncate">{inst.name}</span>
                                                                </button>
                                                            )
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <nav className="flex items-center gap-1">
                {navItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={cn(
                            "rounded-md px-4 py-2 text-sm font-medium transition-all",
                            activeTab === item.label
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        )}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>

            <div className="flex items-center gap-3">
                <button className="relative flex h-9 w-9 items-center justify-center rounded-full bg-secondary/50 text-muted-foreground hover:bg-secondary transition-colors">
                    <Bell className="h-4 w-4" />
                    <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-destructive border-2 border-card" />
                </button>
                <button className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary/50 text-muted-foreground hover:bg-secondary transition-colors">
                    <Settings className="h-4 w-4" />
                </button>
                <div className="h-6 w-px bg-border mx-1" />
                <div className="flex items-center gap-3 pl-1 text-foreground">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 text-xs font-bold text-primary-foreground shadow-md shadow-primary/20">
                        SC
                    </div>
                    <span className="hidden text-sm font-medium lg:block">Sarah Connor</span>
                </div>
            </div>
        </header>
    )
}

