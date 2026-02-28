
import { Monitor, Smartphone, Tablet, Laptop, Shield, ArrowLeft, Trash2 } from "lucide-react"
import { useTranslation } from "react-i18next"
import { MainHeader } from "@/components/common/main-header"
import { UiLink } from "@/components/common/ui-link"
import { cn } from "@/lib/utils"

const mockDevices = [
    { id: "DEV-001", name: "Sarah's MacBook Pro", type: "Laptop", lastActive: "2 minutes ago", status: "Trusted", icon: Laptop },
    { id: "DEV-002", name: "iPhone 15 Pro", type: "Mobile", lastActive: "Just now", status: "Trusted", icon: Smartphone },
    { id: "DEV-003", name: "iPad Air", type: "Tablet", lastActive: "2 days ago", status: "Trusted", icon: Tablet },
    { id: "DEV-004", name: "Office Desktop", type: "Desktop", lastActive: "1 hour ago", status: "Trusted", icon: Monitor },
]

export default function Page() {
    const { t } = useTranslation()

    return (
        <div className="flex h-screen flex-col bg-background text-foreground overflow-hidden">
            <MainHeader activeTab="Security" />

            <main className="flex-1 overflow-auto pt-8 px-8 pb-8">
                <div className="mx-auto w-full max-w-4xl">
                    <div className="mb-8 flex items-center gap-4">
                        <UiLink href="/security" className="p-2 rounded-full hover:bg-secondary transition-colors">
                            <ArrowLeft className="h-5 w-5" />
                        </UiLink>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{t("security.modules.devices.title")}</h1>
                            <p className="mt-1.5 text-muted-foreground">{t("security.modules.devices.desc")}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {mockDevices.map((device) => (
                            <div key={device.id} className="flex items-center justify-between p-4 rounded-xl border border-border bg-card shadow-sm hover:border-primary/20 transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-lg bg-secondary group-hover:bg-primary/5 transition-colors">
                                        <device.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{device.name}</h3>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                                            <span>{device.type}</span>
                                            <span>•</span>
                                            <span>Last active {device.lastActive}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">
                                        {device.status}
                                    </span>
                                    <button className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 p-6 rounded-xl border-2 border-dashed border-border bg-secondary/20 flex flex-col items-center justify-center text-center">
                        <Shield className="h-10 w-10 text-muted-foreground mb-4 opacity-30" />
                        <h3 className="font-bold">Add new device</h3>
                        <p className="text-sm text-muted-foreground mt-1 max-w-sm">Securely enroll a new device to access the clinical management system.</p>
                        <button className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
                            Start Enrollment
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}
