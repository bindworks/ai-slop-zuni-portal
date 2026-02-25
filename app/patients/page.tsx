"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Search, User, Activity, Filter, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { mockPatients } from "@/lib/mock-data"
import { Patient } from "@/components/common/types"
import { MainHeader } from "@/components/common/main-header"

export default function PatientListPage() {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")
    const [filter, setFilter] = useState<"all" | "recent">("all")

    const filteredPatients = useMemo(() => {
        let result = mockPatients

        // Filter by search
        if (searchQuery) {
            const q = searchQuery.toLowerCase()
            result = result.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.mrn.toLowerCase().includes(q)
            )
        }

        // Filter by recent (last 30 days)
        if (filter === "recent") {
            const thirtyDaysAgo = new Date()
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
            result = result.filter(p => new Date(p.lastVisit) >= thirtyDaysAgo)
        }

        // Sort by last visit descending
        return [...result].sort((a, b) => new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime())
    }, [searchQuery, filter])

    return (
        <div className="flex h-screen flex-col bg-background text-foreground overflow-hidden">
            <MainHeader activeTab="Patients" />

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden pt-8 px-8 pb-0">
                <div className="mx-auto w-full max-w-6xl flex flex-col flex-1 overflow-hidden">
                    <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Patient Dashboard</h1>
                            <p className="mt-1.5 text-muted-foreground italic">Manage patient records and clinical documentation</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex rounded-lg bg-secondary/50 p-1">
                                <button
                                    onClick={() => setFilter("all")}
                                    className={cn("px-4 py-1.5 text-sm font-medium rounded-md transition-all", filter === "all" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
                                >
                                    All Patients
                                </button>
                                <button
                                    onClick={() => setFilter("recent")}
                                    className={cn("px-4 py-1.5 text-sm font-medium rounded-md transition-all", filter === "recent" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}
                                >
                                    Last Month
                                </button>
                            </div>
                            <button className="flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all">
                                <User className="h-4 w-4" />
                                New Patient
                            </button>
                        </div>
                    </div>

                    {/* Search & Stats Bar */}
                    <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-4">
                        <div className="relative lg:col-span-3">
                            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search by patient name or ID..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-12 w-full rounded-xl border border-border bg-card/50 pl-11 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                            />
                        </div>
                        <div className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card/50 px-4 text-sm text-muted-foreground">
                            <Filter className="h-4 w-4" />
                            <span>Sort by: <b>Last Visit</b></span>
                        </div>
                    </div>

                    {/* Patient Table — scroll only the rows */}
                    <div className="flex-1 overflow-auto rounded-xl border border-border bg-card shadow-sm">
                        <table className="w-full text-sm">
                            <thead className="sticky top-0 z-10">
                                <tr className="border-b border-border bg-secondary/80">
                                    <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Patient</th>
                                    <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">MRN</th>
                                    <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Age</th>
                                    <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Wounds</th>
                                    <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Last Visit</th>
                                    <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                                    <th className="px-4 py-3" />
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {filteredPatients.map((patient) => (
                                    <tr
                                        key={patient.id}
                                        onClick={() => router.push(`/patients/${patient.id}`)}
                                        className="group cursor-pointer transition-colors hover:bg-primary/5"
                                    >
                                        <td className="px-4 py-2">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                                    <User className="h-3.5 w-3.5" />
                                                </div>
                                                <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{patient.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-3 py-2 text-xs font-mono text-muted-foreground">{patient.mrn}</td>
                                        <td className="px-3 py-2 text-muted-foreground">{patient.age}y</td>
                                        <td className="px-3 py-2">
                                            <span className="inline-flex items-center gap-1.5 text-xs">❤️‍🩹 {patient.woundCount}</span>
                                        </td>
                                        <td className="px-3 py-2 text-xs text-muted-foreground">{patient.lastVisit}</td>
                                        <td className="px-3 py-2">
                                            <span className={cn(
                                                "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
                                                patient.status === "Improving" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" :
                                                    patient.status === "Worsening" ? "bg-rose-500/10 text-rose-500 border border-rose-500/20" :
                                                        "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                                            )}>
                                                {patient.status}
                                            </span>
                                        </td>
                                        <td className="px-3 py-2 text-right">
                                            <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground/40 transition-all translate-x-[-4px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-primary" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredPatients.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                            <div className="rounded-full bg-secondary/50 p-4 mb-4">
                                <Search className="h-8 w-8" />
                            </div>
                            <p className="text-lg font-medium">No patients found</p>
                            <p className="text-sm">Try adjusting your search or filters</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
