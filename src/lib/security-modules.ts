import type { LucideIcon } from "lucide-react"
import { Monitor, ShieldCheck } from "lucide-react"
import { getSecurityConfig } from "@/src/lib/mock-data"

export interface SecurityModule {
    id: string
    nameKey: string // Translation key for name
    descriptionKey: string // Translation key for description
    href: string
    icon: LucideIcon
    color: string
    // Dashboard summary data fetching (mocked for now)
    getSummary: () => { value: string; labelKey: string }
}

export const securityModules: SecurityModule[] = [
    {
        id: "devices",
        nameKey: "security.modules.devices.title",
        descriptionKey: "security.modules.devices.desc",
        href: "/security/devices",
        icon: Monitor,
        color: "text-blue-500",
        getSummary: () => ({ value: "8", labelKey: "security.modules.devices.summary" })
    },
    {
        id: "sessions",
        nameKey: "security.modules.sessions.title",
        descriptionKey: "security.modules.sessions.desc",
        href: "/security/sessions",
        icon: ShieldCheck,
        color: "text-emerald-500",
        getSummary: () => ({ value: "3", labelKey: "security.modules.sessions.summary" })
    }
]

export const getEnabledModules = () => {
    const config = getSecurityConfig()
    return securityModules.filter(m => config.enabledModules.includes(m.id))
}
