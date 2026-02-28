"use client"

import { Activity } from "lucide-react"
import { useTranslation } from "react-i18next"

export default function PatientOverviewPage() {
    const { t } = useTranslation()
    return (
        <div className="flex h-full items-center justify-center text-muted-foreground bg-background/50">
            <div className="text-center space-y-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/50 mx-auto mb-4 text-muted-foreground/50">
                    <Activity className="h-6 w-6" />
                </div>
                <p className="text-sm font-medium">{t("common.select_profile")}</p>
                <p className="text-xs text-muted-foreground">{t("common.select_sidebar")}</p>
            </div>
        </div>
    )
}
