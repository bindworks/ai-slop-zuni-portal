
import { Shield, ShieldAlert, ArrowLeft, LogOut, MapPin, Globe, Clock, Monitor } from "lucide-react"
import { useTranslation } from "react-i18next"
import { MainHeader } from "@/src/components/common/main-header"
import { UiLink } from "@/src/components/common/ui-link"
import { cn } from "@/src/lib/utils"
const mockSessions = [
    { id: "S-001", device: "Sarah's MacBook Pro", location: "Prague, CZ", ip: "192.168.1.45", browser: "Chrome 122", current: true },
    { id: "S-002", device: "iPhone 15 Pro", location: "Prague, CZ", ip: "192.168.1.102", browser: "Mobile Safari", current: false },
    { id: "S-003", device: "Office Desktop", location: "London, UK", ip: "84.12.33.109", browser: "Edge 121", current: false },
]

export default function Page() {
    const { t } = useTranslation()

    return (
        <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
            <MainHeader activeTab="Security" />

            <main className="flex-1 overflow-auto pt-8 px-8 pb-8">
                <div className="mx-auto w-full max-w-4xl">
                    <div className="mb-8 flex items-center gap-4">
                        <UiLink href="/security" className="p-2 rounded-full hover:bg-secondary transition-colors">
                            <ArrowLeft className="h-5 w-5" />
                        </UiLink>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{t("security.modules.sessions.title")}</h1>
                            <p className="mt-1.5 text-muted-foreground">{t("security.modules.sessions.desc")}</p>
                        </div>
                    </div>

                    <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden mb-8">
                        <div className="p-4 bg-secondary/30 border-b border-border flex items-center justify-between">
                            <h2 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Active Connection List</h2>
                            <button className="text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors uppercase tracking-widest px-3 py-1 rounded-full border border-rose-500/20 bg-rose-500/5">
                                Terminate All
                            </button>
                        </div>
                        <div className="divide-y divide-border">
                            {mockSessions.map((session) => (
                                <div key={session.id} className="p-6 flex items-center justify-between group hover:bg-primary/5 transition-all">
                                    <div className="flex items-start gap-5">
                                        <div className="p-3 rounded-xl bg-secondary group-hover:bg-primary/10 transition-colors relative">
                                            <Monitor className="h-6 w-6 text-primary" />
                                            {session.current && <div className="absolute -top-1 -right-1 h-3 w-3 bg-emerald-500 border-2 border-card rounded-full" />}
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-bold text-lg">{session.device}</h3>
                                                {session.current && (
                                                    <span className="text-[10px] font-bold uppercase tracking-tighter bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded border border-emerald-500/20">
                                                        This Device
                                                    </span>
                                                )}
                                            </div>
                                            <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-3.5 w-3.5" />
                                                    {session.location}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Globe className="h-3.5 w-3.5" />
                                                    {session.ip}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-3.5 w-3.5" />
                                                    {session.browser}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {!session.current && (
                                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 transition-all opacity-0 group-hover:opacity-100">
                                            <LogOut className="h-4 w-4" />
                                            Logout
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 flex items-start gap-4 shadow-sm">
                        <div className="p-2 rounded-lg bg-rose-500/10">
                            <ShieldAlert className="h-5 w-5 text-rose-500" />
                        </div>
                        <div>
                            <h4 className="font-bold text-rose-500">Security Recommendation</h4>
                            <p className="text-sm text-rose-700/80 mt-1">
                                We detected an active session from an unusual location (London, UK). If this wasn't you, please terminate the session and change your password immediately.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
