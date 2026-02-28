"use client"

import { useTranslation } from "react-i18next"
import { UiLink } from "@/components/common/ui-link"
import { ArrowRight } from "lucide-react"
import { SecurityModule } from "@/lib/security-modules"

interface ModuleCardProps {
    module: SecurityModule
}

export function ModuleCard({ module }: ModuleCardProps) {
    const { t } = useTranslation()
    const summary = module.getSummary()
    const Icon = module.icon

    return (
        <UiLink
            href={module.href}
            className="group flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
        >
            <div>
                <div className="flex items-center justify-between mb-4">
                    <div className={`p-2.5 rounded-lg bg-secondary group-hover:bg-primary/10 transition-colors ${module.color}`}>
                        <Icon className="h-5 w-5" />
                    </div>
                </div>
                <h3 className="text-lg font-bold text-foreground">{t(module.nameKey)}</h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{t(module.descriptionKey)}</p>
            </div>

            <div className="mt-6 flex items-end justify-between">
                <div>
                    <span className="text-2xl font-bold text-foreground">{summary.value}</span>
                    <span className="ml-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">{t(summary.labelKey)}</span>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <ArrowRight className="h-4 w-4" />
                </div>
            </div>
        </UiLink>
    )
}
