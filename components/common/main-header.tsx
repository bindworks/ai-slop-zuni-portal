"use client"

import { useState } from "react"
import { UiLink } from "@/components/common/ui-link"
import { Bandage, Bell, Settings, Globe, Building2, ChevronDown, ChevronRight, Languages } from "lucide-react"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"
import { mockAreas } from "@/lib/mock-data"

interface MainHeaderProps {
    activeTab?: string
}

type Selection =
    | { type: "area"; id: string }
    | { type: "institution"; id: string; areaId: string }

export function MainHeader({ activeTab = "Patients" }: MainHeaderProps) {
    const { t, i18n } = useTranslation()
    const [selection, setSelection] = useState<Selection>({
        type: "institution",
        id: "inst-1",
        areaId: "area-north",
    })
    const [isSelectorOpen, setIsSelectorOpen] = useState(false)
    const [isLangOpen, setIsLangOpen] = useState(false)

    // Areas start expanded if they contain the selection
    const [expandedAreas, setExpandedAreas] = useState<Set<string>>(
        () => new Set(mockAreas.map(a => a.id))
    )

    const navItems = [
        { label: t("common.patients"), href: "/patients", id: "Patients" },
    ] as const

    const toggleAreaExpand = (areaId: string, e: React.MouseEvent) => {
        e.stopPropagation()
        setExpandedAreas(prev => {
            const next = new Set(prev)
            next.has(areaId) ? next.delete(areaId) : next.add(areaId)
            return next
        })
    }

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng)
        setIsLangOpen(false)
    }

    // Derive display label
    const triggerLabel = (() => {
        if (selection.type === "area") {
            return mockAreas.find(a => a.id === selection.id)?.name ?? t("common.select")
        }
        return mockAreas
            .flatMap(a => a.institutions)
            .find(i => i.id === selection.id)?.name ?? t("common.select")
    })()

    return (
        <header className="relative z-10 flex h-14 shrink-0 items-center justify-between border-b border-border bg-card/50 backdrop-blur-sm px-6">
            <div className="flex items-center gap-4">
                <UiLink href="/patients" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
                        <Bandage className="h-5 w-5 text-primary-foreground" />
                    </div>
                </UiLink>

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
                                                <div className="flex items-center gap-1">
                                                    <button
                                                        onClick={(e) => toggleAreaExpand(area.id, e)}
                                                        className="flex h-8 w-6 shrink-0 items-center justify-center rounded text-muted-foreground hover:text-foreground"
                                                    >
                                                        <ChevronRight className={cn("h-3.5 w-3.5 transition-transform duration-150", isExpanded && "rotate-90")} />
                                                    </button>
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
                    <UiLink
                        key={item.id}
                        href={item.href}
                        className={cn(
                            "rounded-md px-4 py-2 text-sm font-medium transition-all",
                            activeTab === item.id
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        )}
                    >
                        {item.label}
                    </UiLink>
                ))}
            </nav>

            <div className="flex items-center gap-3">
                {/* Language Switcher */}
                <div className="relative">
                    <button
                        onClick={() => setIsLangOpen(!isLangOpen)}
                        className="flex h-9 items-center gap-2 rounded-full bg-secondary/50 px-3 text-muted-foreground hover:bg-secondary transition-colors"
                    >
                        <Languages className="h-4 w-4" />
                        <span className="text-xs font-bold uppercase">{i18n.language.split('-')[0]}</span>
                    </button>
                    {isLangOpen && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)} />
                            <div className="absolute right-0 top-full z-50 mt-2 w-32 origin-top-right rounded-xl border border-border bg-card p-1 shadow-2xl">
                                <button
                                    onClick={() => changeLanguage('en')}
                                    className={cn(
                                        "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-all",
                                        i18n.language.startsWith('en') ? "bg-primary/10 text-primary font-bold" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                                    )}
                                >
                                    <span>English</span>
                                    {i18n.language.startsWith('en') && <div className="h-1.5 w-1.5 rounded-full bg-primary" />}
                                </button>
                                <button
                                    onClick={() => changeLanguage('cs')}
                                    className={cn(
                                        "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-all",
                                        i18n.language.startsWith('cs') ? "bg-primary/10 text-primary font-bold" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                                    )}
                                >
                                    <span>Čeština</span>
                                    {i18n.language.startsWith('cs') && <div className="h-1.5 w-1.5 rounded-full bg-primary" />}
                                </button>
                            </div>
                        </>
                    )}
                </div>

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

