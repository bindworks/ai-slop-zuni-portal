export const tagColors: Record<string, string> = {
    "Pre-debridement": "bg-blue-900/40 text-blue-400 border-blue-400/30",
    "Post-debridement": "bg-emerald-900/40 text-emerald-400 border-emerald-400/30",
    "Follow-up": "bg-purple-900/40 text-purple-400 border-purple-400/30",
    "Close-up": "bg-amber-900/40 text-amber-400 border-amber-400/30",
    "Periwound": "bg-slate-900/40 text-slate-400 border-slate-400/30",
    "Under UV": "bg-indigo-900/40 text-indigo-400 border-indigo-400/30",
    "Measurement": "bg-rose-900/40 text-rose-400 border-rose-400/30",
    "Wide angle": "bg-cyan-900/40 text-cyan-400 border-cyan-400/30",
}

export const statusColor: Record<string, string> = {
    Improving: "bg-emerald-900/50 text-emerald-400",
    Stable: "bg-amber-900/50 text-amber-400",
    Worsening: "bg-red-900/50 text-red-400",
    Healed: "bg-slate-800/50 text-slate-400",
}

export const scanImages = [
    "/doc-scan-clinical.png",
    "/doc-scan-lab.png",
    "/doc-scan-radiology.png",
    "/doc-scan-consent.png",
    "/doc-scan-letter.png",
]

export const photoPool = [
    "/photo-patient-room.png",
    "/photo-wound-dressing.png",
    "/photo-medical-supplies.png",
    "/photo-compression-sock.png",
    "/photo-hospital-corridor.png",
    "/photo-physio-exercise.png",
]
