
import { useTranslation } from "react-i18next"
import { MainHeader } from "@/components/common/main-header"
import { getEnabledModules } from "@/lib/security-modules"
import { ModuleCard } from "@/components/security/module-card"

export default function Page() {
    const { t } = useTranslation()
    const modules = getEnabledModules()

    return (
        <div className="flex h-screen flex-col bg-background text-foreground overflow-hidden">
            <MainHeader activeTab="Security" />

            <main className="flex-1 overflow-auto pt-8 px-8 pb-8">
                <div className="mx-auto w-full max-w-6xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold tracking-tight">{t("security.dashboard_title")}</h1>
                        <p className="mt-1.5 text-muted-foreground italic">{t("security.dashboard_desc")}</p>
                    </div>

                    {/* Modular Sections (Status Boxes) */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {modules.map((module) => (
                            <ModuleCard key={module.id} module={module} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}
